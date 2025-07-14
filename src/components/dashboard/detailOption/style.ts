import styled from "styled-components"

interface OptionsContainerProps {
    x: number
    y: number
}

export const OptionsContainer = styled.div<OptionsContainerProps>`
    border-radius: 8px;
    overflow: hidden;
    display: inline-block;
    position: fixed;
    top: ${(props) => `${props.y}px`};
    left: ${(props) => `${props.x}px`};
`

export const Option = styled.div`
    width: 100px;
    height: 40px;
    background-color: #007BFF;
    color: white;
    display: flex;
    align-items: center;
    position: relative;
    cursor: pointer;
    &:not(:last-child){
        border-bottom: 1px solid white;
    }
`

export const OptionTitle = styled.div`
    font-family: Pretendard;
    font-weight: 500;
    font-size: 12px;
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
`
