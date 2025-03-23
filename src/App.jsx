import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './components/Home/HomePage'
import Header from './components/Navbar/Header'
import HotelList from './pages/HotelList'
import Footter from './components/Section/Footter'
import VisaDetails from './pages/VisaDetails'
import HotelDetails from './pages/HotelDetails'
import AuthPage from './pages/AuthPage'
import BookingPage from './pages/BookingPage'


function App() {


  return (
    <>
   
     <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/hotel/list" element={<HotelList />} />
      <Route path="/visa/country=" element={<VisaDetails />} />
      <Route path="/hotelDetails/:slug" element={<HotelDetails />} />
      <Route path="/hotel/booking" element={<BookingPage />} />
    </Routes>
    <Footter />
     
    </>
  )
}

export default App
