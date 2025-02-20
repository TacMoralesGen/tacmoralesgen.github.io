/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaSort } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";

const formatDate = (dateString) => {
  const [year, month, day] = dateString.split("-");
  return `${day}-${month}-${year.slice(-2)}`;
};

const PanelReservation = ({ searchTerm, filter, startDate, endDate }) => {
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const reservationsPerPage = 10;
  const reservations = [
    {
      id: 101,
      guest: "Carlos Sánchez",
      cabin: "Tiny Cabin",
      checkIn: "2025-02-14",
      checkOut: "2025-02-16",
      status: "Pendiente",
    },
    {
      id: 102,
      guest: "Ana Rodríguez",
      cabin: "Tiny Cabin",
      checkIn: "2025-03-18",
      checkOut: "2025-03-19",
      status: "Confirmado",
    },
    {
      id: 103,
      guest: "Luis Pérez",
      cabin: "Tiny Cabin",
      checkIn: "2025-04-05",
      checkOut: "2025-04-08",
      status: "Confirmado",
    },
    {
      id: 104,
      guest: "Sofía Gómez",
      cabin: "Tiny Cabin",
      checkIn: "2025-05-10",
      checkOut: "2025-05-14",
      status: "Pendiente",
    },
    {
      id: 105,
      guest: "Marcos Díaz",
      cabin: "Tiny Cabin",
      checkIn: "2025-06-20",
      checkOut: "2025-06-25",
      status: "Pendiente",
    },
    {
      id: 106,
      guest: "Laura Martínez",
      cabin: "Tiny Cabin",
      checkIn: "2025-07-12",
      checkOut: "2025-07-14",
      status: "Cancelado",
    },
    {
      id: 107,
      guest: "Juan Fernández",
      cabin: "Tiny Cabin",
      checkIn: "2024-08-01",
      checkOut: "2024-08-02",
      status: "Finalizado",
    },
    {
      id: 108,
      guest: "María López",
      cabin: "Tiny Cabin",
      checkIn: "2025-09-15",
      checkOut: "2025-09-17",
      status: "Confirmado",
    },
    {
      id: 109,
      guest: "Pedro Ramírez",
      cabin: "Tiny Cabin",
      checkIn: "2025-10-10",
      checkOut: "2025-10-12",
      status: "Pendiente",
    },
    {
      id: 110,
      guest: "Lucía Torres",
      cabin: "Tiny Cabin",
      checkIn: "2025-11-20",
      checkOut: "2025-11-22",
      status: "Confirmado",
    },
    {
      id: 201,
      guest: "Carlos Sánchez",
      cabin: "Couple Room",
      checkIn: "2025-02-14",
      checkOut: "2025-02-16",
      status: "Pendiente",
    },
    {
      id: 202,
      guest: "Ana Rodríguez",
      cabin: "Couple Room",
      checkIn: "2025-03-18",
      checkOut: "2025-03-19",
      status: "Confirmado",
    },
    {
      id: 203,
      guest: "Luis Pérez",
      cabin: "Couple Room",
      checkIn: "2025-04-05",
      checkOut: "2025-04-08",
      status: "Confirmado",
    },
    {
      id: 204,
      guest: "Sofía Gómez",
      cabin: "Couple Room",
      checkIn: "2025-05-10",
      checkOut: "2025-05-14",
      status: "Pendiente",
    },
    {
      id: 205,
      guest: "Marcos Díaz",
      cabin: "Couple Room",
      checkIn: "2025-06-20",
      checkOut: "2025-06-25",
      status: "Pendiente",
    },
    {
      id: 206,
      guest: "Laura Martínez",
      cabin: "Couple Room",
      checkIn: "2025-07-12",
      checkOut: "2025-07-14",
      status: "Cancelado",
    },
    {
      id: 207,
      guest: "Juan Fernández",
      cabin: "Couple Room",
      checkIn: "2024-08-01",
      checkOut: "2024-08-02",
      status: "Finalizado",
    },
    {
      id: 208,
      guest: "María López",
      cabin: "Couple Room",
      checkIn: "2025-09-15",
      checkOut: "2025-09-17",
      status: "Confirmado",
    },
    {
      id: 209,
      guest: "Pedro Ramírez",
      cabin: "Couple Room",
      checkIn: "2025-10-10",
      checkOut: "2025-10-12",
      status: "Pendiente",
    },
    {
      id: 210,
      guest: "Lucía Torres",
      cabin: "Couple Room",
      checkIn: "2025-11-20",
      checkOut: "2025-11-22",
      status: "Confirmado",
    },
  ];

  const handleSort = (column) => {
    const newDirection =
      sortColumn === column && sortDirection === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortDirection(newDirection);
  };

  const filteredReservations = reservations
    .filter((res) =>
      filter === "all"
        ? true
        : res.status.toLowerCase() === filter.toLowerCase()
    )
    .filter((res) => res.guest.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((res) => {
      if (!startDate || !endDate) return true;
      const checkInDate = new Date(res.checkIn);
      return checkInDate >= startDate && checkInDate <= endDate;
    });

  const getSortedReservations = () => {
    if (!sortColumn) return filteredReservations;
    return [...filteredReservations].sort((a, b) => {
      let aValue = a[sortColumn];
      let bValue = b[sortColumn];

      if (sortColumn === "checkIn" || sortColumn === "checkOut") {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  };

  const sortedReservations = getSortedReservations();

  const indexOfLastReservation = currentPage * reservationsPerPage;
  const indexOfFirstReservation = indexOfLastReservation - reservationsPerPage;
  const currentReservations = sortedReservations.slice(
    indexOfFirstReservation,
    indexOfLastReservation
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(sortedReservations.length / reservationsPerPage);

  return (
    <section className="container-fluid mt-4">
      <div className="table-responsive">
        <table className="table table-hover table-striped w-100">
          <thead className="table-success">
            <tr>
              <th onClick={() => handleSort("guest")}>
                Huésped <FaSort />
              </th>
              <th onClick={() => handleSort("id")}>
                ID <FaSort />
              </th>
              <th onClick={() => handleSort("cabin")}>
                Cabaña <FaSort />
              </th>
              <th onClick={() => handleSort("checkIn")}>
                Check-In <FaSort />
              </th>
              <th onClick={() => handleSort("checkOut")}>
                Check-Out <FaSort />
              </th>
              <th onClick={() => handleSort("status")}>
                Status <FaSort />
              </th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {currentReservations.map((res, index) => (
              <tr key={index}>
                <td>{res.guest}</td>
                <td>{res.id}</td>
                <td>{res.cabin}</td>
                <td>{formatDate(res.checkIn)}</td>
                <td>{formatDate(res.checkOut)}</td>
                <td>
                  <span
                    className={`badge ${
                      res.status === "Pendiente"
                        ? "bg-warning"
                        : res.status === "Confirmado"
                        ? "bg-success"
                        : res.status === "Finalizado"
                        ? "bg-secondary"
                        : "bg-danger"
                    }`}
                  >
                    {res.status}
                  </span>
                </td>
                <td>
                  <button className="btn btn-sm btn-primary">Ver Más</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <nav>
        <ul className="pagination justify-content-center mt-4">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => paginate(currentPage - 1)}
            >
              Anterior
            </button>
          </li>
          {Array.from({ length: totalPages }, (_, i) => (
            <li
              key={i + 1}
              className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
            >
              <button className="page-link" onClick={() => paginate(i + 1)}>
                {i + 1}
              </button>
            </li>
          ))}
          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => paginate(currentPage + 1)}
            >
              Siguiente
            </button>
          </li>
        </ul>
      </nav>
    </section>
  );
};

export default PanelReservation;
