import React, { useState, useEffect } from "react";
import { FormControl, Form } from "react-bootstrap";
import { AuthenticationService } from "../../../services/AuthenticationService";
import { ServiceProviderService } from "../../../services/ServiceProviderService";
import { DatePicker } from "react-rainbow-components";
import moment from "moment";

export default function AddServiceOfferForm(props) {
  const [serviceProviderType, setServiceProviderType] = useState("");
  const [serviceProviderId, setServiceProviderId] = useState("");

  useEffect(() => {
    setServiceProviderId(AuthenticationService.getUserId());
    getType(serviceProviderId);
  }, [serviceProviderId]);

  const getType = async (serviceProviderId) => {
    if (serviceProviderId !== "") {
        props.newServiceOffer.serviceProviderId = serviceProviderId;
      try {
        const serviceType =
          await ServiceProviderService.getTypeServiceProvider(
            serviceProviderId
          );
        setServiceProviderType(serviceType.data);
      } catch (error) {
        alert("Greska! " + error);
      }
    }
  };

  function onChange(name, date) {
    props.handleDateInputChange(name, moment(date).format("YYYY-MM-DD"));
  }

  return (
    <>
      <FormControl
        className="form-input-addOffer input-group "
        placeholder="Ime usluge"
        aria-describedby="basic-addon1"
        value={props.newServiceOffer.name}
        name="username"
        onChange={props.handleFormInputChange("name")}
      />
      <DatePicker
        className="date-picker"
        placeholder="Izaberite datum početka..."
        id="datePicker-1"
        minDate={new Date()}
        value={props.startDate}
        onChange={(value) => onChange("startDate", value)}
        formatStyle="large"
      />
      <DatePicker
        className="date-picker"
        placeholder="Izaberite datum završetka..."
        id="datePicker-1"
        minDate={new Date()}
        value={props.endDate}
        onChange={(value) => onChange("endDate", value)}
        formatStyle="large"
      />
      <FormControl
        className="form-input-addOffer input-group "
        placeholder="Maksimalan broj dece"
        aria-describedby="basic-addon1"
        value={props.newServiceOffer.maxNumberOfKids}
        name="maxNumberOfKids"
        onChange={props.handleFormInputChange("maxNumberOfKids")}
      />
      <FormControl
        className="form-input-addOffer input-group "
        placeholder="Maksimalan broj roditelja"
        aria-describedby="basic-addon1"
        value={props.newServiceOffer.maxNumberOfAdults}
        name="maxNumberOfAdults"
        onChange={props.handleFormInputChange("maxNumberOfAdults")}
      />
      <FormControl
        className="form-input-addOffer input-group "
        placeholder="Opis"
        aria-describedby="basic-addon1"
        value={props.newServiceOffer.description}
        name="description"
        onChange={props.handleFormInputChange("description")}
      />

      {serviceProviderType === "KETERING" ? (
        <>
          <FormControl
            className="form-input-addOffer input-group "
            placeholder="Cena po detetu"
            aria-describedby="basic-addon1"
            value={props.newServiceOffer.pricePerKid}
            name="pricePerKid"
            onChange={props.handleFormInputChange("pricePerKid")}
          />
          <FormControl
            className="form-input-addOffer input-group "
            placeholder="Cena po roditelju"
            aria-describedby="basic-addon1"
            value={props.newServiceOffer.pricePerAdult}
            name="pricePerAdult"
            onChange={props.handleFormInputChange("pricePerAdult")}
          />
        </>
      ) : (
        <>
            <FormControl
            className="form-input-addOffer input-group "
            placeholder="Cena po satu"
            aria-describedby="basic-addon1"
            value={props.newServiceOffer.pricePerHour}
            name="pricePerHour"
            onChange={props.handleFormInputChange("pricePerHour")}
          />
        </>
      )}
    </>
  );
}
