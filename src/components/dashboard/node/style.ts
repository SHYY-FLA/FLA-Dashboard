import styled from "styled-components";

type DashboardNodeProps = {
    $width: number;
    $height: number;
    $radius?: number;
    $primary?: string
    $edit?: boolean
}

export const DashboardNode = styled.section<DashboardNodeProps>`
    width: ${(props) => `${props.$width}px`};
    height: ${(props) => `${props.$height}px`};
    background-color: white;
    border-radius: ${(props) => `${props.$radius}px`};
    border: ${(props) => props.$edit? `${props.$primary} 6px dashed` : null};
    
    position: relative;
`

export const Plus = styled.img`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`