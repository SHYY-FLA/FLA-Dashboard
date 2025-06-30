import * as _ from './style.ts'
import { useState, useRef } from "react";

type Props = {
    width: number
    height: number
    top: number
    left: number
    radius: number
    edit: boolean
    nodeWidth: number
    nodeHeight: number
    gap: number
}

const Element = (props: Props) => {
    const [width, setWidth] = useState(props.width);
    const [height, setHeight] = useState(props.height);

    const startX = useRef(0);
    const startY = useRef(0);
    const startWidth = useRef(0);
    const startHeight = useRef(0);

    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        startX.current = e.clientX;
        startY.current = e.clientY;
        startWidth.current = width;
        startHeight.current = height;

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseMove = (e: MouseEvent) => {
        const deltaX = e.clientX - startX.current;
        const deltaY = e.clientY - startY.current;

        const cellW = props.nodeWidth + props.gap;
        const cellsX = Math.max(1, Math.round((startWidth.current + deltaX + props.gap) / cellW));
        const cellH = props.nodeHeight + props.gap;
        const cellsY = Math.max(1, Math.round((startHeight.current + deltaY + props.gap) / cellH));

        setWidth(cellsX * props.nodeWidth + props.gap * (cellsX - 1));
        setHeight(cellsY * props.nodeHeight + props.gap * (cellsY - 1));
    };

    const handleMouseUp = () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
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
