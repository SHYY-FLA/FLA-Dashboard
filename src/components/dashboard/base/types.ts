export type DashboardBaseProps = {
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
    onElementContextMenu?: (e: React.MouseEvent, id: number) => void
    onNodeContextMenu?: (e: React.MouseEvent, location: number) => void
    element?: ElementData[]
}

export type DashboardBaseHandle = {
    deleteElement: (id: number) => void
    getElementIdAtLocation: (location: number) => number | null
}

export type ElementData = {
    id: number
    location: number
    width: number
    height: number
}
