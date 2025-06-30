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
`