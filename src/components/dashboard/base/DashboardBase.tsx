import * as _ from './style.ts'
import {useEffect, useRef} from "react";
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

const DashboardBase = (props: Props) => {
    // const sectionCount = useRef((props.column !=0 ? props.column : 1) * (props.row !=0 ? props.row : 1))
    const width = useRef(props.width/props.column)
    const height = useRef(props.height/props.row)
    const gap = useRef(props.gap == null ? 8 : props.gap)

    const elements = useRef<Element[]>([])

    useEffect(() => {
        elements.current = [
            {
                x: 1,
                y: 1,
                width: 1,
                height: 1,
            },
            {
                x: 2,
                y: 1,
                width: 1,
                height: 1,
            }
        ]
    }, []);

    return (
        <_.DashboardBase $width={props.width}
                         $height={props.height}
                         $background={props.background}
                         $radius={props.radius}
                         onContextMenu={props.onContextMenu}
                         className={"_FLA_DASHBOARD_BASE"}>

            {[...Array(props.row ?? 0).keys()].map((row) => (
                <div key={`row-${row}`}
                     style={{ display: "flex", justifyContent: "space-between" }}
                     className={"_FLA_DASHBOARD_BASE"}>
                    {[...Array(props.column ?? 0).keys()].map((col) => (
                        <DashboardNode key={`node-${row}-${col}`}
                                       width={width.current-(gap.current * (props.column-1))}
                                       height={height.current-(gap.current * (props.row-1))}
                                       radius={props.radius}
                                       primary={props.primary}
                                       edit={props.edit}>
                        </DashboardNode>
                    ))}
                </div>
            ))}


        </_.DashboardBase>
    )
}

export default DashboardBase;