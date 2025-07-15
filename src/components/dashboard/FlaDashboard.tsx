import DashboardBase from "../../components/dashboard/base/DashboardBase.tsx";
import type {DashboardBaseHandle, ElementData} from "./base/types.ts";
import DetailOption from "../../components/dashboard/detailOption/DetailOption.tsx";
import {useEffect, useState, useRef} from "react";
import { createPortal } from "react-dom";

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
        setDetailOptionsPos({ x: e.clientX, y: e.clientY })
        setSelectedElementId(null)
        setViewOptions(true)
    }

    const handleElementContextMenu = (e: React.MouseEvent, id: number) => {
        e.preventDefault()
        e.stopPropagation()
        setDetailOptionsPos({ x: e.clientX, y: e.clientY })
        setSelectedElementId(id)
        setViewOptions(true)
    }

    const handleNodeContextMenu = (e: React.MouseEvent, location: number) => {
        e.preventDefault()
        e.stopPropagation()
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

    // --------- 포탈 렌더링 부분(핵심) ----------
    const detailOptionPortal = viewOptions
        ? createPortal(
            <DetailOption
                x={detailOptionsPos.x}
                y={detailOptionsPos.y}
                editModeStatus={editMode}
                editModeHandler={editModeHandler}
                deleteHandler={selectedElementId !== null ? deleteElementHandler : undefined}
            />,
            document.body
        )
        : null;

    return (
        <>
            <DashboardBase
                width={p.width}
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
                element={[]}
            />
            {detailOptionPortal}
        </>
    )
}

export default FlaDashboard
