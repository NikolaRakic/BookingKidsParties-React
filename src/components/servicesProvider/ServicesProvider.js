import { ServiceProviderService } from "../../services/ServiceProviderService";
import React from "react";
import { useEffect, useState } from "react";
import ServiceProviderCard from "./ServiceProviderCard";

import Submenu from "./Submenu";

export default function ServicesProvider() {
  const [servicesProvider, setServicesProvider] = useState([]);

  const [currentType, setCurrentType] = useState("IGRAONICA");

  const type = type => setCurrentType(type);
  
  useEffect(() => {
    getAllServicesByType(currentType);
  }, [currentType]);

  const getAllServicesByType = async (typeOfService) => {
    try{
      const services = await ServiceProviderService.getAllByType(typeOfService);
    setServicesProvider(services.data);
    }
    catch(error){
      alert("Greska! " + error);
    }
  };

  return (
    <div>
      <Submenu func={type} curType={currentType} />
      <div className="card-div">
        {servicesProvider.map((service, index) => {
          return <ServiceProviderCard key={index} id={index} service={service} />;
        })}
      </div>
    </div>
  );
};
