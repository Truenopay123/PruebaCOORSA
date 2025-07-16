// archivo: frontend/src/components/Dashboard.js
import React, { useState } from 'react';
import PersonaCRUD from './PersonasCRUD';
import VehiculoCRUD from './VehiculoCRUD';
import MantenimientoCRUD from './MantenimientoCRUD';
import RelacionCRUD from './RelacionCRUD';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Dashboard() {
  const [view, setView] = useState('personas');

  const renderComponent = () => {
    switch (view) {
      case 'vehiculos': return <VehiculoCRUD />;
      case 'mantenimientos': return <MantenimientoCRUD />;
      case 'relaciones': return <RelacionCRUD />;
      default: return <PersonaCRUD />;
    }
  };

  return (
    <div className="d-flex flex-column vh-100">
      {/* HEADER */}
      <header className="bg-dark text-white p-3 shadow">
        <div className="container d-flex align-items-center justify-content-between">
          <h1 className="h4 mb-0">📊 Panel de Gestión</h1>
          <small>Administra personas, vehículos, mantenimientos y relaciones.</small>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <div className="flex-grow-1 d-flex overflow-hidden">
        {/* SIDEBAR */}
        <nav className="bg-light border-end p-3" style={{ width: '220px', minWidth: '220px' }}>
          <div className="d-flex flex-column gap-2">
            <button
              onClick={() => setView('personas')}
              className={`btn btn-outline-primary text-start ${view === 'personas' ? 'active' : ''}`}
            >
              <i className="bi bi-person-fill me-2"></i> Personas
            </button>
            <button
              onClick={() => setView('vehiculos')}
              className={`btn btn-outline-success text-start ${view === 'vehiculos' ? 'active' : ''}`}
            >
              <i className="bi bi-truck-front-fill me-2"></i> Vehículos
            </button>
            <button
              onClick={() => setView('mantenimientos')}
              className={`btn btn-outline-warning text-start ${view === 'mantenimientos' ? 'active' : ''}`}
            >
              <i className="bi bi-tools me-2"></i> Mantenimientos
            </button>
            <button
              onClick={() => setView('relaciones')}
              className={`btn btn-outline-danger text-start ${view === 'relaciones' ? 'active' : ''}`}
            >
              <i className="bi bi-people-fill me-2"></i> Relaciones
            </button>
          </div>
        </nav>

        {/* MAIN VIEW */}
        <main className="flex-grow-1 overflow-auto p-4">
          {renderComponent()}
        </main>
      </div>

      {/* FOOTER */}
      <footer className="bg-dark text-white text-center p-2 mt-auto shadow">
        <small>© {new Date().getFullYear()} Bryan Axel Cortes Cortes .</small>
      </footer>
    </div>
  );
}

export default Dashboard;
