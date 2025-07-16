import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; // si usas íconos

function MantenimientoCRUD() {
  const [mantenimientos, setMantenimientos] = useState([]);
  const [form, setForm] = useState({ id_vehiculo: '', fecha: '', descripcion: '', costo: '' });
  const [editId, setEditId] = useState(null);

  const loadMantenimientos = async () => {
    const res = await axios.get('http://localhost:3001/api/mantenimientos');
    setMantenimientos(res.data);
  };

  useEffect(() => {
    loadMantenimientos();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId === null) {
        await axios.post('http://localhost:3001/api/mantenimientos', form);
        Swal.fire('✅ Registrado', 'Mantenimiento agregado exitosamente', 'success');
      } else {
        await axios.put(`http://localhost:3001/api/mantenimientos/${editId}`, form);
        Swal.fire('✏️ Actualizado', 'Mantenimiento actualizado correctamente', 'info');
        setEditId(null);
      }
      setForm({ id_vehiculo: '', fecha: '', descripcion: '', costo: '' });
      loadMantenimientos();
    } catch (error) {
      Swal.fire('❌ Error', 'Hubo un problema con la operación', 'error');
    }
  };

  const handleEdit = (m) => {
    setForm(m);
    setEditId(m.id_mantenimiento);
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(`http://localhost:3001/api/mantenimientos/${id}`);
        Swal.fire('🗑️ Eliminado', 'El mantenimiento fue eliminado', 'success');
        loadMantenimientos();
      }
    });
  };

  return (
    <div className="mt-4">
      <h3 className="text-center text-warning mb-4"><i className="bi bi-tools me-2"></i>Gestión de Mantenimientos</h3>

      <form onSubmit={handleSubmit} className="card shadow-sm p-4 mb-4">
        <div className="row g-3">
          <div className="col-md-3">
            <input
              name="id_vehiculo"
              placeholder="ID Vehículo"
              className="form-control"
              value={form.id_vehiculo}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-3">
            <input
              name="fecha"
              type="date"
              className="form-control"
              value={form.fecha}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-3">
            <input
              name="descripcion"
              placeholder="Descripción"
              className="form-control"
              value={form.descripcion}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-2">
            <input
              name="costo"
              type="number"
              placeholder="Costo"
              className="form-control"
              value={form.costo}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-1 text-end">
            <button type="submit" className="btn btn-primary w-100">
              {editId ? 'Actualizar' : 'Agregar'}
            </button>
          </div>
        </div>
      </form>

      <div className="table-responsive">
        <table className="table table-hover table-bordered align-middle text-center shadow-sm">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>ID Vehículo</th>
              <th>Fecha</th>
              <th>Descripción</th>
              <th>Costo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {mantenimientos.map((m) => (
              <tr key={m.id_mantenimiento}>
                <td>{m.id_mantenimiento}</td>
                <td>{m.id_vehiculo}</td>
                <td>{m.fecha}</td>
                <td>{m.descripcion}</td>
                <td>${parseFloat(m.costo).toFixed(2)}</td>
                <td>
                  <button onClick={() => handleEdit(m)} className="btn btn-sm btn-warning me-2">
                    <i className="bi bi-pencil-fill"></i>
                  </button>
                  <button onClick={() => handleDelete(m.id_mantenimiento)} className="btn btn-sm btn-danger">
                    <i className="bi bi-trash-fill"></i>
                  </button>
                </td>
              </tr>
            ))}
            {mantenimientos.length === 0 && (
              <tr>
                <td colSpan="6" className="text-muted">No hay registros de mantenimiento.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MantenimientoCRUD;
