import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMensaje('Las contraseñas no coinciden');
      return;
    }

    try {
      const res = await fetch(`/api/auth/restablecer/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      if (res.ok) {
        setMensaje('Contraseña actualizada. Ahora podés iniciar sesión.');
        setTimeout(() => navigate('/'), 3000);
      } else {
        const error = await res.json();
        setMensaje(error.error || 'No se pudo restablecer la contraseña');
      }
    } catch (err) {
      console.error(err);
      setMensaje('Error de red');
    }
  };

  return (
    <div className="container mt-5 text-center">
      <h2>Restablecer Contraseña</h2>
      <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: '400px' }}>
        <input
          type="password"
          className="form-control my-2"
          placeholder="Nueva contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          className="form-control my-2"
          placeholder="Confirmar contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button className="btn btn-dark w-100" type="submit">Guardar contraseña</button>
      </form>
      {mensaje && <p className="mt-3">{mensaje}</p>}
    </div>
  );
}

