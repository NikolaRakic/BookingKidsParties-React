import { useEffect, useState } from "react";
import {
  Col,
  Container,
  Row,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import { ServiceProviderService } from "../../services/ServiceProviderService";
import EditProfilesPhotos from "./EditProfilesPhotos";
import FormEditServiceProvider from "./FormEditServiceProvideProfile";

export default function EditServiceProviderProfile() {
  const [serviceProvider, setServiceProvider] = useState({
    username: "",
    accountNumber: "",
    email: "",
    password: "",
    pib: "",
    startOfWork: "",
    endOfWork: "",
    maxNumberOfKids: "",
    typeOfServiceProvider: "",
    city: "",
    adress: "",
    telephoneNumber: "",
  });

  const params = useParams();
  useEffect(() => {
    getServiceProviderById(params.id);
  }, [params]);

  async function getServiceProviderById(id) {
    try {
      const response = await ServiceProviderService.getOneById(id);
      setServiceProvider(response.data);
    } catch (error) {
      console.error(
        `Greška prilikom dobavljanja pruzaoca usluga ${id}: ${error}`
      );
    }
  }

  const handleFormInputChange = (name) => (event) => {
    const val = event.target.value;
    setServiceProvider({ ...serviceProvider, [name]: val });
    console.log(serviceProvider);
  };

  const handleTimeInputChange = (name, time) => {
    setServiceProvider({ ...serviceProvider, [name]: time });
    console.log(serviceProvider);
  };

  async function editClick() {
    try {
      if (ServiceProviderService.isValidDataForRegistration(serviceProvider)) {
        const response = await ServiceProviderService.edit(
          serviceProvider,
          params.id
        );
        console.log(response);
      } else {
        console.log("Popunite sva polja");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <h1 className="title">Izmena podataka profila</h1>
      <Container>
        <Row>
          <Col xs={12} md={12} lg={6}>
            <FormEditServiceProvider
              editClick={editClick}
              handleTimeInputChange={handleTimeInputChange}
              handleFormInputChange={handleFormInputChange}
              serviceProvider={serviceProvider}
            />
          </Col>
          <Col xs={12} md={12} lg={6}>
            <EditProfilesPhotos serviceProviderId={params.id} />
          </Col>
        </Row>
      </Container>
    </>
  );
}
