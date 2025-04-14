import { useState } from 'react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
        const res = await fetch('/api/auth/recuperar', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        });
      
        let data = { error: 'Error desconocido' };
        try {
          data = await res.json();
        } catch (e) {
          console.error('❌ Error leyendo JSON:', e);
        }
      
        setMensaje(data.mensaje || data.error);
      } catch (err) {
        console.error(err);
        setMensaje('Error de red');
      }
    }      
  

  return (
    <div className="container mt-5 text-center">
      <h2>¿Olvidaste tu contraseña?</h2>
      <p>Ingresá tu email y te enviaremos un enlace para restablecerla.</p>
      <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: '400px' }}>
        <input
          type="email"
          className="form-control my-3"
          placeholder="Tu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button className="btn btn-dark w-100" type="submit">Enviar instrucciones</button>
      </form>
      {mensaje && <p className="mt-3">{mensaje}</p>}
    </div>
  );
}
