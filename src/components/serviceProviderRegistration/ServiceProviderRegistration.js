import React, { useState } from "react";
import { Button, Alert, Modal } from "react-bootstrap";
import ServiceProviderRegistrationForm from "./ServiceProviderRegistrationForm";
import { ServiceProviderService } from "../../services/ServiceProviderService";

export default function ServiceProviderRegistration() {
  const [newServiceProvider, setNewServiceProvider] = useState({
    username: "",
    accountNumber: "",
    email: "",
    //password: "",
    pib: "",
    startOfWork: "",
    endOfWork: "",
    maxNumberOfKids: "",
    typeOfServiceProvider: "",
    city: "",
    adress: "",
    telephoneNumber: "",
  });

  const [failRegistrationMessage, setFailRegistrationMessage] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleClose = () => {
    setShowSuccessModal(false);
    window.location.assign("/pocetna");
  };

  const handleFormInputChange = (name) => (event) => {
    const val = event.target.value;
    setNewServiceProvider({ ...newServiceProvider, [name]: val });
  };

  const handleTimeInputChange = (name, time) => {
    setNewServiceProvider({ ...newServiceProvider, [name]: time });
  };

  const registraionSubmit = async () => {
    if (ServiceProviderService.isValidDataForRegistration(newServiceProvider)) {
      await ServiceProviderService.registration(newServiceProvider);
      setFailRegistrationMessage(false);
      setShowSuccessModal(true);
    } else setFailRegistrationMessage(true);
  };

  return (
    <div className="login-form registration">
      <h3 className="text-center">Dodavanje pružaoca usluga</h3>
      <ServiceProviderRegistrationForm
        newServiceProvider={newServiceProvider}
        handleFormInputChange={handleFormInputChange}
        handleTimeInputChange={handleTimeInputChange}
      />
      {failRegistrationMessage ? (
        <Alert variant="danger" style={{ width: "100%", marginTop: "20px" }}>
          <Alert.Heading>Popunite sva polja</Alert.Heading>
        </Alert>
      ) : null}
      <Modal show={showSuccessModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Uspešna registracija!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Uspešno ste registrovali novog pružaoca usluga!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
           Zatvori
          </Button>
        </Modal.Footer>
      </Modal>
      <Button
        type="submit"
        className="login-btn"
        onClick={registraionSubmit}
        variant="outline-dark"
      >
        Registruj se
      </Button>
    </div>
  );
}
