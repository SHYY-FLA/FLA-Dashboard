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
}

export type DashboardBaseHandle = {
    deleteElement: (id: number) => void
}

export type ElementData = {
    id: number
    location: number
    width: number
    height: number
}
