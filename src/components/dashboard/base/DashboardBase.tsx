import * as _ from './style.ts'
import {useEffect, useMemo, useRef} from "react";
import DashboardNode from "../node/DashboardNode.tsx";

type Props = {
    width: number
    height: number
    column: number
    row: number
    background?: string
    radius?: number
    gap?: number
    primary?: string
    edit?: boolean
    onContextMenu?: (e: React.MouseEvent) => void
}

type Element = {
    x: number
    y: number
    width: number
    height: number
}

type NodeData = {
    id: number
    left_top: number
    right_top: number
    left_bottom: number
    right_bottom: number
    center: number
}

const DashboardBase = (props: Props) => {
    const { width, height, column, row, gap = 8, ...restProps } = props;

    // 1. useRef 대신 useMemo를 사용하여 props 변경 시에도 크기가 재계산되도록 합니다.
    const nodeSize = useMemo(() => {
        const totalHorizontalGap = gap * (column - 1);
        const totalVerticalGap = gap * (row - 1);

        // 2. 남은 공간을 노드의 개수로 나누어 각 노드의 크기를 계산합니다.
        const nodeWidth = (width - totalHorizontalGap) / column;
        const nodeHeight = (height - totalVerticalGap) / row;

        console.log(totalHorizontalGap, totalVerticalGap, nodeWidth, nodeHeight);

        return { width: nodeWidth, height: nodeHeight };
    }, [width, height, column, row, gap]);

    return (
        // style.ts 에서는 flex 컨테이너 역할만 하도록 설정
        <_.DashboardBase
            $width={width}
            $height={height}
            $background={props.background}
            $radius={props.radius}
            onContextMenu={props.onContextMenu}
            className={"_FLA_DASHBOARD_BASE"}
            style={{ display: 'flex', flexDirection: 'column', gap: `${gap}px` }}
        >
            {[...Array(row).keys()].map((rowIndex) => (
                <div key={`row-${rowIndex}`}
                     style={{ display: "flex", gap: `${gap}px` }}
                     className={"_FLA_DASHBOARD_BASE_ROW"}>
                    {[...Array(column).keys()].map((colIndex) => (
                        <DashboardNode
                            key={`node-${rowIndex}-${colIndex}`}
                            width={nodeSize.width}
                            height={nodeSize.height}
                            {...restProps}
                        />
                    ))}
                </div>
            ))}
        </_.DashboardBase>
    );
};

export default DashboardBase;