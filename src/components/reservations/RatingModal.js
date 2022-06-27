import { useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";
import ratingService from "../../services/RatingService";

export default function RatingModal(props) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
const reservationId = props.reservationid;
  const handleRating = (rate) => {
    setRating(rate);
  };
  function saveRatingBtn(){
      const requestData = {comment: comment, rate: rating/20, reservationId: reservationId}
      ratingService.saveRating(requestData);
      props.setRatingModalShow(false);
      //window.location.reload();
      props.setIsDisabled(true);
  }

  return (
    <>
      <Modal
        onHide={() => props.setRatingModalShow(false)}
        show={props.show}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Ocenjivanje
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table>
            <tbody>
              <tr>
                <td>
                  <Rating
                    onClick={handleRating}
                    size={50}
                    ratingValue={rating}
                    label
                    //transition
                    fillColor="orange"
                    emptyColor="gray"
                  />
                </td>
              </tr>
              <tr>
                  <td>
                  <textarea rows="4" cols="50" placeholder="Komentar..."  value={comment} onChange={(value)=> setComment(value.target.value)}></textarea>
                  </td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
        <Button onClick={saveRatingBtn} className={rating !== 0 ? "" : "disabled"}>Sačuvaj</Button>
          <Button variant="danger" onClick={() => props.setRatingModalShow(false)}>Zatvori</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
