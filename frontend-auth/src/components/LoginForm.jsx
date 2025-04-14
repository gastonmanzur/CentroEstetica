import axios from 'axios';

export default function LoginForm() {
  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });

      const { token, usuario } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('rol', usuario.rol);
      localStorage.setItem('foto', usuario.foto || '');
      localStorage.setItem('userId', usuario._id);
      localStorage.setItem('userName', usuario.nombre);

      alert(`Bienvenido ${usuario.nombre}`);
      window.location.href = '/dashboard';
    } catch (err) {
      alert(err.response?.data?.mensaje || 'Error al iniciar sesión');
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5000/api/auth/google';
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow mx-auto" style={{ maxWidth: '400px' }}>
        <h3 className="text-center mb-4">Iniciar sesión</h3>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Correo electrónico"
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Contraseña"
              required
            />
          </div>

          <button className="btn btn-dark w-100" type="submit">
            Ingresar
          </button>

          <div className="text-center mt-3">
            <a href="/recuperar" className="small text-muted">
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          <hr className="my-4" />

          <button
            type="button"
            className="btn btn-outline-danger w-100"
            onClick={handleGoogleLogin}
          >
            Ingresar con Google
          </button>
        </form>
      </div>
    </div>
  );
}
