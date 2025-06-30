import * as _ from './style.ts'
import {useEffect, useMemo, useRef} from "react";
import DashboardNode from "../node/DashboardNode.tsx";
import {addMapping, getPosition, NLC} from "../NodeLocationCalculation.ts";
import Element from "../element/Element.tsx";

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
    const { width, height, column, row, gap = 8 } = props;

    // 1. useRef 대신 useMemo를 사용하여 props 변경 시에도 크기가 재계산되도록 합니다.
    const nodeSize = useMemo(() => {
        return NLC(props)
    }, [props]);

    const nodeData = [
        {
            location: 0,
            width: 2,
            height: 1,
        },
        {
            location: 3,
            width: 1,
            height: 2,
        }
    ]

    useEffect(() => {

    }, []);

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
                    {[...Array(column).keys()].map(
                        (colIndex) => {
                            addMapping((colIndex) + (rowIndex * column), { top: rowIndex, left: colIndex })
                            return (
                                <DashboardNode
                                    key={`node-${rowIndex}-${colIndex}`}
                                    width={nodeSize.width}
                                    height={nodeSize.height}
                                    radius={props.radius}
                                    primary={props.primary}
                                    edit={props.edit}
                                >
                                </DashboardNode>
                            )
                        }

                    )}
                </div>
            ))}

            {nodeData.map((index) => {
                const loc: { top: number; left: number } | undefined
                            = getPosition(index.location)
                if (loc != undefined)
                    return (
                        <Element top={loc.top * (nodeSize.height + gap)}
                                 left={loc.left * (nodeSize.width + gap)}
                                 width={nodeSize.width * index.width + (gap * (index.width - 1))}
                                 height={nodeSize.height * index.height + (gap * (index.height - 1))}
                                 radius={props.radius}
                                 key={index.location}/>
                    )
            })}
        </_.DashboardBase>
    );
};

export default DashboardBase;