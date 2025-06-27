type Props = {
    width: number
    height: number
    column: number
    row: number
    gap: number
}

export const NLC = (props: Props) => {
    const totalHorizontalGap = props.gap * (props.column - 1);
    const totalVerticalGap = props.gap * (props.row - 1);

    // 2. 남은 공간을 노드의 개수로 나누어 각 노드의 크기를 계산합니다.
    const nodeWidth = (props.width - totalHorizontalGap) / props.column;
    const nodeHeight = (props.height - totalVerticalGap) / props.row;

    console.log(totalHorizontalGap, totalVerticalGap, nodeWidth, nodeHeight);

    return { width: nodeWidth, height: nodeHeight };
}