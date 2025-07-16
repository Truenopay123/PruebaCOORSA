// archivo: frontend/src/components/VehiculoCRUD.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function VehiculoCRUD() {
  const [vehiculos, setVehiculos] = useState([]);
  const [form, setForm] = useState({ id_persona: '', marca: '', modelo: '', año: '', placa: '' });
  const [editId, setEditId] = useState(null);

  const loadVehiculos = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/vehiculos');
      setVehiculos(res.data);
    } catch (error) {
      Swal.fire('❌ Error', 'No se pudieron cargar los vehículos', 'error');
    }
  };

  useEffect(() => {
    loadVehiculos();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación simple
    if (!form.id_persona || !form.marca || !form.modelo || !form.año || !form.placa) {
      return Swal.fire('⚠️ Atención', 'Por favor, llena todos los campos', 'warning');
    }

    try {
      if (editId === null) {
        await axios.post('http://localhost:3001/api/vehiculos', form);
        Swal.fire('✅ Registrado', 'Vehículo agregado exitosamente', 'success');
      } else {
        await axios.put(`http://localhost:3001/api/vehiculos/${editId}`, form);
        Swal.fire('✏️ Actualizado', 'Vehículo actualizado correctamente', 'info');
        setEditId(null);
      }
      setForm({ id_persona: '', marca: '', modelo: '', año: '', placa: '' });
      loadVehiculos();
    } catch {
      Swal.fire('❌ Error', 'No se pudo completar la operación', 'error');
    }
  };

  const handleEdit = (vehiculo) => {
    setForm(vehiculo);
    setEditId(vehiculo.id_vehiculo);
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: '¿Eliminar vehículo?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:3001/api/vehiculos/${id}`);
          Swal.fire('🗑️ Eliminado', 'Vehículo eliminado correctamente', 'success');
          loadVehiculos();
        } catch {
          Swal.fire('❌ Error', 'No se pudo eliminar el vehículo', 'error');
        }
      }
    });
  };

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">
            <i className="bi bi-car-front-fill me-2"></i>Gestión de Vehículos
          </h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit} className="row g-3 mb-4">
            <div className="col-md-2">
              <input
                name="id_persona"
                placeholder="ID Persona"
                className="form-control"
                value={form.id_persona}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-3">
              <input
                name="marca"
                placeholder="Marca"
                className="form-control"
                value={form.marca}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-3">
              <input
                name="modelo"
                placeholder="Modelo"
                className="form-control"
                value={form.modelo}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-2">
              <input
                name="año"
                placeholder="Año"
                className="form-control"
                type="number"
                value={form.año}
                onChange={handleChange}
                required
                min="1900"
                max={new Date().getFullYear() + 1}
              />
            </div>
            <div className="col-md-2">
              <input
                name="placa"
                placeholder="Placa"
                className="form-control"
                value={form.placa}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-2 d-grid">
              <button className={`btn ${editId ? 'btn-warning' : 'btn-success'}`} type="submit">
                {editId ? (
                  <>
                    <i className="bi bi-pencil-fill me-1"></i>Actualizar
                  </>
                ) : (
                  <>
                    <i className="bi bi-plus-circle-fill me-1"></i>Agregar
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="table-responsive">
            <table className="table table-bordered table-hover text-center align-middle">
              <thead className="table-dark">
                <tr>
                  <th>ID Persona</th>
                  <th>Marca</th>
                  <th>Modelo</th>
                  <th>Año</th>
                  <th>Placa</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {vehiculos.length > 0 ? (
                  vehiculos.map((v) => (
                    <tr key={v.id_vehiculo}>
                      <td>{v.id_persona}</td>
                      <td>{v.marca}</td>
                      <td>{v.modelo}</td>
                      <td>{v.año}</td>
                      <td>{v.placa}</td>
                      <td>
                        <button
                          onClick={() => handleEdit(v)}
                          className="btn btn-sm btn-warning me-2"
                          title="Editar"
                        >
                          <i className="bi bi-pencil-fill"></i>
                        </button>
                        <button
                          onClick={() => handleDelete(v.id_vehiculo)}
                          className="btn btn-sm btn-danger"
                          title="Eliminar"
                        >
                          <i className="bi bi-trash-fill"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-muted">
                      No hay registros de vehículos.
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

export default VehiculoCRUD;
