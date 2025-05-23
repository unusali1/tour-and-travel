import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './components/Home/HomePage'
import HotelList from './pages/HotelList'
import Footter from './components/Section/Footter'
import VisaDetails from './pages/VisaDetails'
import HotelDetails from './pages/HotelDetails'
import AuthPage from './pages/AuthPage'
import BookingPage from './pages/BookingPage'
import OrderListPage from './pages/OrderListPage'
import VisaBooking from './pages/VisaBooking'


function App() {


  return (
    <>
   
     <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/hotel/list" element={<HotelList />} />
      <Route path="/visa/:slug" element={<VisaDetails />} />
      <Route path="/visaBooking" element={<VisaBooking />} />
      <Route path="/hotelDetails/:slug" element={<HotelDetails />} />
      <Route path="/hotel/booking" element={<BookingPage />} />
      <Route path="/hotel/my-booking-room" element={<OrderListPage />} />
    </Routes>
    <Footter />
     
    </>
  )
}

export default App
