import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { UserService } from "../../services/UserService";
import StripeForm from "../stripe/StripeForm";

export default function PayloadModal(props) {
  const [additionalInformations, setAdditionalInformations] = useState({
    ...props.additionalInformations,
  });
  const [loadedLoggedUser, setLoadedLoggedUser] = useState(false);
  const userId = props.userId;

  useEffect(() => {
    if (userId) {
      getLoggedInParent(userId);
    }
  }, []);

  const getLoggedInParent = async (userId) => {
    try {
      const parentResponse = await UserService.getParentById(userId);
      setAdditionalInformations({
        ...additionalInformations,
        email: parentResponse.data.email,
        name: parentResponse.data.username,
      });
      setLoadedLoggedUser(true);
    } catch (error) {
      alert("Greska! " + error);
    }
  };

  return (
    <>
      <Modal
        show={true}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={() => props.setShowPayloadModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Unesite podatke</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {(loadedLoggedUser || !userId) && (
            <StripeForm
              additionalInformations={additionalInformations}
              amount={props.amount}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => props.setShowPayloadModal(false)}
          >
            Zatvori
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
