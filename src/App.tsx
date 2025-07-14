import './App.css'
import DashboardBase from "./components/dashboard/base/DashboardBase.tsx";
import DetailOption from "./components/dashboard/detailOption/DetailOption.tsx";
import {useEffect, useState} from "react";

type DetailOptionsPos = {
    x: number
    y: number
}

const App = () => {
    const [viewOptions, setViewOptions] = useState(false)
    const [editMode, setEditMode] = useState(false)
    // const detailOptionsPos = useRef<DetailOptionsPos>({ x: 0, y: 0 })
    const [detailOptionsPos, setDetailOptionsPos] = useState<DetailOptionsPos>({ x: 0, y: 0 })
    const [chartData, setChartData] = useState<number[]>([10, 20, 30])

    const addChartData = () => {
        setChartData(prev => [...prev, Math.floor(Math.random() * 100)])
    }

    const handleContextMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        setDetailOptionsPos({ x: e.clientX, y: e.clientY })
        setViewOptions(true);
    };

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
                           onContextMenu={handleContextMenu}
                           chartData={chartData}/>
            <button onClick={addChartData}>데이터 추가</button>
            {viewOptions? <DetailOption x={detailOptionsPos.x}
                                        y={detailOptionsPos.y}
                                        editModeStatus={editMode}
                                        editModeHandler={editModeHandler}/> : null}
        </>
    )
}

export default App
