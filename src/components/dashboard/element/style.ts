import styled from "styled-components";

type ElementWrapperProps = {
    width: number;
    height: number;
}

export const ElementWrapper = styled.div<ElementWrapperProps>`
    background-color: aqua;
    width: ${props => `${props.width}px`};
    height: ${props => `${props.height}px`};
`