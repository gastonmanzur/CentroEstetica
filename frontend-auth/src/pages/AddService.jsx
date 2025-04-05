import React, { useState, useEffect } from 'react';
// import './AddService.css';

const AddService = () => {
  const initialForm = {
    title: '',
    subtitle: '',
    basic_description: '',
    full_description: '',
    price: '',
    duration: '',
    professional: '',
    imagen_card: '',
    imagen_info: ''
  };

  const [form, setForm] = useState(initialForm);
  const [services, setServices] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const fetchServices = () => {
    fetch('/api/services')
      .then(res => res.json())
      .then(data => setServices(data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const url = isEditing ? `/api/services/${editingId}` : '/api/services';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (res.ok) {
        alert(isEditing ? 'Servicio actualizado' : 'Servicio creado exitosamente');
        setForm(initialForm);
        setIsEditing(false);
        setEditingId(null);
        fetchServices();
      } else {
        alert('Error al guardar servicio');
      }
    } catch (err) {
      console.error(err);
      alert('Error de red');
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("¿Estás seguro de eliminar este servicio?");
    if (!confirm) return;

    try {
      const res = await fetch(`/api/services/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        fetchServices();
      } else {
        alert('Error al eliminar');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const startEdit = (service) => {
    setForm({ ...service });
    setIsEditing(true);
    setEditingId(service._id);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditingId(null);
    setForm(initialForm);
  };

  return (
    <div className="add-service-form">
      <h2>{isEditing ? 'Editar servicio' : 'Agregar nuevo servicio'}</h2>
      <form onSubmit={handleSubmit}>
        {[
          { label: 'Título', name: 'title' },
          { label: 'Subtítulo', name: 'subtitle' },
          { label: 'Descripción básica', name: 'basic_description' },
          { label: 'Descripción completa', name: 'full_description' },
          { label: 'Precio', name: 'price', type: 'number' },
          { label: 'Duración', name: 'duration' },
          { label: 'Profesional', name: 'professional' },
          { label: 'Imagen para tarjeta', name: 'imagen_card' },
          { label: 'Imagen para info', name: 'imagen_info' }
        ].map(({ label, name, type = 'text' }) => (
          <div key={name}>
            <label>{label}</label>
            <input
              type={type}
              name={name}
              value={form[name]}
              onChange={handleChange}
              required
            />
          </div>
        ))}

        <button type="submit">
          {isEditing ? 'Guardar cambios' : 'Agregar servicio'}
        </button>

        {isEditing && (
          <button type="button" onClick={cancelEdit} style={{ marginTop: '10px', backgroundColor: '#999' }}>
            Cancelar edición
          </button>
        )}
      </form>

      <h3 style={{ marginTop: '40px' }}>Servicios existentes</h3>
      <div className="service-admin-list">
        {services.map(service => (
          <div key={service._id} className="service-admin-card">
            <h4>{service.title}</h4>
            <p>{service.basic_description}</p>
            <button onClick={() => startEdit(service)}>✏️ Editar</button>
            <button onClick={() => handleDelete(service._id)}>🗑️ Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddService;
