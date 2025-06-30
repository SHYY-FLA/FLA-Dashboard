type NLCProps = {
    width: number
    height: number
    column: number
    row: number
    gap: number
}

export const NLC = (props: NLCProps) => {
    const totalHorizontalGap = props.gap * (props.column - 1);
    const totalVerticalGap = props.gap * (props.row - 1);

    // 2. 남은 공간을 노드의 개수로 나누어 각 노드의 크기를 계산합니다.
    const nodeWidth = (props.width - totalHorizontalGap) / props.column;
    const nodeHeight = (props.height - totalVerticalGap) / props.row;

    return { width: nodeWidth, height: nodeHeight };
}

type Position = { top: number; left: number }
const locToPos = new Map<number, Position>()
const posToLoc = new Map<string, number>()

export const addMapping = (location: number, position: Position) => {
    locToPos.set(location, position);

    const key = `${position.top},${position.left}`;
    posToLoc.set(key, location);
}

export const getPosition = (location: number): Position | undefined => {
    return locToPos.get(location)
}

export const getLocation = (position: Position): number | undefined => {
    const key = `${position.top},${position.left}`
    return posToLoc.get(key)
}