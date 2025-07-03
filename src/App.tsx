import './App.css'
import DashboardBase from "./components/dashboard/base/DashboardBase.tsx";
import type { DashboardBaseHandle } from "./components/dashboard/base/types.ts";
import DetailOption from "./components/dashboard/detailOption/DetailOption.tsx";
import {useEffect, useState, useRef} from "react";

type DetailOptionsPos = {
    x: number
    y: number
}

const App = () => {
    const [viewOptions, setViewOptions] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [detailOptionsPos, setDetailOptionsPos] = useState<DetailOptionsPos>({ x: 0, y: 0 })
    const [selectedElementId, setSelectedElementId] = useState<number | null>(null)
    const dashboardRef = useRef<DashboardBaseHandle>(null)

    const handleElementContextMenu = (e: React.MouseEvent, id: number) => {
        e.preventDefault()
        setDetailOptionsPos({ x: e.clientX, y: e.clientY })
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
        window.addEventListener('contextmenu', (e) => {
            if (((e.target as HTMLElement).className).includes("_FLA_DASHBOARD"))
                return;
            setViewOptions(false);
        })

        window.addEventListener('click', () => {
            setViewOptions(false);
        })
    }, []);


    return (
        <>
            <DashboardBase width={800}
                           height={800}
                           column={3}
                           row={6}
                           radius={15}
                           gap={16}
                           primary={"#007BFF"}
                           background={"white"}
                           edit={editMode}
                           ref={dashboardRef}
                           onElementContextMenu={handleElementContextMenu}/>
           {viewOptions? <DetailOption x={detailOptionsPos.x}
                                       y={detailOptionsPos.y}
                                       editModeStatus={editMode}
                                       editModeHandler={editModeHandler}
                                       deleteHandler={deleteElementHandler}/> : null}
        </>
    )
}

export default App
