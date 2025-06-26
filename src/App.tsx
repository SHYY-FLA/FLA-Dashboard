import './App.css'
import DashboardBase from "./components/dashboard/base/DashboardBase.tsx";
import DetailOption from "./components/dashboard/detailOption/DetailOption.tsx";
import {useEffect, useRef, useState} from "react";

type DetailOptionsPos = {
    x: number
    y: number
}

const App = () => {
    const [viewOptions, setViewOptions] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const detailOptionsPos = useRef<DetailOptionsPos>({ x: 0, y: 0 })

    const handleContextMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        detailOptionsPos.current = { x: e.clientX, y: e.clientY };
        setViewOptions(true);
    };

    const editModeHandler = () => {
        setEditMode(!editMode);
    }

    useEffect(() => {
        window.addEventListener('contextmenu', (e) => {
            if (((e.target as HTMLElement).className).includes("_FLA_DASHBOARD_BASE"))
                return;
            setViewOptions(false);
        })

        window.addEventListener('click', () => {
            setViewOptions(false);
        })

        console.log(typeof setEditMode);
    }, []);


    return (
        <>
            <DashboardBase width={800}
                           height={800}
                           column={3}
                           row={3}
                           radius={15}
                           gap={16}
                           primary={"#007BFF"}
                           edit={editMode}
                           onContextMenu={handleContextMenu}/>
            {viewOptions? <DetailOption x={detailOptionsPos.current.x}
                                        y={detailOptionsPos.current.y}
                                        editModeStatus={editMode}
                                        editModeHandler={editModeHandler}/> : null}
        </>
    )
}

export default App
