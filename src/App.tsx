import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import DashboardPage from './components/pages/dashboard'
import SeatsPage from './components/pages/seats'
import SeatsLayoutPage from './components/pages/seats-layout'
import BookedSeatsPage from './components/pages/booked-seats'
import HomePage from './components/pages/home'
import { AuthProvider } from './context/AuthProvider'
import LoginPage from './components/pages/login-page'
import ProtectedRoute from './components/protected-route'

function App() {

  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/seats" element={<SeatsPage />} />
              <Route path="/booked-seats" element={<BookedSeatsPage />} />
              <Route path="/seats-layout" element={<SeatsLayoutPage />} />
            </Route>

          </Routes>
        </AuthProvider>
      </Router>


    </>
  )
}

export default App
