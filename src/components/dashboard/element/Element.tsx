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
    row: number
    onHighlight?: (locations: number[]) => void
    onResizeEnd?: (id: number, cellsX: number, cellsY: number) => { width: number; height: number } | void
    onMoveEnd?: (id: number, row: number, col: number) => { top: number; left: number } | void
    onContextMenu?: (e: React.MouseEvent, id: number) => void
}

const Element = (props: Props) => {
    const [width, setWidth] = useState(props.width);
    const [height, setHeight] = useState(props.height);
    const [top, setTop] = useState(props.top);
    const [left, setLeft] = useState(props.left);

    useEffect(() => {
        setWidth(props.width);
    }, [props.width]);

    useEffect(() => {
        setHeight(props.height);
    }, [props.height]);

    useEffect(() => {
        setTop(props.top);
    }, [props.top]);

    useEffect(() => {
        setLeft(props.left);
    }, [props.left]);

    const startX = useRef(0);
    const startY = useRef(0);
    const moveStartX = useRef(0);
    const moveStartY = useRef(0);
    const startTop = useRef(0);
    const startLeft = useRef(0);
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

    const handleMoveDown = (e: React.MouseEvent) => {
        e.preventDefault();
        moveStartX.current = e.clientX;
        moveStartY.current = e.clientY;
        startTop.current = top;
        startLeft.current = left;
        window.addEventListener('mousemove', handleMoveMove);
        window.addEventListener('mouseup', handleMoveUp);
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
            if (r < 0 || r >= props.row) continue;
            for (let c = startCol; c < startCol + cellsX; c++) {
                if (c < 0 || c >= props.column) continue;
                highlights.push(r * props.column + c);
            }
        }
        props.onHighlight?.(highlights);

        setWidth(newWidth);
        setHeight(newHeight);
    };

    const handleMoveMove = (e: MouseEvent) => {
        const deltaX = e.clientX - moveStartX.current;
        const deltaY = e.clientY - moveStartY.current;
        const newTop = startTop.current + deltaY;
        const newLeft = startLeft.current + deltaX;

        const cellW = props.nodeWidth + props.gap;
        const cellH = props.nodeHeight + props.gap;
        const cellsX = Math.max(1, Math.round((width + props.gap) / cellW));
        const cellsY = Math.max(1, Math.round((height + props.gap) / cellH));

        const row = Math.round(newTop / cellH);
        const col = Math.round(newLeft / cellW);
        const highlights: number[] = [];
        for (let r = row; r < row + cellsY; r++) {
            if (r < 0 || r >= props.row) continue;
            for (let c = col; c < col + cellsX; c++) {
                if (c < 0 || c >= props.column) continue;
                highlights.push(r * props.column + c);
            }
        }
        props.onHighlight?.(highlights);

        setTop(newTop);
        setLeft(newLeft);
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

    const handleMoveUp = (e: MouseEvent) => {
        window.removeEventListener('mousemove', handleMoveMove);
        window.removeEventListener('mouseup', handleMoveUp);

        const deltaX = e.clientX - moveStartX.current;
        const deltaY = e.clientY - moveStartY.current;
        const finalTop = startTop.current + deltaY;
        const finalLeft = startLeft.current + deltaX;

        const cellW = props.nodeWidth + props.gap;
        const cellH = props.nodeHeight + props.gap;
        const row = Math.round(finalTop / cellH);
        const col = Math.round(finalLeft / cellW);

        let finalRow = row;
        let finalCol = col;
        if (props.onMoveEnd) {
            const res = props.onMoveEnd(props.id, row, col);
            if (res) {
                finalRow = res.top;
                finalCol = res.left;
            }
        }

        setTop(finalRow * cellH);
        setLeft(finalCol * cellW);
        props.onHighlight?.([]);
    };

    return (
        <_.ElementWrapper
            top={top}
            left={left}
            width={width}
            height={height}
            radius={props.radius}
            onContextMenu={(e) => {
                e.preventDefault();
                props.onContextMenu?.(e, props.id);
            }}
        >
            {props.edit ? (
                <>
                    <_.MoveHandle onMouseDown={handleMoveDown} />
                    <_.SiezeHandle onMouseDown={handleMouseDown} />
                </>
            ) : null}
        </_.ElementWrapper>
    );
};

export default Element;

