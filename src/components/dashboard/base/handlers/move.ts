import type { ElementData } from '../types.ts'
import { getPosition, getLocation } from '../../NodeLocationCalculation.ts'
import { findSpotPriority, findNearestSpot } from '../layoutUtils.ts'

export const handleMoveEnd = (
    id: number,
    rowIdx: number,
    colIdx: number,
    column: number,
    row: number,
    elements: ElementData[],
    setElements: React.Dispatch<React.SetStateAction<ElementData[]>>,
    setHighlightNodes: React.Dispatch<React.SetStateAction<Set<number>>>,
): { top: number; left: number } => {
    setHighlightNodes(new Set())
    const el = elements.find((e) => e.id === id)
    if (!el) return { top: rowIdx, left: colIdx }
    const newRow = Math.min(Math.max(0, rowIdx), row - el.height)
    const newCol = Math.min(Math.max(0, colIdx), column - el.width)

    const occupiedAll = new Map<number, number>()
    elements.forEach((e) => {
        if (e.id === id) return
        const p = getPosition(e.location)
        if (!p) return
        for (let r = 0; r < e.height; r++) {
            for (let c = 0; c < e.width; c++) {
                occupiedAll.set((p.top + r) * column + (p.left + c), e.id)
            }
        }
    })

    const colliding = new Set<number>()
    for (let r = newRow; r < newRow + el.height; r++) {
        for (let c = newCol; c < newCol + el.width; c++) {
            const oid = occupiedAll.get(r * column + c)
            if (oid !== undefined) colliding.add(oid)
        }
    }

    if (colliding.size === 0) {
        const loc = getLocation({ top: newRow, left: newCol })
        if (loc !== undefined) {
            setElements((prev) =>
                prev.map((e) => (e.id === id ? { ...e, location: loc } : e)),
            )
        }
        return { top: newRow, left: newCol }
    }

    const finalOccupied = new Set<number>()
    for (let r = newRow; r < newRow + el.height; r++) {
        for (let c = newCol; c < newCol + el.width; c++) {
            finalOccupied.add(r * column + c)
        }
    }
    elements.forEach((e) => {
        if (e.id === id || colliding.has(e.id)) return
        const p = getPosition(e.location)
        if (!p) return
        for (let r = 0; r < e.height; r++) {
            for (let c = 0; c < e.width; c++) {
                finalOccupied.add((p.top + r) * column + (p.left + c))
            }
        }
    })

    const updates: Record<number, number> = {}
    let cannotResolve = false
    for (const cid of colliding) {
        const e = elements.find((it) => it.id === cid)
        if (!e) continue
        const pos = getPosition(e.location)
        if (!pos) continue
        const spot = findSpotPriority(e.width, e.height, pos, finalOccupied, column, row)
        if (!spot) {
            cannotResolve = true
            break
        }
        const loc2 = getLocation(spot)
        if (loc2 === undefined) {
            cannotResolve = true
            break
        }
        updates[cid] = loc2
        for (let r = 0; r < e.height; r++) {
            for (let c = 0; c < e.width; c++) {
                finalOccupied.add((spot.top + r) * column + (spot.left + c))
            }
        }
    }

    if (cannotResolve) {
        const nearest = findNearestSpot(
            el.width,
            el.height,
            { top: newRow, left: newCol },
            new Set(occupiedAll.keys()),
            column,
            row,
        )
        if (!nearest) {
            const cur = getPosition(el.location)
            return cur ? cur : { top: rowIdx, left: colIdx }
        }
        const loc = getLocation(nearest)
        if (loc !== undefined) {
            setElements((prev) =>
                prev.map((e) => (e.id === id ? { ...e, location: loc } : e)),
            )
        }
        return { top: nearest.top, left: nearest.left }
    }

    const loc = getLocation({ top: newRow, left: newCol })
    if (loc !== undefined) {
        setElements((prev) =>
            prev.map((e) => {
                if (e.id === id) return { ...e, location: loc }
                if (updates[e.id] !== undefined) {
                    return { ...e, location: updates[e.id] }
                }
                return e
            }),
        )
    }

    return { top: newRow, left: newCol }
}

export default handleMoveEnd
