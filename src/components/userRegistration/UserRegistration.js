import React, { useState } from "react";
import { Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthenticationService } from "../../services/AuthenticationService";
import { UserService } from "../../services/UserService";
import UserRegistrationForm from "./UserRegistrationForm";

export default function UserRegistration() {
  const [newUser, setNewUser] = useState({
    name: "",
    surname: "",
    username: "",
    password: "",
    email: "",
    telephoneNumber: "",
  });

  const [failRegistrationMessage, setFailRegistrationMessage] = useState(false);
  const [successRegistrationMessage, setSuccessRegistrationMessage] =
    useState(false);
  let navigate = useNavigate();
  const [failRegistrationMessageText, setFailRegistrationMessageText] = useState("");

  const handleFormInputChange = (name) => (event) => {
    const val = event.target.value;
    setNewUser({ ...newUser, [name]: val });
  };

  const registraionSubmit = () => {
    if (UserService.isValidDataForRegistration(newUser)) {
      UserService.registration(newUser)
        .then(() => {
          setFailRegistrationMessage(false);
          setSuccessRegistrationMessage(true);
          setTimeout(4000);
          navigate("/prijava");
        })
        .catch((error) => {
          setFailRegistrationMessage(true);
          setFailRegistrationMessageText(error.response.data);
        });
    } else setFailRegistrationMessage(true);
            setFailRegistrationMessageText("Popunite sva polja!")
  };

  return (
    <div>
      {AuthenticationService.getRole() === null ? (
        <div className="login-form">
          <h3 className="text-center">Registracija</h3>
          <UserRegistrationForm
            handleFormInputChange={handleFormInputChange}
            newUser={newUser}
          />
          {failRegistrationMessage ? (
            <Alert
              variant="danger"
              style={{ width: "100%", marginTop: "20px" }}
            >
              <Alert.Heading>{failRegistrationMessageText}</Alert.Heading>
            </Alert>
          ) : null}
          {successRegistrationMessage ? (
            <Alert
              variant="success"
              style={{ width: "100%", marginTop: "20px" }}
            >
              <Alert.Heading>Uspesna registracija!</Alert.Heading>
            </Alert>
          ) : null}
          <Button
            type="submit"
            className="login-btn"
            onClick={registraionSubmit}
            variant="outline-dark"
          >
            Registruj se
          </Button>
        </div>
      ) : (
        window.location.assign("/")
      )}
    </div>
  );
}
