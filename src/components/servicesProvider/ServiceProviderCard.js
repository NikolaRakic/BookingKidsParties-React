import { Card, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import ServiceProviderModal from "./ServiceProviderModal";
import { Link } from "react-router-dom";
import { AuthenticationService } from "../../services/AuthenticationService";
import { Rating } from "react-simple-star-rating";
import { CooperationService } from "../../services/CooperationService";

export default function ServiceProviderCard(props) {
  const loggedUserRole = AuthenticationService.getRole();
  const cooperations = props.cooperations;
  const loggedServiceProvider = props.loggedServiceProvider;
  const photoData = props.service.photo.data;
  let photo;
  const [modalShow, setModalShow] = useState(false);

  let cooperationsRequests = [];
  let currentCooperation = [];

  console.log(cooperations);
  if (photoData !== null) {
    photo = `data:image;base64,${photoData}`;
  } else {
    photo = require("../../assets/photos/no_image.jpg");
  }

  checkCooperationRequest();
  currentServicesProviderCooperation();

  function checkCooperationRequest() {
    cooperationsRequests = cooperations?.filter(
      (cooperation) =>
        cooperation.cooperationServiceId === loggedServiceProvider?.id ||
        cooperation.playroomId === loggedServiceProvider?.id
    );
  }

  function currentServicesProviderCooperation() {
    currentCooperation = cooperationsRequests?.find(
      (cooperation) =>
        cooperation.cooperationServiceId === props.service.id ||
        cooperation.playroomId === props.service.id
    );
  }

  function getCooperationRequestDTO(){
    let dataForRequest = {
      playroomId: "",
      cooperationServiceId: ""
    }
    if(props.service.typeOfServiceProvider === "IGRAONICA" && loggedServiceProvider.typeOfServiceProvider !== "IGRAONICA"){
      dataForRequest.cooperationServiceId = loggedServiceProvider.id;
      dataForRequest.playroomId = props.service.id;
    }
    else if(props.service.typeOfServiceProvider !== "IGRAONICA" && loggedServiceProvider.typeOfServiceProvider === "IGRAONICA"){
      dataForRequest.cooperationServiceId = props.service.id;
      dataForRequest.playroomId = loggedServiceProvider.id;
    }
    else{
      alert("greska!")
    }
    return dataForRequest;
  }

  const sendRequestClick = async (id) => {
    try {
      await CooperationService.sendCooperationRequest(getCooperationRequestDTO());
      props.setChangeCooporations(true);
    } catch (error) {
      alert("Greska! " + error);
    }
  };

  const cancelCooporationClick = async () => {
    try{
      const data = getCooperationRequestDTO();
      await CooperationService.cancelCooperation(data);
      props.setChangeCooporations(true);
    } catch (error){
      alert("Greska! " +error)
    }
  }

  return (
    <div className="one-card" key={props.id}>
      <Card>
        <Card.Img
          className="card-photo"
          variant="top"
          src={photo}
          loading="lazy"
        />
        <Card.Body>
          <Card.Title>
            <Link className="link" to={`${props.service.id}`}>
              {props.service.username}
            </Link>{" "}
          </Card.Title>
          <Card.Text>
            <Rating
              readonly
              size={40}
              ratingValue={props.service.averageRating * 20}
              label
              //transition
              fillColor="orange"
              emptyColor="gray"
            />
            {props.service.city} , {props.service.adress}
          </Card.Text>
          <Button variant="outline-info" onClick={() => setModalShow(true)}>
            Prikaži detalje
          </Button>
          &nbsp;
          {loggedUserRole === "ROLE_ADMINISTRATOR" ? (
            <Button variant="outline-danger">
              Obriši
            </Button>
          ) : (
            ""
          )}
          {loggedUserRole === "ROLE_SERVICE_PROVIDER" &&
          loggedServiceProvider?.typeOfServiceProvider !== props.currentType &&
          ((loggedServiceProvider?.typeOfServiceProvider !== "IGRAONICA" &&
            props.currentType === "IGRAONICA") ||
            loggedServiceProvider?.typeOfServiceProvider === "IGRAONICA") ? (
            <>
              {cooperationsRequests ? (
                <>
                  {currentCooperation ? (
                    <>
                      {currentCooperation.confirmed === true ? (
                        <Button variant="outline-danger" onClick={() => cancelCooporationClick()}>Otkaži saradnju</Button>
                      ) : (
                        <>
                          {currentCooperation.requestSender ===
                          loggedServiceProvider?.id ? (
                            <Button disabled>Zahtev poslat</Button>
                          ) : (
                            <Button onClick={(id) => sendRequestClick(props.service.id)} >Prihvati</Button>
                          )}
                        </>
                      )}
                    </>
                  ) : (
                    <Button variant="outline-primary" onClick={(id) => sendRequestClick(props.service.id)}>Pošalji zahtev</Button>
                  )}
                </>
              ) : (
                <></>
              )}
            </>
          ) : (
            ""
          )}
        </Card.Body>
      </Card>
      <ServiceProviderModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        service={props.service}
        id={props.id}
      />
    </div>
  );
}
