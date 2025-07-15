import './App.css'
import Dashboard from "./components/dashboard/Dashboard.tsx";

const App = () => {
    return (
        <Dashboard width={1000} height={1000} column={10} row={10} element={[
            {id: 1, location: 1, width: 2, height: 2,}
        ]} />
    )
}

export default App
