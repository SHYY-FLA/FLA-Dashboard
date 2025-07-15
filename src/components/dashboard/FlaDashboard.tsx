import DashboardBase from "../../components/dashboard/base/DashboardBase.tsx";
import type {DashboardBaseHandle, ElementData} from "./base/types.ts";
import DetailOption from "../../components/dashboard/detailOption/DetailOption.tsx";
import {useEffect, useState, useRef} from "react";

type DetailOptionsPos = {
    x: number
    y: number
}

type Props = {
    width: number
    height: number
    column: number
    row: number
    element: ElementData[]
}

const FlaDashboard = (p: Props) => {
    const [viewOptions, setViewOptions] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [detailOptionsPos, setDetailOptionsPos] = useState<DetailOptionsPos>({ x: 0, y: 0 })
    const [selectedElementId, setSelectedElementId] = useState<number | null>(null)
    const dashboardRef = useRef<DashboardBaseHandle>(null)

    const handleBaseContextMenu = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        console.log('Base context menu triggered')
        setDetailOptionsPos({ x: e.clientX, y: e.clientY })
        setSelectedElementId(null)
        setViewOptions(true)
    }

    const handleElementContextMenu = (e: React.MouseEvent, id: number) => {
        e.preventDefault()
        e.stopPropagation()
        console.log('Element context menu triggered', id)
        setDetailOptionsPos({ x: e.clientX, y: e.clientY })
        setSelectedElementId(id)
        setViewOptions(true)
    }

    const handleNodeContextMenu = (e: React.MouseEvent, location: number) => {
        e.preventDefault()
        e.stopPropagation()
        console.log('Node context menu triggered', location)
        setDetailOptionsPos({ x: e.clientX, y: e.clientY })
        const id = dashboardRef.current?.getElementIdAtLocation(location) ?? null
        setSelectedElementId(id)
        setViewOptions(true)
    }

    const deleteElementHandler = () => {
        if (selectedElementId !== null) {
            dashboardRef.current?.deleteElement(selectedElementId)
            setViewOptions(false)
        }
    }

    const editModeHandler = () => {
        setEditMode(!editMode);
    }

    useEffect(() => {
        const contextMenuListener = (e: MouseEvent) => {
            if ((e.target as HTMLElement).className.includes("_FLA_DASHBOARD"))
                return
            setViewOptions(false)
        }
        const clickListener = () => {
            setViewOptions(false)
        }

        window.addEventListener('contextmenu', contextMenuListener)
        window.addEventListener('click', clickListener)

        return () => {
            window.removeEventListener('contextmenu', contextMenuListener)
            window.removeEventListener('click', clickListener)
        }
    }, [])

    return (
        <>
            <DashboardBase width={p.width}
                           height={p.height}
                           column={p.column}
                           row={p.row}
                           radius={15}
                           gap={16}
                           primary={"#007BFF"}
                           background={"white"}
                           edit={editMode}
                           ref={dashboardRef}
                           onContextMenu={handleBaseContextMenu}
                           onElementContextMenu={handleElementContextMenu}
                           onNodeContextMenu={handleNodeContextMenu}
                           element={[
                               // {id: 1, location: 1, width: 2, height: 2,}
                           ]}/>
            {viewOptions? <DetailOption x={detailOptionsPos.x}
                                        y={detailOptionsPos.y}
                                        editModeStatus={editMode}
                                        editModeHandler={editModeHandler}
                                        deleteHandler={selectedElementId !== null ? deleteElementHandler : undefined}/> : null}
        </>
    )
}

export default FlaDashboard
