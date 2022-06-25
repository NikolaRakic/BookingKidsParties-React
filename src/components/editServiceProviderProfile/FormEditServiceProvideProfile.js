import moment from "moment";
import { Button, FormControl } from "react-bootstrap";
import { TimePicker } from "react-rainbow-components";

export default function FormEditServiceProvider(props) {
  let serviceProvider = props.serviceProvider;
    
  const onChangeTime = (value, time) => {
    console.log(value + " " + time)
    let hours = moment(value, "HH:mm").format("HH");
    let minutes = moment(value, "HH:mm").format("mm");
    let diff = minutes % 30;
    if (diff !== 0) {
      value =
        String(hours) + ":" + String(moment(minutes - diff, "m").format("mm"));
    }
    props.handleTimeInputChange(time, value);
  };

  return (
    <>
      {serviceProvider !== null ? (
        <div className="edit-form">
          <FormControl
            className="form-input-registration edit-input "
            placeholder="Ime"
            aria-describedby="basic-addon1"
            value={serviceProvider.username}
            name="username"
            readOnly
          />
          <FormControl
            className="form-input-registration edit-input"
            placeholder="Broj računa"
            aria-describedby="basic-addon1"
            value={serviceProvider.accountNumber}
            name="accountNumber"
            onChange={props.handleFormInputChange("accountNumber")}
          />
          <FormControl
            className="form-input-registration edit-input"
            required
            placeholder="Email"
            aria-describedby="basic-addon1"
            value={serviceProvider.email}
            name="email"
            readOnly
          />
          <FormControl
            className="form-input-registration edit-input"
            placeholder="Pib"
            aria-describedby="basic-addon1"
            value={serviceProvider.pib}
            name="pib"
            readOnly
          />
          <div className="timepickers-edit-profile">
            <TimePicker
              hour24={true}
              value={serviceProvider.startOfWork}
              placeholder="Početak radnog vremena..."
              onChange={(value) => onChangeTime(value, "startOfWork")}
              className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto input-timepicker "
            />
            <TimePicker
              value={serviceProvider.endOfWork}
              hour24={true} // error
              placeholder="Kraj radnog vremena..."
              onChange={(value) => onChangeTime(value, "endOfWork")}
              className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto input-timepicker"
            />
          </div>

          <FormControl
            className="form-input-registration edit-input"
            placeholder="Maksimalni broj dece"
            aria-describedby="basic-addon1"
            value={serviceProvider.maxNumberOfKids}
            name="maxNumberOfKids"
            onChange={props.handleFormInputChange("maxNumberOfKids")}
          />
          <FormControl
            className="form-input-registration edit-input"
            placeholder="Grad"
            aria-describedby="basic-addon1"
            value={serviceProvider.city}
            name="city"
            onChange={props.handleFormInputChange("city")}
          />
          <FormControl
            className="form-input-registration edit-input"
            placeholder="Adresa"
            aria-describedby="basic-addon1"
            value={serviceProvider.adress}
            name="adress"
            onChange={props.handleFormInputChange("adress")}
          />
          <FormControl
            className="form-input-registration edit-input"
            placeholder="Broj telefona"
            aria-describedby="basic-addon1"
            value={serviceProvider.telephoneNumber}
            name="telephoneNumber"
            onChange={props.handleFormInputChange("telephoneNumber")}
          />
          <FormControl //onChange={props.handleFormInputChange("typeOfServiceProvider")}
            name="typeOfServiceProvider"
            className="form-input-registration edit-input"
            value={serviceProvider.typeOfServiceProvider}
            readOnly
          ></FormControl>
          <Button size="lg" onClick={props.editClick}>Izmeni</Button>
          <br/>
          <br/>
        </div>
      ) : null}
    </>
  );
}
