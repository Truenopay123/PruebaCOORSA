import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function PersonaCRUD() {
  const [personas, setPersonas] = useState([]);
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    direccion: '',
  });
  const [editId, setEditId] = useState(null);

  const loadPersonas = async () => {
    const res = await axios.get('http://localhost:3001/api/personas');
    setPersonas(res.data);
  };

  useEffect(() => {
    loadPersonas();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId === null) {
        await axios.post('http://localhost:3001/api/personas', form);
        Swal.fire('✅ Registrado', 'Persona agregada exitosamente', 'success');
      } else {
        await axios.put(`http://localhost:3001/api/personas/${editId}`, form);
        Swal.fire('✏️ Actualizado', 'Persona actualizada correctamente', 'info');
        setEditId(null);
      }
      setForm({
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        direccion: '',
      });
      loadPersonas();
    } catch (err) {
      Swal.fire('❌ Error', 'No se pudo completar la operación', 'error');
    }
  };

  const handleEdit = (persona) => {
    setForm(persona);
    setEditId(persona.id_persona);
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: '¿Eliminar?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(`http://localhost:3001/api/personas/${id}`);
        Swal.fire('🗑️ Eliminado', 'La persona fue eliminada', 'success');
        loadPersonas();
      }
    });
  };

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">
            <i className="bi bi-person-fill me-2"></i>Gestión de Personas
          </h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit} className="row g-3 mb-4">
            <div className="col-md-4">
              <input
                name="nombre"
                placeholder="Nombre"
                className="form-control"
                value={form.nombre}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4">
              <input
                name="apellido"
                placeholder="Apellido"
                className="form-control"
                value={form.apellido}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4">
              <input
                name="email"
                placeholder="Email"
                className="form-control"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4">
              <input
                name="telefono"
                placeholder="Teléfono"
                className="form-control"
                value={form.telefono}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <input
                name="direccion"
                placeholder="Dirección"
                className="form-control"
                value={form.direccion}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-2 d-grid">
              <button className="btn btn-success" type="submit">
                {editId ? 'Actualizar' : 'Agregar'}
              </button>
            </div>
          </form>

          <div className="table-responsive">
            <table className="table table-bordered table-hover text-center align-middle">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Teléfono</th>
                  <th>Dirección</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {personas.length > 0 ? (
                  personas.map((p) => (
                    <tr key={p.id_persona}>
                      <td>{p.id_persona}</td>
                      <td>{p.nombre} {p.apellido}</td>
                      <td>{p.email}</td>
                      <td>{p.telefono}</td>
                      <td>{p.direccion}</td>
                      <td>
                        <button
                          onClick={() => handleEdit(p)}
                          className="btn btn-sm btn-warning me-2"
                        >
                          <i className="bi bi-pencil-fill"></i>
                        </button>
                        <button
                          onClick={() => handleDelete(p.id_persona)}
                          className="btn btn-sm btn-danger"
                        >
                          <i className="bi bi-trash-fill"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-muted">
                      No hay registros de personas.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonaCRUD;
