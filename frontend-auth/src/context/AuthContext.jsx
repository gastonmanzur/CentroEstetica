import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: null,
    userId: null,
    rol: null,
    foto: null,
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const rol = localStorage.getItem('rol');
    const foto = localStorage.getItem('foto');

    if (token) {
      setAuth({ token, userId, rol, foto });
    }
  }, []);

  const login = ({ token, userId, rol, foto }) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    localStorage.setItem('rol', rol);
    if (foto) localStorage.setItem('foto', foto);

    setAuth({ token, userId, rol, foto });
  };

  const logout = () => {
    localStorage.clear();
    setAuth({ token: null, userId: null, rol: null, foto: null });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar el contexto fácilmente
export const useAuth = () => useContext(AuthContext);
