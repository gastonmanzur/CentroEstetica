import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-dark text-light pt-4 pb-3 mt-5 footer">
      <div className="container">
        <div className="row">

          {/* Info de contacto */}
          <div className="col-md-4 mb-3">
            <h5 className="text-accent">Centro de Estética</h5>
            <p className="mb-1">📍 Calle Belleza 123, Ciudad</p>
            <p className="mb-1">📞 (011) 1234-5678</p>
            <p>✉️ contacto@esteticas.com</p>
          </div>

          {/* Enlaces rápidos */}
          <div className="col-md-4 mb-3">
            <h5 className="text-accent">Enlaces</h5>
            <ul className="list-unstyled">
              <li><a href="/services" className="text-light text-decoration-none">Servicios</a></li>
              <li><a href="/my-shifts" className="text-light text-decoration-none">Mis Turnos</a></li>
              <li><a href="/contacto" className="text-light text-decoration-none">Contacto</a></li>
            </ul>
          </div>

          {/* Redes sociales */}
          <div className="col-md-4 mb-3">
            <h5 className="text-accent">Seguinos</h5>
            <Link to="https://www.instagram.com/" className="text-light text-decoration-none d-block mb-1">
              <i className="bi bi-instagram me-2"></i>Instagram
            </Link>
            <Link to="https://es-la.facebook.com" className="text-light text-decoration-none d-block">
              <i className="bi bi-facebook me-2"></i>Facebook
            </Link>
          </div>
        </div>

        <div className="text-center pt-3 border-top border-secondary">
          <small>&copy; {new Date().getFullYear()} Estéticas — Todos los derechos reservados.</small>
        </div>
      </div>
    </footer>
  );
}
