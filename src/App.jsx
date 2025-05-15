
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Header from './components/Header'
import Footer from './components/Footer'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './pages/Dashboard'
import CarOwnerDashboard from './pages/CarOwnerDashboard'
import AddVehicle from './components/AddVehicle'
function App() {
 

  return (
    <>
    {/* < Header/> */}
     <Routes>
      <Route path='/' element={< Home/>}/>
      <Route path='/login' element={< LoginPage/>}/>
      <Route path='/register' element={< RegisterPage/>}/>
      <Route path='/dashboard' element={< Dashboard/>}/>
      <Route path='/ownerDashboard' element={< CarOwnerDashboard />}/>
     
    
     </Routes>
      <ToastContainer />
     < Footer/>
    </>
  )
}

export default App
