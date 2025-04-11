import React, { useEffect, useState } from 'react';
// import './AdminTurno.css';

const AdminTurno = () => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState('');
  const [shifts, setShifts] = useState([]);
  const [form, setForm] = useState({ date: '', time: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Obtener servicios
  useEffect(() => {
    fetch('/api/services')
      .then(res => res.json())
      .then(data => setServices(data));
  }, []);

  // Obtener turnos del servicio seleccionado
  useEffect(() => {
    if (selectedService) {
      fetch(`/api/shifts/service/${selectedService}`)
        .then(res => res.json())
        .then(data => setShifts(data));
    }
  }, [selectedService]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const dataToSend = { ...form, serviceId: selectedService };

    const url = isEditing
      ? `/api/shifts/${editingId}`
      : '/api/shifts';

    const method = isEditing ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataToSend)
    });

    if (res.ok) {
      alert(isEditing ? 'Turno actualizado' : 'Turno creado');
      setForm({ date: '', time: '' });
      setIsEditing(false);
      setEditingId(null);
      // Actualizar lista
      fetch(`/api/shifts/service/${selectedService}`)
        .then(res => res.json())
        .then(data => setShifts(data));
    }
  };

  const startEdit = shift => {
    setForm({ date: shift.date, time: shift.time });
    setIsEditing(true);
    setEditingId(shift._id);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditingId(null);
    setForm({ date: '', time: '' });
  };

  const handleDelete = async id => {
    const confirm = window.confirm('¿Eliminar este turno?');
    if (!confirm) return;

    const res = await fetch(`/api/shifts/${id}`, { method: 'DELETE' });
    if (res.ok) {
      fetch(`/api/shifts/service/${selectedService}`)
        .then(res => res.json())
        .then(data => setShifts(data));
    }
  };

  return (
    <div className="admin-turno">
      <h2>Gestión de Turnos</h2>

      <label>Seleccionar servicio:</label>
      <select value={selectedService} onChange={e => setSelectedService(e.target.value)}>
        <option value="">-- Elegir --</option>
        {services.map(service => (
          <option key={service._id} value={service._id}>
            {service.title}
          </option>
        ))}
      </select>

      {selectedService && (
        <>
          <h3>{isEditing ? 'Editar turno' : 'Agregar turno'}</h3>
          <form onSubmit={handleSubmit} className="shift-form">
            <input type="date" name="date" value={form.date} onChange={handleChange} required />
            <input type="time" name="time" value={form.time} onChange={handleChange} required />
            <button type="submit">{isEditing ? 'Guardar cambios' : 'Agregar turno'}</button>
            {isEditing && (
              <button type="button" onClick={cancelEdit} style={{ backgroundColor: '#999' }}>
                Cancelar
              </button>
            )}
          </form>
        
          <h3>Turnos creados</h3>
          <div className="shift-list">
            {shifts.map(shift => (
              <div key={shift._id} className="shift-card">
                <p><strong>Fecha:</strong> {shift.date}</p>
                <p><strong>Hora:</strong> {shift.time}</p>
                <p><strong>Estado:</strong> {shift.status}</p>
                <button onClick={() => startEdit(shift)}>✏️ Editar</button>
                <button onClick={() => handleDelete(shift._id)}>🗑️ Eliminar</button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AdminTurno;
