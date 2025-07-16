// archivo: frontend/src/components/RelacionCRUD.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function RelacionCRUD() {
  const [relaciones, setRelaciones] = useState([]);
  const [form, setForm] = useState({ id_persona: '', id_persona_relacionada: '', tipo_relacion: '' });
  const [editId, setEditId] = useState(null);

  const loadRelaciones = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/relaciones');
      setRelaciones(res.data);
    } catch (error) {
      Swal.fire('❌ Error', 'No se pudieron cargar las relaciones', 'error');
    }
  };

  useEffect(() => {
    loadRelaciones();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId === null) {
        await axios.post('http://localhost:3001/api/relaciones', form);
        Swal.fire('✅ Registrado', 'Relación agregada exitosamente', 'success');
      } else {
        await axios.put(`http://localhost:3001/api/relaciones/${editId}`, form);
        Swal.fire('✏️ Actualizado', 'Relación actualizada correctamente', 'info');
        setEditId(null);
      }
      setForm({ id_persona: '', id_persona_relacionada: '', tipo_relacion: '' });
      loadRelaciones();
    } catch (err) {
      Swal.fire('❌ Error', 'No se pudo completar la operación', 'error');
    }
  };

  const handleEdit = (relacion) => {
    setForm(relacion);
    setEditId(relacion.id);
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: '¿Eliminar relación?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:3001/api/relaciones/${id}`);
          Swal.fire('🗑️ Eliminado', 'La relación fue eliminada', 'success');
          loadRelaciones();
        } catch {
          Swal.fire('❌ Error', 'No se pudo eliminar la relación', 'error');
        }
      }
    });
  };

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">
            <i className="bi bi-link-45deg me-2"></i>Gestión de Relaciones
          </h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit} className="row g-3 mb-4">
            <div className="col-md-3">
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
                name="id_persona_relacionada"
                placeholder="ID Persona Relacionada"
                className="form-control"
                value={form.id_persona_relacionada}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4">
              <input
                name="tipo_relacion"
                placeholder="Tipo de Relación"
                className="form-control"
                value={form.tipo_relacion}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-2 d-grid">
              <button className={`btn ${editId ? 'btn-warning' : 'btn-success'}`} type="submit">
                {editId ? (
                  <>
                    <i className="bi bi-pencil-fill me-1"></i> Actualizar
                  </>
                ) : (
                  <>
                    <i className="bi bi-plus-circle-fill me-1"></i> Agregar
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
                  <th>ID Relacionada</th>
                  <th>Tipo de Relación</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {relaciones.length > 0 ? (
                  relaciones.map((r) => (
                    <tr key={r.id}>
                      <td>{r.id_persona}</td>
                      <td>{r.id_persona_relacionada}</td>
                      <td>{r.tipo_relacion}</td>
                      <td>
                        <button
                          onClick={() => handleEdit(r)}
                          className="btn btn-sm btn-warning me-2"
                          title="Editar"
                        >
                          <i className="bi bi-pencil-fill"></i>
                        </button>
                        <button
                          onClick={() => handleDelete(r.id)}
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
                    <td colSpan="4" className="text-muted">
                      No hay registros de relaciones.
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

export default RelacionCRUD;
