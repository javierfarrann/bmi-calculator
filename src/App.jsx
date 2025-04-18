import { Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import BMI from './pages/BMICalculator';
import ProfilePage from './pages/ProfilePage';
import ProtectedRoute from './components/ProtectedRoute';
import HistoryPage from './pages/HistoryPage';
import Navbar from './components/Navbar';
import SidebarLayout from './components/layouts/SidebarLayout';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/bmicalculator" element={<ProtectedRoute><BMI /></ProtectedRoute>} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <SidebarLayout>
                <ProfilePage />
              </SidebarLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <SidebarLayout>
                <HistoryPage />
              </SidebarLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
