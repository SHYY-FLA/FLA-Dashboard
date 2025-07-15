import styled from "styled-components";

type ElementWrapperProps = {
    top: number
    left: number
    width: number
    height: number
    radius: number
}

export const ElementWrapper = styled.div<ElementWrapperProps>`
    position: absolute;
    border: 0.943px solid #007BFF;
    background: rgba(0, 123, 255, 0.20);
    width: ${props => `${props.width}px`};
    height: ${props => `${props.height}px`};
    top: ${props => `${props.top}px`};
    left: ${props => `${props.left}px`};
    border-radius: ${props => `${props.radius}px`};
    overflow: hidden;
`

export const SiezeHandle = styled.div`
    width: 10px;
    height: 40px;
    background-color: gray;
    position: absolute;
    right: 0;
    bottom: 0;
    transform: rotate(45deg) translateX(70%) translateY(25%);
    &:hover {
        cursor: move;
    }
`

export const MoveHandle = styled.div`
    width: 10px;
    height: 40px;
    background-color: gray;
    position: absolute;
    left: 0;
    top: 0;
    transform: rotate(45deg) translate(-70%, -25%);
    &:hover {
        cursor: move;
    }
`
