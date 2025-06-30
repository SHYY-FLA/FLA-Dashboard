import * as _ from './style.ts'
import { useState, useRef, useEffect } from "react";

type Props = {
    id: number
    width: number
    height: number
    top: number
    left: number
    radius: number
    edit: boolean
    nodeWidth: number
    nodeHeight: number
    gap: number
    column: number
    onHighlight?: (locations: number[]) => void
    onResizeEnd?: (id: number, cellsX: number, cellsY: number) => { width: number; height: number } | void
}

const Element = (props: Props) => {
    const [width, setWidth] = useState(props.width);
    const [height, setHeight] = useState(props.height);

    useEffect(() => {
        setWidth(props.width);
    }, [props.width]);

    useEffect(() => {
        setHeight(props.height);
    }, [props.height]);

    const startX = useRef(0);
    const startY = useRef(0);
    const startWidth = useRef(0);
    const startHeight = useRef(0);
    const currentWidth = useRef(0);
    const currentHeight = useRef(0);

    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        startX.current = e.clientX;
        startY.current = e.clientY;
        startWidth.current = width;
        startHeight.current = height;
        currentWidth.current = width;
        currentHeight.current = height;

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseMove = (e: MouseEvent) => {
        const deltaX = e.clientX - startX.current;
        const deltaY = e.clientY - startY.current;

        const newWidth = startWidth.current + deltaX;
        const newHeight = startHeight.current + deltaY;

        currentWidth.current = newWidth;
        currentHeight.current = newHeight;

        const cellW = props.nodeWidth + props.gap;
        const cellsX = Math.max(1, Math.round((newWidth + props.gap) / cellW));
        const cellH = props.nodeHeight + props.gap;
        const cellsY = Math.max(1, Math.round((newHeight + props.gap) / cellH));

        const startRow = Math.round(props.top / cellH);
        const startCol = Math.round(props.left / cellW);
        const highlights: number[] = [];
        for (let r = startRow; r < startRow + cellsY; r++) {
            for (let c = startCol; c < startCol + cellsX; c++) {
                highlights.push(r * props.column + c);
            }
        }
        props.onHighlight?.(highlights);

        setWidth(newWidth);
        setHeight(newHeight);
    };

    const handleMouseUp = () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);

        const cellW = props.nodeWidth + props.gap;
        const cellsX = Math.max(1, Math.round((currentWidth.current + props.gap) / cellW));
        const cellH = props.nodeHeight + props.gap;
        const cellsY = Math.max(1, Math.round((currentHeight.current + props.gap) / cellH));

        let finalX = cellsX;
        let finalY = cellsY;
        if (props.onResizeEnd) {
            const res = props.onResizeEnd(props.id, cellsX, cellsY);
            if (res) {
                finalX = res.width;
                finalY = res.height;
            }
        }
        setWidth(finalX * props.nodeWidth + props.gap * (finalX - 1));
        setHeight(finalY * props.nodeHeight + props.gap * (finalY - 1));
        props.onHighlight?.([]);
    };

    return (
        <_.ElementWrapper
            top={props.top}
            left={props.left}
            width={width}
            height={height}
            radius={props.radius}
        >
            {props.edit ? (
                <_.Handle onMouseDown={handleMouseDown} />
            ) : null}
        </_.ElementWrapper>
    );
};

export default Element;

