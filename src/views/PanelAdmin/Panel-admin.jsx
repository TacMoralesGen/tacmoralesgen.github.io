import { useState } from "react";
import "./Panel-admin.css";
import PanelHeader from "../../components/Panel-admin/Panel-header/Panel-header.jsx";
import PanelReservation from "../../components/Panel-admin/Panel-reservation/Panel-reservation.jsx";
import PanelSidebar from "../../components/Panel-admin/Panel-sidebar/Panel-sidebar.jsx";
import PanelCabins from "../../components/Panel-admin/Panel-Cabins/Panel-Cabins.jsx";

const PanelAdmin = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [activeSection, setActiveSection] = useState("Reservas");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const cabinsData = [
    {
      id: 101,
      name: "Tiny Lodge 1",
      description: "Frente al lago",
      status: "disponible",
      capacity: 4,
    },
    {
      id: 102,
      name: "Tiny Lodge 2",
      description: "Incluye Tinaja",
      status: "reservada",
      capacity: 4,
    },
    {
      id: 103,
      name: "Tiny Lodge 3",
      description: "Vista al bosque",
      status: "ocupada",
      capacity: 4,
    },
    {
      id: 104,
      name: "Tiny Lodge 4",
      description: "Frente al lago",
      status: "disponible",
      capacity: 4,
    },
    {
      id: 105,
      name: "Tiny Lodge 5",
      description: "Incluye Tinaja",
      status: "disponible",
      capacity: 4,
    },
    {
      id: 106,
      name: "Tiny Lodge 6",
      description: "Vista al bosque",
      status: "reservada",
      capacity: 4,
    },
    {
      id: 107,
      name: "Tiny Lodge 7",
      description: "Frente al lago",
      status: "disponible",
      capacity: 4,
    },
    {
      id: 108,
      name: "Tiny Lodge 8",
      description: "Incluye Tinaja",
      status: "ocupada",
      capacity: 4,
    },
    {
      id: 109,
      name: "Tiny Lodge 9",
      description: "Vista al bosque",
      status: "disponible",
      capacity: 4,
    },
    {
      id: 110,
      name: "Tiny Lodge 10",
      description: "Frente al lago",
      status: "reservada",
      capacity: 4,
    },
    {
      id: 201,
      name: "Couple Room 1",
      description: "Frente al lago",
      status: "disponible",
      capacity: 2,
    },
    {
      id: 202,
      name: "Couple Room 2",
      description: "Incluye Tinaja",
      status: "reservada",
      capacity: 2,
    },
    {
      id: 203,
      name: "Couple Room 3",
      description: "Vista al bosque",
      status: "ocupada",
      capacity: 2,
    },
    {
      id: 204,
      name: "Couple Room 4",
      description: "Frente al lago",
      status: "disponible",
      capacity: 2,
    },
    {
      id: 205,
      name: "Couple Room 5",
      description: "Incluye Tinaja",
      status: "disponible",
      capacity: 2,
    },
    {
      id: 206,
      name: "Couple Room 6",
      description: "Vista al bosque",
      status: "reservada",
      capacity: 2,
    },
    {
      id: 207,
      name: "Couple Room 7",
      description: "Frente al lago",
      status: "disponible",
      capacity: 2,
    },
    {
      id: 208,
      name: "Couple Room 8",
      description: "Incluye Tinaja",
      status: "ocupada",
      capacity: 2,
    },
    {
      id: 209,
      name: "Couple Room 9",
      description: "Vista al bosque",
      status: "disponible",
      capacity: 2,
    },
    {
      id: 210,
      name: "Couple Room 10",
      description: "Frente al lago",
      status: "reservada",
      capacity: 2,
    },
  ];

  return (
    <div className="app-container">
      <PanelSidebar setActiveSection={setActiveSection} />
      <div className="main-content d-flex flex-column">
        <PanelHeader
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filter={filter}
          setFilter={setFilter}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />
        {activeSection === "Reservas" && (
          <PanelReservation
            searchTerm={searchTerm}
            filter={filter}
            startDate={startDate}
            endDate={endDate}
          />
        )}
        {activeSection === "Cabañas" && <PanelCabins cabins={cabinsData} />}
      </div>
    </div>
  );
};

export default PanelAdmin;
