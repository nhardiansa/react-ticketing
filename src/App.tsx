import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import DashboardPage from './components/pages/dashboard'
import SeatsPage from './components/pages/seats'
import SeatsLayoutPage from './components/pages/seats-layout'
import BookedSeatsPage from './components/pages/booked-seats'
import HomePage from './components/pages/home'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/seats" element={<SeatsPage />} />
          <Route path="/booked-seats" element={<BookedSeatsPage />} />
          <Route path="/seats-layout" element={<SeatsLayoutPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
