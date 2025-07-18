import * as _ from './style.ts'
import { useMemo, useState, forwardRef, useImperativeHandle } from 'react'
import DashboardNode from '../node/DashboardNode.tsx'
import { addMapping, getPosition, NLC } from '../NodeLocationCalculation.ts'
import Element from '../element/Element.tsx'
import type { DashboardBaseProps, ElementData, DashboardBaseHandle } from './types.ts'
import { handleResizeEnd, handleMoveEnd } from './handlers/index.ts'

const DashboardBase = forwardRef<DashboardBaseHandle, DashboardBaseProps>((props, ref) => {
    const { width, height, column, row, gap = 8} = props

    const [highlightNodes, setHighlightNodes] = useState<Set<number>>(new Set())

    const handleHighlight = (locations: number[]) => {
        setHighlightNodes(new Set(locations))
    }

    const [nextId, setNextId] = useState<number>(2)

    const [elements, setElements] = useState<ElementData[]>(props.element)

    const nodeSize = useMemo(() => NLC(props), [props])

    const handleAddElement = (location: number) => {
        setElements(prev => [...prev, { id: nextId, location, width: 1, height: 1 }])
        setNextId(prev => prev + 1)
    }

    const onResizeEnd = (id: number, cellsX: number, cellsY: number) =>
        handleResizeEnd(id, cellsX, cellsY, column, row, elements, setElements, setHighlightNodes)

    const onMoveEnd = (id: number, rowIdx: number, colIdx: number) =>
        handleMoveEnd(id, rowIdx, colIdx, column, row, elements, setElements, setHighlightNodes)

    useImperativeHandle(ref, () => ({
        deleteElement: (id: number) => {
            setElements(prev => prev.filter(el => el.id !== id))
        },
        getElementIdAtLocation: (location: number) => {
            const pos = getPosition(location)
            if (!pos) return null
            for (const el of elements) {
                const elPos = getPosition(el.location)
                if (!elPos) continue
                if (
                    pos.top >= elPos.top &&
                    pos.top < elPos.top + el.height &&
                    pos.left >= elPos.left &&
                    pos.left < elPos.left + el.width
                ) {
                    return el.id
                }
            }
            return null
        },
    }), [elements])

    return (
        <_.DashboardBase
            $width={width}
            $height={height}
            $background={props.background}
            $radius={props.radius ?? 0}
            onContextMenu={props.onContextMenu}
            className={'_FLA_DASHBOARD_BASE'}
            style={{ display: 'flex', flexDirection: 'column', gap: `${gap}px` }}
        >
            {[...Array(row).keys()].map((rowIndex) => (
                <div
                    key={`row-${rowIndex}`}
                    style={{ display: 'flex', gap: `${gap}px` }}
                    className={'_FLA_DASHBOARD_BASE_ROW'}
                >
                    {[...Array(column).keys()].map((colIndex) => {
                        addMapping(colIndex + rowIndex * column, { top: rowIndex, left: colIndex })
                        const location = colIndex + rowIndex * column
                        return (
                            <DashboardNode
                                key={`node-${rowIndex}-${colIndex}`}
                                width={nodeSize.width}
                                height={nodeSize.height}
                                location={location}
                                radius={props.radius ?? 0}
                                primary={props.primary}
                                edit={props.edit ?? false}
                                highlight={highlightNodes.has(location)}
                                onAddElement={handleAddElement}
                                onContextMenu={props.onNodeContextMenu}
                            />
                        )
                    })}
                </div>
            ))}

            {elements.map((el) => {
                const loc = getPosition(el.location)
                if (loc !== undefined)
                    return (
                        <Element
                            id={el.id}
                            top={loc.top * (nodeSize.height + gap)}
                            left={loc.left * (nodeSize.width + gap)}
                            width={nodeSize.width * el.width + gap * (el.width - 1)}
                            height={nodeSize.height * el.height + gap * (el.height - 1)}
                            radius={props.radius ?? 0}
                            edit={props.edit ?? false}
                            nodeWidth={nodeSize.width}
                            nodeHeight={nodeSize.height}
                            gap={gap}
                            column={column}
                            row={row}
                            onHighlight={handleHighlight}
                            onResizeEnd={onResizeEnd}
                            onMoveEnd={onMoveEnd}
                            onContextMenu={props.onElementContextMenu}
                            key={el.id}
                        />
                    )
            })}
        </_.DashboardBase>
    )
})

export default DashboardBase
