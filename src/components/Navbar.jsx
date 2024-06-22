import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const currentUser = null; // No se ha implementado el contexto de autenticación todavía

  const handleLogout = () => {
    // La función de cierre de sesión se implementará más adelante
  };

  return (
    <nav>
      <div className="navbar">
        <Link to="/">Home</Link>
        {currentUser ? (
          <>
            {/* La lógica de administración y carrito se implementará más adelante */}
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
