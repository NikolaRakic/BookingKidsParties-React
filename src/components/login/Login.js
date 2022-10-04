import React, { useState } from "react";
import { Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthenticationService } from "../../services/AuthenticationService";
import LoginForm from "./LoginForm";

export default function Login() {
  const [credentials, setCredentials] = useState({
    usernameOrEmail: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState(false);
  let navigate = useNavigate();

  const handleFormInputChange = (name) => (event) => {
    const val = event.target.value;
    setCredentials({ ...credentials, [name]: val });
  };

  //da se okida na enter
  const onFormSubmit = (e) => {
    e.preventDefault();
    login();
  };

  const login = async () => {
    try {
      await AuthenticationService.login(credentials);
    } catch (e) {
      console.log(e)
      setErrorMessage(true);
      setCredentials({ usernameOrEmail: "", password: "" });
    }
  };

  return (
    <div>
      {AuthenticationService.getRole() === null ? (
        <div className="login-form">
          
          <h3 className="text-center">Prijava</h3>
          <form onSubmit={onFormSubmit}>
           <LoginForm handleFormInputChange={handleFormInputChange} credentials={credentials}/>
            {errorMessage ? (
              <Alert variant="danger" style={{ width: "100%", marginTop: "20px"}}>
                <Alert.Heading>Neispravni kredencijali!</Alert.Heading>
              </Alert>
            ) : null}
            <Button type="submit" className="login-btn" variant="outline-dark">
              Prijavi se
            </Button>
          </form>
        </div>
      ) : (
        navigate("/")
      )}
    </div>
  );
}
