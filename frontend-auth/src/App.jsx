import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuth } from './context/AuthContext';
import { Navigate } from "react-router-dom";
import Home from "./pages/Home";
import GoogleSuccess from "./pages/GoogleSuccess";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import PanelAdmin from "./pages/PanelAdmin";
import Navbar from "./components/Navbar";
import AddService from "./pages/AddService";
import Services from "./pages/Services";
import ServiceDetail from './pages/ServiceDetail';
import AdminTurno from "./pages/AdminTurno";
import MyShifts from './pages/MyShifts';
import TurnosReservados from "./pages/TurnosReservados";
import './App.css';
import Footer from "./components/Footer";
import ReviewsSection from "./components/ReviewsSection";



function AdminRoute({ children }) {
  const token = localStorage.getItem("token");
  const rol = localStorage.getItem("rol");

  return token && rol === "admin" ? children : <Navigate to="/" />;
}

export default function App() {

  const { auth } = useAuth();

  return (
    <div className="app-container"> 
    <BrowserRouter>
    <header><Navbar /></header>
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/google-success" element={<GoogleSuccess />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <PanelAdmin />
            </AdminRoute>
          }
        />
        <Route path="/add-service" element={<AddService />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:id" element={<ServiceDetail />} />  
        <Route path="/shifts" element={<AdminTurno />} />    
        <Route path="/my-shifts" element={<MyShifts />} />
        <Route path="/turnosReservados" element={<TurnosReservados />} />
        <Route path="reviews" element={<ReviewsSection />} />
                                                                                                                                            
      </Routes>
      </main>

      <footer>
      {auth.token && <Footer />}
      </footer>
    </BrowserRouter>
    </div>
  );
}
