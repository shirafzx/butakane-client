import { Routes, Route, Navigate } from 'react-router-dom'

import Home from './pages/Home';
import Wallet from './pages/Wallet';
import AboutUs from './pages/AboutUs';
import ErrorPage from './pages/ErrorPage';

import Overview from './pages/Wallets/Overview';
import MyGoal from './pages/Wallets/MyGoal';
import MyDebt from './pages/Wallets/MyDebt';

import { AnimatePresence } from "framer-motion"
import UserRoute from '../UserRoute';


const NavRouter = () => {
  return (
    <AnimatePresence>
      <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/Debt" element={<Navigate to="/Wallet/MyDebt" />} />
          <Route path="/Goal" element={<Navigate to="/Wallet/MyGoal" />} />
          <Route path="Wallet" element={<UserRoute><Wallet/></UserRoute>}>
            <Route path="/Wallet" element={<Navigate to="Overview" />} />
            
            <Route path="Overview" element={<Overview />} />
            <Route path="MyDebt" element={<MyDebt />} />
            <Route path="MyGoal" element={<MyGoal />} />
            </Route>
          <Route path="Aboutus" element={<AboutUs/>} />
          <Route path="*" element={<ErrorPage/>} />
      </Routes>
    </AnimatePresence>
  )
}

export default NavRouter