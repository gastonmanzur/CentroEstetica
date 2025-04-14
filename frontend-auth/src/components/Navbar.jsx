import { Link, useNavigate } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import FotoUploader from './FotoUploader'; // Ajustá la ruta si lo tenés en otro lugar


export default function Navbar() {
  const navigate = useNavigate();
  const rol = localStorage.getItem('rol');
  const foto = localStorage.getItem('foto'); // si existe
  const isLoggedIn = localStorage.getItem('token');
  const isExternal = foto?.startsWith('http');
  

  const itemsAdmin = [
    { label: 'Servicios', path: '/services' },
    { label: 'Gestionar Servicios', path: '/add-service' },
    { label: 'Gestionar Turnos', path: '/shifts' },
    { label: 'Turnos', path: '/turnosReservados' }
  ];

  const itemsUsuario = [
    { label: 'Servicios', path: '/services' },
    { label: 'Mis Turnos', path: '/my-shifts' },
    { label: 'Contacto', path: '/contacto' }
  ];

  const handleNavigate = (path) => navigate(path);

  const handleUploadFoto = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    const formData = new FormData();
    formData.append('foto', file);
  
    const userId = localStorage.getItem('userId');
  
    try {
      const res = await fetch(`/api/users/${userId}/foto`, {
        method: 'PUT',
        body: formData
      });
  
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('foto', data.foto);
        alert('Foto actualizada');
        window.location.reload(); // recargar para reflejar cambio
      } else {
        alert(data.error || 'Error al subir la foto');
      }
    } catch (err) {
      console.error('Error al subir foto:', err);
      alert('Error de red');
    }
  };
  

  return (
     isLoggedIn && (

<nav className="navbar navbar-expand-lg d-flex  navbar-dark bg-body-tertiary">
  <div className="container-fluid">
  <Link to="/dashboard" className="logo flex-fill">Aesthetic</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse flex-row" id="navbarSupportedContent">
    
    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        {(rol === 'admin' ? itemsAdmin : itemsUsuario).map((item) => (
             <li key={item.label} onClick={() => handleNavigate(item.path)}>
              {item.label}
             </li>
           ))}
         </ul>
      
      <div className="navbar-right profile-pic ">
      <input
  type="file"
  accept="image/*"
  id="uploadFoto"
  style={{ display: 'none' }}
  onChange={handleUploadFoto}
/>

<img
  src={
    isExternal
      ? foto
      : foto
      ? `http://localhost:5000${foto}`
      : '/default-profile.png'
  }
  alt="Perfil"
  className="avatar"
  onClick={() => document.getElementById('uploadFoto').click()}
/>
           <div className="navbar-right">
           <LogoutButton />
          </div>
        </div>
    </div>
  </div>
</nav>
    )  );
}
