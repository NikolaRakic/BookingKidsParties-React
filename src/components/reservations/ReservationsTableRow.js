import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import RatingModal from "./RatingModal";
import ReservationModal from "./ReservationModal";

export default function ReservationsTableRow(props) {
  const reservation = props.reservation;
  const [modalShow, setModalShow] = useState(false);
  const [ratingModalShow, setRatingModalShow] = useState(false);

  return (
    <>
      <tr key={props.index} className={new Date(reservation.dateOfReservation) <= new Date()? "before-reservation" : "after-reservation"}>
        {props.userRole !== "ROLE_USER" && <td>{reservation.userEmail}</td>}

        <td>{reservation.startTime}</td>
        <td>{reservation.endTime}</td>
        <td>{reservation.dateOfReservation}</td>
        <td>
          {reservation.serviceOfferName} ({reservation.serviceProviderName})
        </td>
        <td>
          {reservation.playroomName}, {reservation.playroomAdress}
        </td>
        <td>{reservation.typeOfServiceProvider.toLowerCase()}</td>
        <td>
          <Button variant="outline-primary" onClick={() => setModalShow(true)}>
            Detalji
          </Button>
        </td>
        {props.userRole === "ROLE_USER" && (
          <>
            {!reservation.hasRating ? (
              <td>
                <Button
                  variant="outline-primary"
                  onClick={() => setRatingModalShow(true)}
                >
                  Oceni
                </Button>
              </td>
            ) : (
              <td>
                <Button variant="outline-secondary" disabled>
                  Ocenjeno
                </Button>
              </td>
            )}
          </>
        )}
      </tr>
      {modalShow && (
        <ReservationModal
          reservation={reservation}
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      )}
      {ratingModalShow && props.userRole === "ROLE_USER" && (
        <RatingModal
          setIsDisabled={props.setIsDisabled}
          reservationid={reservation.id}
          show={true}
          setRatingModalShow={setRatingModalShow}
        />
      )}
    </>
  );
}
