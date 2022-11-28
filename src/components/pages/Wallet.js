import '../css/page.css'
import '../css/wallet.css'
import Sidebar from '../Sidebar'
import { Outlet } from 'react-router-dom'
import AnimatedPage from '../AnimatedPage'

const Wallet = () => {
  return (
    <AnimatedPage>
    <div className="wallet-page">
      <Sidebar />
      <Outlet />

    </div>
    </AnimatedPage>
  )
}

export default Wallet