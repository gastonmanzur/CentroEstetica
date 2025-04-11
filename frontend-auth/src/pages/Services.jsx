import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div className="container py-5">
      <h1 className="text-center mb-5">Nuestros Servicios</h1>
      <div className="row">
        {services.map(service => (
          <div key={service._id} className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <img
                src={service.imagen_card}
                alt={service.title}
                className="card-img-top"
                style={{ height: '220px', objectFit: 'cover' }}
              />
              <div className="card-body d-flex flex-column justify-content-between">
                <div>
                  <h5 className="card-title">{service.title}</h5>
                  <p className="card-text">{service.basic_description}</p>
                </div>
                <button
                  className="btn btn-dark mt-3"
                  onClick={() => navigate(`/services/${service._id}`)}
                >
                  Ver más
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
