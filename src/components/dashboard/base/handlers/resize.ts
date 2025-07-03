import type { ElementData } from '../types.ts'
import { getPosition, getLocation } from '../../NodeLocationCalculation.ts'
import { findEmptyArea } from '../layoutUtils.ts'

export const handleResizeEnd = (
    id: number,
    cellsX: number,
    cellsY: number,
    column: number,
    row: number,
    elements: ElementData[],
    setElements: React.Dispatch<React.SetStateAction<ElementData[]>>,
    setHighlightNodes: React.Dispatch<React.SetStateAction<Set<number>>>,
): { width: number; height: number } => {
    setHighlightNodes(new Set())
    const el = elements.find((e) => e.id === id)
    if (!el) return { width: cellsX, height: cellsY }
    const pos = getPosition(el.location)
    if (!pos) return { width: cellsX, height: cellsY }

    const newW = Math.min(cellsX, column - pos.left)
    const newH = Math.min(cellsY, row - pos.top)

    const occupied = new Map<number, number>()
    elements.forEach((e) => {
        if (e.id === id) return
        const p = getPosition(e.location)
        if (!p) return
        for (let r = 0; r < e.height; r++) {
            for (let c = 0; c < e.width; c++) {
                occupied.set((p.top + r) * column + (p.left + c), e.id)
            }
        }
    })

    const colliding = new Set<number>()
    for (let r = pos.top; r < pos.top + newH; r++) {
        for (let c = pos.left; c < pos.left + newW; c++) {
            const oid = occupied.get(r * column + c)
            if (oid !== undefined) colliding.add(oid)
        }
    }

    const finalOccupied = new Set<number>()
    for (let r = pos.top; r < pos.top + newH; r++) {
        for (let c = pos.left; c < pos.left + newW; c++) {
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
    for (const cid of colliding) {
        const e = elements.find((it) => it.id === cid)
        if (!e) continue
        const spot = findEmptyArea(e.width, e.height, finalOccupied, column, row)
        if (!spot) {
            return { width: el.width, height: el.height }
        }
        const loc = getLocation(spot)
        if (loc === undefined) {
            return { width: el.width, height: el.height }
        }
        updates[cid] = loc
        for (let r = 0; r < e.height; r++) {
            for (let c = 0; c < e.width; c++) {
                finalOccupied.add((spot.top + r) * column + (spot.left + c))
            }
        }
    }

    setElements((prev) =>
        prev.map((e) => {
            if (e.id === id) {
                return { ...e, width: newW, height: newH }
            }
            if (updates[e.id] !== undefined) {
                return { ...e, location: updates[e.id] }
            }
            return e
        }),
    )

    return { width: newW, height: newH }
}

export default handleResizeEnd
