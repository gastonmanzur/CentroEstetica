import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ServiceDetail = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [shifts, setShifts] = useState([]);
  const [booking, setBooking] = useState({
    name: '',
    email: '',
    date: '',
    time: ''
  });

  useEffect(() => {
    fetch(`/api/services/${id}`)
      .then(res => res.json())
      .then(data => setService(data))
      .catch(err => console.error('Error al obtener detalle:', err));
  }, [id]);

  useEffect(() => {
    fetch(`/api/shifts/service/${id}`)
      .then(res => res.json())
      .then(data => setShifts(data.filter(s => s.status === 'disponible')));
  }, [id]);

  const handleBookingChange = (e) => {
    setBooking({ ...booking, [e.target.name]: e.target.value });
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = {
      ...booking,
      serviceId: id
    };

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend)
      });

      if (res.ok) {
        alert('Turno reservado con éxito');
        setBooking({ name: '', email: '', date: '', time: '' });
      } else {
        alert('Error al reservar');
      }
    } catch (err) {
      console.error(err);
      alert('Error de red');
    }
  };

  const reservarTurno = async (shiftId) => {
    const confirm = window.confirm("¿Confirmar reserva de este turno?");
    if (!confirm) return;

    const userId = localStorage.getItem('userId');
    if (!userId || userId === 'undefined') {
      alert('Tenés que iniciar sesión para reservar un turno.');
      return;
    }

    try {
      const res = await fetch(`/api/shifts/${shiftId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: 'reservado',
          bookedBy: userId
        })
      });

      if (res.ok) {
        alert('Turno reservado con éxito');
        setShifts(prev => prev.filter(s => s._id !== shiftId));
      } else {
        const error = await res.json();
        alert(error.error || 'Error al reservar turno');
      }
    } catch (err) {
      console.error(err);
      alert('Error de red');
    }
  };

  if (!service) return <div className="container py-5">Cargando...</div>;

  return (
    <div className="container py-5">
      <div className="text-center mb-4">
        <img
          src={service.imagen_info}
          alt={service.title}
          style={{ maxWidth: '100%', borderRadius: '12px' }}
        />
        <h1 className="mt-4">{service.title}</h1>
        <h3 className="text-muted">{service.subtitle}</h3>
      </div>

      <div className="mb-5">
        <p>{service.full_description}</p>
        <p><strong>💰 Precio:</strong> ${service.price}</p>
        <p><strong>⏱ Duración:</strong> {service.duration}</p>
        <p><strong>👩 Profesional:</strong> {service.professional}</p>
      </div>

      <h3 className="mb-3">Turnos disponibles</h3>
      <div className="row">
        {shifts.length === 0 ? (
          <p>No hay turnos disponibles para este servicio.</p>
        ) : (
          shifts.map(shift => (
            <div key={shift._id} className="col-md-4">
              <div className="card p-3 mb-3 text-center">
                <p><strong>📅 Fecha:</strong> {shift.date}</p>
                <p><strong>⏰ Hora:</strong> {shift.time}</p>
                <button onClick={() => reservarTurno(shift._id)} className="btn btn-dark">
                  Reservar
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ServiceDetail;
