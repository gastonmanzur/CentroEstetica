import React, { useEffect, useState } from 'react';

const MyShifts = () => {
  const [shifts, setShifts] = useState([]);

  // Suponiendo que tenés el usuario actual en localStorage
  const userId = localStorage.getItem('userId');

  console.log('userId:', localStorage.getItem('userId'));

 useEffect(() => {
  if (!userId) return; // 👈 importante para evitar error 500

  fetch(`/api/shifts/user/${userId}`)
    .then(res => res.json())
    .then(data => setShifts(data))
    .catch(err => console.error('Error al obtener turnos del usuario:', err));
}, [userId]);


  return (
    <div className="my-shifts">
      <h2>Mis Turnos Reservados</h2>
      {shifts.length === 0 ? (
        <p>No tenés turnos reservados aún.</p>
      ) : (
        shifts.map(shift => (
          <div key={shift._id} className="shift-card">
            <h4>{shift.serviceId?.title || 'Servicio'}</h4>
            <p><strong>Fecha:</strong> {shift.date}</p>
            <p><strong>Hora:</strong> {shift.time}</p>
            <p><strong>Estado:</strong> {shift.status}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default MyShifts;
