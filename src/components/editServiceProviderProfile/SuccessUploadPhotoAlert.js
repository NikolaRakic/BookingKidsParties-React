import { Button, Modal } from "react-bootstrap";

export default function SuccessUploadPhotoAlert(props) {

  const handleClose = () => props.setShowSuccessModal(false);

  return (
    <>
      <Modal show={props.showSuccessModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Uspešno dodata fotografija!</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Zatvori
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
