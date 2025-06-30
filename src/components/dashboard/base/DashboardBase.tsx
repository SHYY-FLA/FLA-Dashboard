import * as _ from './style.ts'
import {useMemo, useState} from "react";
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

type ElementData = {
    id: number
    location: number
    width: number
    height: number
}


const DashboardBase = (props: Props) => {
    const { width, height, column, row, gap = 8 } = props;

    const [highlightNodes, setHighlightNodes] = useState<Set<number>>(new Set());

    const handleHighlight = (locations: number[]) => {
        setHighlightNodes(new Set(locations));
    };

    const getOccupied = (ignoreId: number) => {
        const set = new Set<number>();
        elements.forEach((el) => {
            if (el.id === ignoreId) return;
            const pos = getPosition(el.location);
            if (!pos) return;
            for (let r = 0; r < el.height; r++) {
                for (let c = 0; c < el.width; c++) {
                    set.add((pos.top + r) * column + (pos.left + c));
                }
            }
        });
        return set;
    };

    const adjustSize = (
        id: number,
        startRow: number,
        startCol: number,
        desiredW: number,
        desiredH: number,
    ) => {
        let w = Math.min(desiredW, column - startCol);
        let h = Math.min(desiredH, row - startRow);
        const occupied = getOccupied(id);
        const collides = (cw: number, ch: number) => {
            for (let r = 0; r < ch; r++) {
                for (let c = 0; c < cw; c++) {
                    if (occupied.has((startRow + r) * column + (startCol + c))) {
                        return true;
                    }
                }
            }
            return false;
        };

        while (w > 0 && h > 0 && collides(w, h)) {
            if (w >= h) {
                w -= 1;
            } else {
                h -= 1;
            }
        }

        if (w < 1) w = 1;
        if (h < 1) h = 1;
        return { width: w, height: h };
    };

    const handleResizeEnd = (
        id: number,
        cellsX: number,
        cellsY: number,
    ): { width: number; height: number } => {
        const el = elements.find((e) => e.id === id);
        if (!el) return { width: cellsX, height: cellsY };
        const pos = getPosition(el.location);
        if (!pos) return { width: cellsX, height: cellsY };

        const adjusted = adjustSize(id, pos.top, pos.left, cellsX, cellsY);
        setElements((prev) =>
            prev.map((e) => (e.id === id ? { ...e, ...adjusted } : e)),
        );
        return adjusted;
    };

    // 1. useRef 대신 useMemo를 사용하여 props 변경 시에도 크기가 재계산되도록 합니다.
    const nodeSize = useMemo(() => {
        return NLC(props)
    }, [props]);

    const [elements, setElements] = useState<ElementData[]>([
        {
            id: 0,
            location: 0,
            width: 2,
            height: 1,
        },
        {
            id: 1,
            location: 3,
            width: 1,
            height: 2,
        },
    ]);



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
                                    highlight={highlightNodes.has((colIndex) + (rowIndex * column))}
                                >
                                </DashboardNode>
                            )
                        }

                    )}
                </div>
            ))}

            {elements.map((el) => {
                const loc: { top: number; left: number } | undefined
                            = getPosition(el.location)
                if (loc != undefined)
                    return (
                        <Element id={el.id}
                                 top={loc.top * (nodeSize.height + gap)}
                                 left={loc.left * (nodeSize.width + gap)}
                                 width={nodeSize.width * el.width + (gap * (el.width - 1))}
                                 height={nodeSize.height * el.height + (gap * (el.height - 1))}
                                 radius={props.radius}
                                 edit={props.edit}
                                 nodeWidth={nodeSize.width}
                                 nodeHeight={nodeSize.height}
                                 gap={gap}
                                 column={column}
                                 onHighlight={handleHighlight}
                                 onResizeEnd={handleResizeEnd}
                                 key={el.id}/>
                )
            })}
        </_.DashboardBase>
    );
};

export default DashboardBase;