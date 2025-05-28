import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './pages/Dashboard';
import CarOwnerDashboard from './pages/CarOwnerDashboard';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import AdminDashboard from './pages/Admin/AdminDashboard';



function App() {
  return (
    <>
     <PayPalScriptProvider options={{
  "client-id": "AWP-HzOWzFu4BkcYzDnxIK4zag2TYzhjiiPPMoX295KiieDXJGtF6Ks33WicIG_z1jp6AGU-8MYiw8TU",
  currency: "USD"
}}>
  <Routes>
    <Route path='/' element={< Home />} />
    <Route path='/login' element={< LoginPage />} />
    <Route path='/register' element={< RegisterPage />} />
    <Route path='/dashboard' element={< Dashboard />} />
    <Route path='/admin' element={< AdminDashboard/>}/>
    <Route path='/ownerDashboard' element={< CarOwnerDashboard />} />
  </Routes>
  <ToastContainer />
  <Footer />
</PayPalScriptProvider>

    </>
  );
}

export default App;
