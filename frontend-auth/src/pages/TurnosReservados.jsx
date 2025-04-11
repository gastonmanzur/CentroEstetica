import React, { useEffect, useState } from 'react';

const TurnosReservados = () => {
  const [shifts, setShifts] = useState([]);

  useEffect(() => {
    fetch('/api/shifts/reservados/admin')
      .then(res => res.json())
      .then(data => setShifts(data))
      .catch(err => console.error('Error al obtener turnos:', err));
  }, []);

  const actualizarEstado = async (id, nuevoEstado) => {
    try {
      const res = await fetch(`/api/shifts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nuevoEstado })
      });

      if (res.ok) {
        alert(`Turno ${nuevoEstado}`);
        // Actualizar lista
        const updated = await fetch('/api/shifts/reservados/admin').then(r => r.json());
        setShifts(updated);
      } else {
        const error = await res.json();
        alert(error.error || 'Error al actualizar turno');
      }
    } catch (err) {
      console.error('Error al cambiar estado del turno:', err);
      alert('Error de red');
    }
  };

  return (
    <div className="admin-shift-list">
      <h2>Turnos Reservados por Clientes</h2>
      {shifts.length === 0 ? (
        <p>No hay turnos reservados aún.</p>
      ) : (
        shifts.map(shift => (
          <div key={shift._id} className="shift-card">
            <h4>{shift.serviceId?.title || 'Servicio'}</h4>
            <p><strong>Fecha:</strong> {shift.date}</p>
            <p><strong>Hora:</strong> {shift.time}</p>
            <p><strong>Cliente:</strong> {shift.bookedBy?.nombre || 'No registrado'}</p>
            <p><strong>Email:</strong> {shift.bookedBy?.email || '---'}</p>
            <p><strong>Estado:</strong> {shift.status}</p>

            <button onClick={() => actualizarEstado(shift._id, 'confirmado')}>✅ Confirmar</button>
            <button onClick={() => actualizarEstado(shift._id, 'cancelado')}>❌ Cancelar</button>
          </div>
        ))
      )}
    </div>
  );
};

export default TurnosReservados;

