import * as _ from './style.ts'
import {useEffect, useMemo, useRef} from "react";
import DashboardNode from "../node/DashboardNode.tsx";
import {NLC} from "../NodeLocationCalculation.ts";

type Props = {
    width: number
    height: number
    column: number
    row: number
    gap: number
    background?: string
    radius?: number
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
        return NLC(props)
    }, [props]);

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