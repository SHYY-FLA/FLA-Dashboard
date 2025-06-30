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
    background-color: aqua;
    width: ${props => `${props.width}px`};
    height: ${props => `${props.height}px`};
    top: ${props => `${props.top}px`};
    left: ${props => `${props.left}px`};
    border-radius: ${props => `${props.radius}px`};
    overflow: hidden;
`

export const Handle = styled.div`
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