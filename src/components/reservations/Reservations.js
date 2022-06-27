import { useEffect, useState } from "react";
import { AuthenticationService } from "../../services/AuthenticationService";
import Table from "react-bootstrap/Table";
import { ReservationService } from "../../services/ReservationService";
import ReservationsTableRow from "./ReservationsTableRow";

export default function Reservations() {
  const [reservations, setReservations] = useState([]);
  const userRole = AuthenticationService.getRole();
  const userId = AuthenticationService.getUserId();
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    setIsDisabled(false);
    if (!userRole) {
      alert("zabranjen pristup!");
      window.location.assign("/not-found");
    }
    getReservations(userRole, userId);
  }, [isDisabled]);

  async function getReservations(userRole, userId) {
    try {
      if (userRole === "ROLE_USER") {
        const response = await ReservationService.getAllReservationsByUser(
          userId
        );
        console.log(response);
        setReservations(response.data);
      } else if (userRole === "ROLE_SERVICE_PROVIDER") {
        const response =
          await ReservationService.getAllReservationsByServiceProvider(userId);
        setReservations(response.data);
      } else if (userRole === "ROLE_ADMINISTRATOR") {
        const response = await ReservationService.getAllReservations();
        setReservations(response.data);
      }
    } catch (error) {
      console.error(`Greška prilikom dobavljanja dodatnih usluga ${error}`);
    }
  }

  return (
    <div className="center">
      <Table striped bordered hover className="table-center">
        <thead>
          <tr>
            {userRole !== "ROLE_USER" && <th>Email korisnika</th>}
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
    </div>
  );
}