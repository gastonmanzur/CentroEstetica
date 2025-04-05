import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import './ServiceDetail.css';

const ServiceDetail = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
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
    const id = localStorage.getItem('userId');
    console.log('User ID desde localStorage:', id);
  }, []);
  

  const [shifts, setShifts] = useState([]);

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
    if (!userId) {
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
  
  

  if (!service) return <div>Cargando...</div>;

  return (
    <div className="service-detail">
      <img src={service.imagen_info} alt={service.title} />
      <h1>{service.title}</h1>
      <h3>{service.subtitle}</h3>
      <p className="description">{service.full_description}</p>
      <p><strong>Precio:</strong> ${service.price}</p>
      <p><strong>Duración:</strong> {service.duration}</p>
      <p><strong>Profesional:</strong> {service.professional}</p>

      <h3 style={{ marginTop: '40px' }}>Reservar turno</h3>
      <form onSubmit={handleBookingSubmit} className="booking-form">
     
     <h3 style={{ marginTop: '40px' }}>Turnos disponibles</h3>
<div className="shift-list">
  {shifts.length === 0 ? (
    <p>No hay turnos disponibles para este servicio.</p>
  ) : (
    shifts.map(shift => (
      <div key={shift._id} className="shift-card">
        <p><strong>Fecha:</strong> {shift.date}</p>
        <p><strong>Hora:</strong> {shift.time}</p>
        <button onClick={() => reservarTurno(shift._id)}>Reservar</button>
      </div>
    ))
  )}
</div>
      </form>
    </div>
  );
};

export default ServiceDetail;
