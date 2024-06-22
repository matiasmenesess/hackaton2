import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import ProductList from './components/ProductList';
import Navbar from './components/Navbar';
import Client from './components/Client';
import Admin from './components/Admin';
import SearchPage from './pages/ProductPage'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/client" element={<Client />} />
        <Route path="/search" element={<SearchPage />} />

      </Routes>
    </Router>
  );
}

export default App;