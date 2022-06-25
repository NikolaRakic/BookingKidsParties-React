import { Card, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import ServiceProviderModal from "./ServiceProviderModal";
import { Link } from "react-router-dom";

export default function ServiceProviderCard(props) {

  const photoData = props.service.photo.data;
  let photo;
  const [modalShow, setModalShow] = useState(false);

  if (photoData !== null) {
    photo = `data:image;base64,${photoData}`;
  }
  else{
    photo = require("../../assets/photos/no_image.jpg");
  }



  return (
    <div className="one-card"  key={props.id}>
      <Card>
        <Card.Img className="card-photo" variant="top" src={photo} loading="lazy"/>
        <Card.Body>
          <Card.Title><Link className="link" to={`${props.service.id}`}>
              {props.service.username}
            </Link> </Card.Title>
          <Card.Text>
            {props.service.city} , {props.service.adress}
          </Card.Text>
          <Button variant="primary" onClick={() => setModalShow(true)}>
            Prikaži detalje
          </Button>
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
};

