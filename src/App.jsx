import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import { UserContextProvider } from "./context/DataContext";
function App() {
  console.log(import.meta.env.VITE_API)
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path={import.meta.env.VITE_HOST} element={<Home />} />
          <Route path={import.meta.env.VITE_HOST+'/Login'} element={<Login />} />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  )
}

export default App
