import './App.css'
import DashboardBase from "./components/dashboard/base/DashboardBase.tsx";

function App() {

  return (
    <>
        <DashboardBase width={800}
                       height={800}
                       column={3}
                       row={3}
                       // background={"white"}
                       radius={15}
                       gap={16}/>
    </>
  )
}

export default App
