import React, { useEffect, useState } from 'react';

const MyShifts = () => {
  const [shifts, setShifts] = useState([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (!userId) return;

    fetch(`/api/shifts/user/${userId}`)
      .then(res => res.json())
      .then(data => setShifts(data))
      .catch(err => console.error('Error al obtener turnos del usuario:', err));
  }, [userId]);

  const cancelarTurno = async (id) => {
    const confirm = window.confirm('¿Estás seguro de cancelar este turno?');
    if (!confirm) return;

    try {
      const res = await fetch(`/api/shifts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'cancelado' })
      });

      if (res.ok) {
        alert('Turno cancelado correctamente');
        const updated = await fetch(`/api/shifts/user/${userId}`).then(r => r.json());
        setShifts(updated);
      } else {
        const error = await res.json();
        alert(error.error || 'No se pudo cancelar el turno');
      }
    } catch (err) {
      console.error('Error al cancelar turno:', err);
      alert('Error de red');
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Mis Turnos</h2>

      {shifts.length === 0 ? (
        <div>
        <p className="text-center">No tenés turnos reservados aún.</p>
        <div className='separador'></div>
        </div>
      ) : (
        <div className="row">
          {shifts.map(shift => (
            <div key={shift._id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100 p-3 shadow-sm">
                <h5 className="mb-2">{shift.serviceId?.title || 'Servicio'}</h5>
                <p><strong>📅 Fecha:</strong> {shift.date}</p>
                <p><strong>⏰ Hora:</strong> {shift.time}</p>
                <p><strong>Estado:</strong> <span className={`badge bg-${shift.status === 'confirmado' ? 'success' : shift.status === 'reservado' ? 'warning text-dark' : 'secondary'}`}>{shift.status}</span></p>

                {(shift.status === 'reservado' || shift.status === 'confirmado') && (
                  <button
                    className="btn btn-outline-danger mt-3"
                    onClick={() => cancelarTurno(shift._id)}
                  >
                    ❌ Cancelar este turno
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyShifts;
