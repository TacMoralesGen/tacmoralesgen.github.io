/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  FaHome,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaEdit,
  FaPlus,
} from "react-icons/fa";
import { Modal, Button, Form } from "react-bootstrap";

const PanelCabins = ({ cabins: initialCabins }) => {
  const [cabins, setCabins] = useState(initialCabins);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentCabin, setCurrentCabin] = useState(null);

  const getStatusInfo = (status) => {
    switch (status) {
      case "disponible":
        return { color: "bg-success", icon: <FaCheckCircle /> };
      case "reservada":
        return { color: "bg-secondary", icon: <FaClock /> };
      case "ocupada":
        return { color: "bg-danger", icon: <FaTimesCircle /> };
      default:
        return { color: "bg-secondary", icon: <FaHome /> };
    }
  };

  const handleEditClick = (cabin) => {
    setCurrentCabin(cabin);
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    const updatedCabins = cabins.map((cabin) =>
      cabin.id === currentCabin.id ? currentCabin : cabin
    );
    setCabins(updatedCabins);
    setShowEditModal(false);
  };

  const handleAddCabin = () => {
    const newCabin = {
      id: cabins.length + 1,
      name: "Nueva Cabaña",
      description: "Descripción de la nueva cabaña",
      status: "disponible",
      capacity: 2,
    };
    setCabins([...cabins, newCabin]);
    setShowAddModal(false);
  };

  return (
    <section className="container mt-4">
      <h2 className="text-center mb-4">Estado de las Cabañas</h2>
      <div className="row g-3">
        {cabins.map((cabin, index) => {
          const { color, icon } = getStatusInfo(cabin.status);
          return (
            <div key={index} className="col-md-3 col-sm-6">
              <div
                className={`card text-white ${color} p-2 shadow d-flex flex-row align-items-center`}
              >
                <div className="me-2">
                  <FaHome
                    className="text-white"
                    style={{ fontSize: "2.5rem" }}
                  />
                </div>
                <div>
                  <h5 className="card-title mb-1" style={{ fontSize: "1rem" }}>
                    {cabin.name}
                  </h5>
                  <p className="card-text mb-1" style={{ fontSize: "0.9rem" }}>
                    {cabin.description}
                  </p>
                  <p className="fw-bold mb-1" style={{ fontSize: "0.9rem" }}>
                    Capacidad: {cabin.capacity} personas
                  </p>
                  <span
                    className="badge bg-light text-dark"
                    style={{ fontSize: "0.8rem" }}
                  >
                    {icon}
                  </span>
                </div>
                <button
                  className="btn btn-sm btn-light ms-auto"
                  onClick={() => handleEditClick(cabin)}
                >
                  <FaEdit />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center mt-4">
        <button
          className="btn btn-primary"
          onClick={() => setShowAddModal(true)}
        >
          <FaPlus /> Agregar Cabaña
        </button>
      </div>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Cabaña</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentCabin && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  value={currentCabin.name}
                  onChange={(e) =>
                    setCurrentCabin({ ...currentCabin, name: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  type="text"
                  value={currentCabin.description}
                  onChange={(e) =>
                    setCurrentCabin({
                      ...currentCabin,
                      description: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Capacidad</Form.Label>
                <Form.Control
                  type="number"
                  value={currentCabin.capacity}
                  onChange={(e) =>
                    setCurrentCabin({
                      ...currentCabin,
                      capacity: parseInt(e.target.value),
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Estado</Form.Label>
                <Form.Select
                  value={currentCabin.status}
                  onChange={(e) =>
                    setCurrentCabin({ ...currentCabin, status: e.target.value })
                  }
                >
                  <option value="disponible">Disponible</option>
                  <option value="reservada">Reservada</option>
                  <option value="ocupada">Ocupada</option>
                </Form.Select>
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSaveEdit}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Cabaña</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" placeholder="Nombre de la cabaña" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                type="text"
                placeholder="Descripción de la cabaña"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Capacidad</Form.Label>
              <Form.Control type="number" placeholder="Capacidad" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Estado</Form.Label>
              <Form.Select>
                <option value="disponible">Disponible</option>
                <option value="reservada">Reservada</option>
                <option value="ocupada">Ocupada</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleAddCabin}>
            Agregar
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
};

export default PanelCabins;
