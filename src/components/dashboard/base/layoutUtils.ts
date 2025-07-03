export const areaFree = (
    topIdx: number,
    leftIdx: number,
    widthCells: number,
    heightCells: number,
    occupied: Set<number>,
    column: number,
): boolean => {
    for (let r = topIdx; r < topIdx + heightCells; r++) {
        for (let c = leftIdx; c < leftIdx + widthCells; c++) {
            if (occupied.has(r * column + c)) return false;
        }
    }
    return true;
};

export const findEmptyArea = (
    widthCells: number,
    heightCells: number,
    occupied: Set<number>,
    column: number,
    row: number,
): { top: number; left: number } | null => {
    for (let r = 0; r <= row - heightCells; r++) {
        for (let c = 0; c <= column - widthCells; c++) {
            if (areaFree(r, c, widthCells, heightCells, occupied, column)) {
                return { top: r, left: c };
            }
        }
    }
    return null;
};

export const findSpotPriority = (
    widthCells: number,
    heightCells: number,
    start: { top: number; left: number },
    occupied: Set<number>,
    column: number,
    row: number,
): { top: number; left: number } | null => {
    for (let c = start.left + 1; c <= column - widthCells; c++) {
        if (areaFree(start.top, c, widthCells, heightCells, occupied, column)) {
            return { top: start.top, left: c };
        }
    }
    for (let c = start.left - 1; c >= 0; c--) {
        if (areaFree(start.top, c, widthCells, heightCells, occupied, column)) {
            return { top: start.top, left: c };
        }
    }
    for (let r = start.top + 1; r <= row - heightCells; r++) {
        if (areaFree(r, start.left, widthCells, heightCells, occupied, column)) {
            return { top: r, left: start.left };
        }
    }
    for (let r = start.top - 1; r >= 0; r--) {
        if (areaFree(r, start.left, widthCells, heightCells, occupied, column)) {
            return { top: r, left: start.left };
        }
    }
    return null;
};

export const findNearestSpot = (
    widthCells: number,
    heightCells: number,
    start: { top: number; left: number },
    occupied: Set<number>,
    column: number,
    row: number,
): { top: number; left: number } | null => {
    let best: { top: number; left: number } | null = null;
    let bestDist = Number.MAX_SAFE_INTEGER;
    for (let r = 0; r <= row - heightCells; r++) {
        for (let c = 0; c <= column - widthCells; c++) {
            if (areaFree(r, c, widthCells, heightCells, occupied, column)) {
                const dist = Math.abs(r - start.top) + Math.abs(c - start.left);
                if (dist < bestDist) {
                    bestDist = dist;
                    best = { top: r, left: c };
                }
            }
        }
    }
    return best;
};

