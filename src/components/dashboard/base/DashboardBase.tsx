import * as _ from './style.ts'
import {useMemo, useState} from "react";
import DashboardNode from "../node/DashboardNode.tsx";
import {addMapping, getLocation, getPosition, NLC} from "../NodeLocationCalculation.ts";
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

    const findEmptyArea = (
        widthCells: number,
        heightCells: number,
        occupied: Set<number>,
    ): { top: number; left: number } | null => {
        for (let r = 0; r <= row - heightCells; r++) {
            for (let c = 0; c <= column - widthCells; c++) {
                let ok = true;
                for (let rr = 0; rr < heightCells && ok; rr++) {
                    for (let cc = 0; cc < widthCells; cc++) {
                        if (occupied.has((r + rr) * column + (c + cc))) {
                            ok = false;
                            break;
                        }
                    }
                }
                if (ok) return { top: r, left: c };
            }
        }
        return null;
    };

    const handleResizeEnd = (
        id: number,
        cellsX: number,
        cellsY: number,
    ): { width: number; height: number } => {
        setHighlightNodes(new Set());
        const el = elements.find((e) => e.id === id);
        if (!el) return { width: cellsX, height: cellsY };
        const pos = getPosition(el.location);
        if (!pos) return { width: cellsX, height: cellsY };

        const newW = Math.min(cellsX, column - pos.left);
        const newH = Math.min(cellsY, row - pos.top);

        const occupied = new Map<number, number>();
        elements.forEach((e) => {
            if (e.id === id) return;
            const p = getPosition(e.location);
            if (!p) return;
            for (let r = 0; r < e.height; r++) {
                for (let c = 0; c < e.width; c++) {
                    occupied.set((p.top + r) * column + (p.left + c), e.id);
                }
            }
        });

        const colliding = new Set<number>();
        for (let r = pos.top; r < pos.top + newH; r++) {
            for (let c = pos.left; c < pos.left + newW; c++) {
                const oid = occupied.get(r * column + c);
                if (oid !== undefined) colliding.add(oid);
            }
        }

        const finalOccupied = new Set<number>();
        for (let r = pos.top; r < pos.top + newH; r++) {
            for (let c = pos.left; c < pos.left + newW; c++) {
                finalOccupied.add(r * column + c);
            }
        }
        elements.forEach((e) => {
            if (e.id === id || colliding.has(e.id)) return;
            const p = getPosition(e.location);
            if (!p) return;
            for (let r = 0; r < e.height; r++) {
                for (let c = 0; c < e.width; c++) {
                    finalOccupied.add((p.top + r) * column + (p.left + c));
                }
            }
        });

        const updates: Record<number, number> = {};
        for (const cid of colliding) {
            const e = elements.find((it) => it.id === cid);
            if (!e) continue;
            const spot = findEmptyArea(e.width, e.height, finalOccupied);
            if (!spot) {
                return { width: el.width, height: el.height };
            }
            const loc = getLocation(spot);
            if (loc === undefined) {
                return { width: el.width, height: el.height };
            }
            updates[cid] = loc;
            for (let r = 0; r < e.height; r++) {
                for (let c = 0; c < e.width; c++) {
                    finalOccupied.add((spot.top + r) * column + (spot.left + c));
                }
            }
        }

        setElements((prev) =>
            prev.map((e) => {
                if (e.id === id) {
                    return { ...e, width: newW, height: newH };
                }
                if (updates[e.id] !== undefined) {
                    return { ...e, location: updates[e.id] };
                }
                return e;
            }),
        );

        return { width: newW, height: newH };
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