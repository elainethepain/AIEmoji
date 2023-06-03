import { Route, Routes } from "react-router-dom"
import Home from "./components/Home"
import Demo from "./components/Demo"

export function App() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/demo" element={<Demo />} />
    </Routes>
  )
}

export default App;