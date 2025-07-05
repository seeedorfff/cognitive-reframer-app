import './App.css'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import RootLayout from './components/RootLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

function App() {
  return (
   <BrowserRouter>
    <Routes>
      <Route path="/" element={<RootLayout />}>
      {/* Child routes are rendered inside the RootLayout's <Outlet /> */}
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>
    </Routes>
   </BrowserRouter>
  )
}

export default App
