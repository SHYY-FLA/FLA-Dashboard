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
    chartData: number[]
}

export type ElementData = {
    id: number
    location: number
    width: number
    height: number
}
