import React, { useState } from "react";
import { Button, Alert, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ServiceOfferService } from "../../services/ServiceOfferService";
import AddServiceOfferForm from "./AddServiceOfferForm";

export default function AddServiceOffer() {
  const [newServiceOffer, setNewServiceOffer] = useState({
    startDate: "",
    endDate: "",
    maxNumberOfKids: "",
    maxNumberOfAdults: "",
    pricePerKid: "",
    pricePerAdult: "",
    pricePerHour: "",
    description: "",
    name: "",
    serviceProviderId: "",
  });

  const [failRegistrationMessage, setFailRegistrationMessage] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  let navigate = useNavigate();

  const handleClose = () => {
    setShowSuccessModal(false);
    navigate("/pocetna");
  };

  const handleFormInputChange = (name) => (event) => {
    const val = event.target.value;
    setNewServiceOffer({ ...newServiceOffer, [name]: val });
  };

  const handleDateInputChange = (name, date) => {
    setNewServiceOffer({ ...newServiceOffer, [name]: date });
  };

  const addSubmit = async () => {
    if (ServiceOfferService.isValidDataForAdd(newServiceOffer)) {
      await ServiceOfferService.addServiceOffer(newServiceOffer);
      setFailRegistrationMessage(false);
      setShowSuccessModal(true);
    } else setFailRegistrationMessage(true);
  };

  return (
    <div className="login-form">
      <h3 className="text-center">Dodaj ponudu</h3>
      <AddServiceOfferForm
        newServiceOffer={newServiceOffer}
        handleFormInputChange={handleFormInputChange}
        handleDateInputChange={handleDateInputChange}
        startDate={newServiceOffer.startDate}
        endDate={newServiceOffer.endDate}
      />

      {failRegistrationMessage ? (
        <Alert variant="danger" style={{ width: "100%", marginTop: "20px" }}>
          <Alert.Heading>Neispravno uneti podaci!</Alert.Heading>
        </Alert>
      ) : null}

      <Modal show={showSuccessModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Uspešno dodata ponuda!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Uspešno ste dodali novu ponudu!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Zatvori
          </Button>
        </Modal.Footer>
      </Modal>

      <Button
        type="submit"
        className="login-btn"
        onClick={addSubmit}
        variant="outline-dark"
      >
        Dodaj ponudu
      </Button>
    </div>
  );
}
