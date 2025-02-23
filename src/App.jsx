import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './components/Home/HomePage'
import About from './pages/About'
import Header from './components/Navbar/Header'
import HotelList from './pages/HotelList'
import Footter from './components/Section/Footter'
import VisaDetails from './pages/VisaDetails'
import HotelDetails from './pages/HotelDetails'


function App() {


  return (
    <>
   
     <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<About />} />
      <Route path="/hotel/list" element={<HotelList />} />
      <Route path="/visa/country=" element={<VisaDetails />} />
      <Route path="/hotelDetails/:id" element={<HotelDetails />} />
    </Routes>
    <Footter />
     
    </>
  )
}

export default App
