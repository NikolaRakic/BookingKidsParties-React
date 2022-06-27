import { Button, Modal, Table } from "react-bootstrap";

export default function ReservationModal(props) {
  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Detalji rezervacije
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table>
            <tbody>
              <tr>
                <th>Datum</th>
                <td>{props.reservation.dateOfReservation}</td>
              </tr>
              <tr>
                <th>Početak proslave</th>
                <td>{props.reservation.startTime}</td>
              </tr>
              <tr>
                <th>Kraj proslave</th>
                <td>{props.reservation.endTime}</td>
              </tr>
              <tr>
                <th>Broj dece</th>
                <td>{props.reservation.numberOfKids}</td>
              </tr>
              <tr>
                <th>Broj odraslih</th>
                <td>{props.reservation.numberOfAdults}</td>
              </tr>
              <tr>
                <th>Email korisnika</th>
                <td>{props.reservation.userEmail}</td>
              </tr>
              <tr>
                <th>Pružaoc usluga</th>
                <td>
                  <a
                    className="link"
                    href={`/pruzaoci-usluga/${props.reservation.serviceProviderId}`}
                  >
                    {props.reservation.serviceProviderName}
                  </a>
                </td>
              </tr>
              <tr>
                <th>Naziv usluge</th>
                <td>{props.reservation.serviceOfferName}</td>
              </tr>
              <tr>
                <th>Mesto održavanja</th>
                <td>
                  <a
                    className="link"
                    href={`/pruzaoci-usluga/${props.reservation.playroomId}`}
                  >
                    {props.reservation.playroomName}
                  </a>
                  , {props.reservation.playroomAdress}
                </td>
              </tr>
              <tr>
                <th>Godine slavljenika</th>
                <td>{props.reservation.ageOfKid}</td>
              </tr>
              <tr>
                <th>Dodatni zahtevi</th>
                <td>{props.reservation.additionalRequirements}</td>
              </tr>
              <tr>
                <th>Ukupna cena</th>
                <td>{props.reservation.totalPrice}</td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={props.onHide}>Zatvori</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
