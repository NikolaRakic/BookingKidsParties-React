import { Modal, Button } from "react-bootstrap";
import { Carousel } from "react-bootstrap";
import { React } from "react";
import { Link } from "react-router-dom";

export default function ServiceOfferModal(props) {
  const offer = props.offer;
  let photos=[];
  
  if (offer.serviceProviderPhotos !== null) {
    for (let i = 0; i < offer.serviceProviderPhotos.length; i++) {
      photos.push(`data:image;base64,${offer.serviceProviderPhotos[i].data}`);
    }
  } else {
    photos.push(require("../../assets/photos/no_image.jpg"));
  }

  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Igraonica:
            <Link
              to={`/pruzaoci-usluga/${offer.serviceProviderId}`}
              className="link"
            >
              {offer.serviceProviderUsername}
            </Link>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel>
            {photos.map((p, index) => {
              return (
                <Carousel.Item key={index}>
                  <img className="d-block w-100" src={p} alt="First slide" />
                </Carousel.Item>
              );
            })}
          </Carousel>
          <p>
            Lokacija: {offer.serviceProviderAdress}, {offer.serviceProviderCity}
          </p>
          <br />
          <p>{offer.description}</p>
          <br />
          <p>Cena po satu: {offer.pricePerHour}din</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Zatvori</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
