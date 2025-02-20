import { useState } from "react";
import { FaHome, FaClipboardList, FaBed } from "react-icons/fa";

// eslint-disable-next-line react/prop-types
const PanelSidebar = ({ setActiveSection }) => {
  const [active, setActive] = useState("Reservas");

  const handleClick = (section) => {
    setActive(section);
    setActiveSection(section);
  };

  return (
    <div
      className="d-flex flex-column bg-primary text-white vh-100 p-3 position-fixed"
      style={{ width: "250px" }}
    >
      <h2 className="text-izq mb-4">Panel Administrador</h2>
      <ul className="nav flex-column">
        {[
          { name: "Dashboard", icon: <FaHome /> },
          { name: "Reservas", icon: <FaClipboardList /> },
          { name: "Cabañas", icon: <FaBed /> },
        ].map((item) => (
          <li key={item.name} className="nav-item">
            <button
              className={`btn btn-outline-light d-flex align-items-center w-100 text-start p-2 mb-2 ${
                active === item.name ? "active bg-success" : ""
              }`}
              onClick={() => handleClick(item.name)}
            >
              {item.icon} <span className="ms-2">{item.name}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PanelSidebar;
