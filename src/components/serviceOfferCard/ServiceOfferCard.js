import { Card, Button } from "react-bootstrap";
import { useState } from "react";
import ServiceOfferModal from "./ServiceOfferModal";
import ServiceOfferCardText from "./ServiceOfferCardText";
import { useNavigate } from "react-router-dom";

export default function ServiceOfferCard(props) {
  let navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);
  const [isChosen, setIsChosen] = useState();

  let photo = require("../../assets/photos/no_image.jpg");
  if (props.offer.serviceProviderPhotos.length !== 0) {
    photo = `data:image;base64,${props.offer.serviceProviderPhotos[0].data}`;
  }

  const priceDetails = {
    numberOfKids: props.numberOfKids,
    numberOfAdults: props.numberOfAdults,
    pricePerKid: props.offer.pricePerKid,
    pricePerAdult: props.offer.pricePerAdult,
    pricePerHour: props.offer.pricePerHour,
    durationOfHours: props.durationOfHours,
  };

  const handleClickReservationBtn = (offerId) => {
    localStorage.setItem(props.localStorageNameItem, offerId);
    setIsChosen(true);
    navigate(props.nextUrl);
  };

  const handleClickCancelReservationBtn = () => {
    localStorage.removeItem(props.localStorageNameItem);
    setIsChosen(false);
  };

  const isChosenOffer = (offerId) => {
    if (offerId === localStorage.getItem(props.localStorageNameItem)) {
      return true;
    }
  };

  return (
    <div
      className={`one-card ${isChosenOffer(props.offer.id) ? "chosen" : ""}`}
    >
      <Card loading="lazy" className={!props.visible ? "fadeIn" : "fadeOut"}>
        <Card.Img
          className="card-photo"
          variant="top"
          src={photo}
          loading="lazy"
        />
        <Card.Body>
          <Card.Title>{props.offer.name}</Card.Title>
          <Card.Text>
            <ServiceOfferCardText
              offer={props.offer}
              additionalServiceOfferType={props.additionalServiceOfferType}
              priceDetails={priceDetails}
            />
          </Card.Text>
          <Button variant="outline-dark" onClick={() => setModalShow(true)}>
            Detalji
          </Button>
          &nbsp; &nbsp;
          {props.showButton && (
            <>
              {isChosenOffer(props.offer.id) ? (
                <Button
                  variant="danger"
                  onClick={() => handleClickCancelReservationBtn()}
                >
                  Otkaži
                </Button>
              ) : (
                <Button
                  variant="primary"
                  onClick={() => handleClickReservationBtn(props.offer.id)}
                >
                  Izaberi
                </Button>
              )}
            </>
          )}
        </Card.Body>
      </Card>

      <ServiceOfferModal
        pricedetails={priceDetails}
        offer={props.offer}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
}
