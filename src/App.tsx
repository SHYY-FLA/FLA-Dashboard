import './App.css'
import DashboardBase from "./components/dashboard/base/DashboardBase.tsx";

function App() {
    const handleContextMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        console.log('Right click - custom context menu');
    };


    return (
        <>
            <DashboardBase width={800}
                           height={800}
                           column={3}
                           row={3}
                           radius={15}
                           gap={16}
                           primary={"#007BFF"}
                           edit={true}
                           onContextMenu={handleContextMenu}/>

        </>
    )
}

export default App
