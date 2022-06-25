import { Modal, Button } from "react-bootstrap";
import { Carousel } from "react-bootstrap";
import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PhotoService } from "../../services/PhotoService";

export default function ServiceProviderModal(props) {
  const service = props.service;

  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    if (props.show) 
      getAllPhotosByServiceProviderId(service.id);
    return () => { // function will be executed when the component unmounts
      setPhotos([]);
    };
  }, [props.show]);

  const getAllPhotosByServiceProviderId = async (serviceProviderId) => {
    try {
      const servicesPhotos = await PhotoService.getPhotos(serviceProviderId);
      setPhotos(servicesPhotos.data);
      console.log(typeof photos + " <- tip");
      console.log(photos);
    } catch (error) {
      alert("Greska! " + error);
    }
  };

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
            <Link className="link" to={`${service.id}`}>
              {service.name}
            </Link>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>
            {service.city}, {service.adress}
          </h4>

          <Carousel>
            {photos.map((photo, index) => {
              return (
                <Carousel.Item key={index}>
                  <img
                    className="d-block w-100"
                    src={`data:image;base64,${photo.data}`}
                    alt="First slide"
                  />
                </Carousel.Item>
              );
            })}
          </Carousel>
          <p>
            <b>
              Radno vreme: {service.startOfWork.slice(0, -3)}h -{" "}
              {service.endOfWork.slice(0, -3)}h
            </b>
          </p>
          <p>
            <b>Email: {service.email}</b>
          </p>
          <p>
            <b>Broj telefona: {service.telephoneNumber}</b>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Zatvori</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
