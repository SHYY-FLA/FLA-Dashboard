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

    /* 나머지 스타일은 그대로 유지합니다. */
    border-radius: ${(props) => props.$radius ? `${props.$radius}px` : '8px'};
    border: ${(props) => props.$edit ? `${props.$primary ?? 'blue'} 6px dashed` : 'none'};
    //background-color: #fff; /* 노드가 보이도록 기본 배경색 추가 (예시) */

    position: relative;
    box-sizing: border-box; /* border가 크기에 영향을 주지 않도록 설정 */
`

export const Plus = styled.img`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`
