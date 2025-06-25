import styled from 'styled-components';

type DashboardBaseProps = {
    $width: number;
    $height: number;
    $background?: string;
    $radius?: number;
};

export const DashboardBase = styled.section<DashboardBaseProps>`
    width: ${(props) => `${props.$width}px`};
    height: ${(props) => `${props.$height}px`};
    background-color: ${(props) => props.$background};
    border-radius: ${(props) => `${props.$radius}px`};
`;
