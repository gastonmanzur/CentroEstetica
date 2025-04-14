import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RegisterForm() {
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const nombre = e.target.nombre.value;
    const apellido = e.target.apellido.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmarPassword = e.target.confirmarPassword.value;

    try {
      const res = await axios.post('http://localhost:5000/api/auth/registro', {
        nombre,
        apellido,
        email,
        password,
        confirmarPassword
      });

      setMensaje(res.data.mensaje);
      setTimeout(() => navigate('/'), 3000);
    } catch (err) {
      setMensaje(err.response?.data?.mensaje || 'Error en el registro');
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow mx-auto" style={{ maxWidth: '500px' }}>
        <h3 className="text-center mb-4">Crear cuenta</h3>
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <input type="text" name="nombre" className="form-control" placeholder="Nombre" required />
          </div>
          <div className="mb-3">
            <input type="text" name="apellido" className="form-control" placeholder="Apellido" required />
          </div>
          <div className="mb-3">
            <input type="email" name="email" className="form-control" placeholder="Correo electrónico" required />
          </div>
          <div className="mb-3">
            <input type="password" name="password" className="form-control" placeholder="Contraseña" required />
          </div>
          <div className="mb-3">
            <input type="password" name="confirmarPassword" className="form-control" placeholder="Confirmar contraseña" required />
          </div>

          <button className="btn btn-dark w-100" type="submit">Registrarse</button>
        </form>

        {mensaje && (
          <div className="alert alert-info mt-3 text-center" role="alert">
            {mensaje}
          </div>
        )}
      </div>
    </div>
  );
}
