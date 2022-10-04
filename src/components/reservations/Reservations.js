import { useEffect, useState } from "react";
import { AuthenticationService } from "../../services/AuthenticationService";
import Table from "react-bootstrap/Table";
import { ReservationService } from "../../services/ReservationService";
import ReservationsTableRow from "./ReservationsTableRow";
import PaginationComponent from "../global/Pagination";
import { ROLE } from "../../const/const";
import { useNavigate } from "react-router-dom";

export default function Reservations() {
  const [reservations, setReservations] = useState([]);
  const userRole = AuthenticationService.getRole();
  const userId = AuthenticationService.getUserId();
  const [isDisabled, setIsDisabled] = useState(false);
  const [totalPages, setTotalPages] = useState() 
  const [page, setPage] = useState(0);
  let navigate = useNavigate();
  useEffect(() => {
    setIsDisabled(false);
    if (!userRole) {
      alert("zabranjen pristup!");
      navigate("/not-found");
    }
    getReservations(userRole, userId);
  }, [isDisabled, page]);

  async function getReservations(userRole, userId) {
    try {
      if (userRole === ROLE.ROLE_USER) {
        const response = await ReservationService.getAllReservationsByUser(
          userId, page
        );
        setReservations(response.data);
        setTotalPages(response.headers.total)
      } else if (userRole === ROLE.ROLE_SERVICE_PROVIDER) {
        const response =
          await ReservationService.getAllReservationsByServiceProvider(userId, page);
        setReservations(response.data);
        setTotalPages(response.headers.total)
      } else if (userRole === ROLE.ROLE_ADMINISTRATOR) {
        const response = await ReservationService.getAllReservations(page);
        console.log(response)
        setReservations(response.data);
        setTotalPages(response.headers.total)
      }
    } catch (error) {
      console.error(`Greška prilikom dobavljanja dodatnih usluga ${error}`);
    }
  }

  return (
    <div className="center">
        <h1 className="title">Rezervacije</h1>
      <Table striped bordered hover className="table-center">
        <thead>
          <tr>
            {userRole !== ROLE.ROLE_USER && <th>Email korisnika</th>}
            <th>Početak</th>
            <th>Kraj</th>
            <th>Datum</th>
            <th>Usluga</th>
            <th>Mesto održavanja</th>
            <th>Vrsta usluga</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation, index) => {
            return (
              <ReservationsTableRow
                userRole={userRole}
                setIsDisabled={setIsDisabled}
                key={index}
                reservation={reservation}
                index={index}
                userRole={userRole}
              />
            );
          })}
        </tbody>
      </Table>
      <PaginationComponent 
        pageNumbers={totalPages}
        changePage={setPage}
        currentPage={page}
      />
    </div>
  );
}
