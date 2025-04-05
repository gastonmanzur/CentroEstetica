// src/pages/Services.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import './Services.css';

const Services = () => {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/services')
      .then(res => res.json())
      .then(data => setServices(data))
      .catch(err => console.error('Error al obtener servicios:', err));
  }, []);

  return (
    <div className="services-page">
      <h1>Servicios</h1>
      <div className="services-container">
        {services.map(service => (
          <div
            key={service._id}
            className="service-vertical-card"
          >
            <img src={service.imagen_card} alt={service.title} />
            <div className="service-info">
              <h3>{service.title}</h3>
              <p>{service.basic_description}</p>
              <button onClick={() => navigate(`/services/${service._id}`)}>
                Ver más
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
