import './App.css'
import FlaDashboard from "./components/dashboard/FlaDashboard.tsx";

const App = () => {
    return (
        <FlaDashboard width={1000} height={1000} column={10} row={10} element={[
            {id: 1, location: 1, width: 2, height: 2,}
        ]} />
    )
}

export default App
