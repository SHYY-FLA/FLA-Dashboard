import styled from "styled-components";

export const OptionsContainer = styled.div`
    border-radius: 8px;
    overflow: hidden;
    display: inline-block;
    height: 40px;
`

export const Option = styled.div`
    width: 100px;
    height: 40px;
    background-color: #007BFF;
    color: white;
    display: inline-block;
    position: relative;
`

export const OptionTitle = styled.div`
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
`