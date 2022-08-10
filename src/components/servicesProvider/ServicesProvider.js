import { ServiceProviderService } from "../../services/ServiceProviderService";
import React from "react";
import { useEffect, useState } from "react";
import ServiceProviderCard from "./ServiceProviderCard";
import Submenu from "./Submenu";
import { CooperationService } from "../../services/CooperationService";
import { AuthenticationService } from "../../services/AuthenticationService";
import { ROLE, TYPE_OF_SERVICE_PROVIDER } from "../../const/const";

export default function ServicesProvider() {
  const [servicesProvider, setServicesProvider] = useState([]);
  const [changeCooporations, setChangeCooporations] = useState(false);
  const [currentType, setCurrentType] = useState(
    TYPE_OF_SERVICE_PROVIDER.PLAYROOM
  );
  const [sortType, setSortType] = useState("averageRating");
  const [sortMethod, setSortMethod] = useState("descending");
  const [cooperations, setCooperations] = useState();
  const [loggedServiceProvider, setLoggedServiceProvider] = useState();

  const loggedUserId = AuthenticationService.getUserId();

  const type = (type) => setCurrentType(type);

  useEffect(() => {
    getAllServicesByType(currentType);
    if (AuthenticationService.getRole() === ROLE.ROLE_SERVICE_PROVIDER) {
      getAllCooperationsByLoggedServiceProvider(loggedUserId);
      getLoggedServiceProvider(AuthenticationService.getUserId());
    }

    setChangeCooporations(false);
  }, [currentType, sortMethod, changeCooporations]);

  const getAllServicesByType = (typeOfService) => {
    ServiceProviderService.getAllByType(typeOfService)
      .then((response) => {
        setServicesProvider(response.data);
        sortArray(sortType, response.data, sortMethod);
      })
      .catch((error) => console.log(error));
  };

  const getLoggedServiceProvider = (userId) => {
    ServiceProviderService.getOneById(userId)
      .then((response) => {
        setLoggedServiceProvider(response.data);
      })
      .catch((error) => console.log(error));
  };

  const getAllCooperationsByLoggedServiceProvider = async (loggedUserId) => {
    CooperationService.getAllByServiceProvider(loggedUserId)
      .then((response) => {
        setCooperations(response.data);
      })
      .catch((error) => console.log(error));
  };

  const sortArray = (type, offers, sortMethod) => {
    let sorted;
    if (sortMethod === "ascending")
      sorted = [...offers].sort((a, b) => a[type] - b[type]);
    else sorted = [...offers].sort((a, b) => b[type] - a[type]);
    setServicesProvider(sorted);
  };

  return (
    <div>
      <Submenu func={type} curType={currentType} />
      <div className="select-input-div">
        <p>Sortiraj po </p>
        <select
          className="select-input"
          onChange={(e) => setSortType(e.target.value)}
        >
          <option value="averageRating">Oceni</option>
        </select>
        <select
          className="select-input"
          onChange={(e) => setSortMethod(e.target.value)}
        >
          <option value="descending">Opadajuće</option>
          <option value="ascending">Rastuće</option>
        </select>
      </div>
      <div className="card-div">
        {servicesProvider.map((service, index) => {
          return (
            <ServiceProviderCard
              key={index}
              setChangeCooporations={setChangeCooporations}
              currentType={currentType}
              id={index}
              service={service}
              loggedServiceProvider={loggedServiceProvider}
              cooperations={cooperations}
            />
          );
        })}
      </div>
    </div>
  );
}
