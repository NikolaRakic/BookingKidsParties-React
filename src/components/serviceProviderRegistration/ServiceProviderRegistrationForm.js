import { FormControl, Form } from "react-bootstrap";
import { TimePicker } from "react-rainbow-components";
import moment from "moment";

export default function ServiceProviderRegistrationForm(props) {

    const onChangeStartTime = (startTime) => {
        let hours = moment(startTime, "HH:mm").format("HH");
        let minutes = moment(startTime, "HH:mm").format("mm");
        let diff = minutes % 30;
        if (diff !== 0) {
          startTime =
            String(hours) + ":" + String(moment(minutes - diff, "m").format("mm"));
        }
        props.handleTimeInputChange("startOfWork", startTime)
      };
    
      const onChangeEndTime = (endTime) => {
        let hours = moment(endTime, "HH:mm").format("HH");
        let minutes = moment(endTime, "HH:mm").format("mm");
        let diff = minutes % 30;
        if (diff !== 0) {
          endTime =
            String(hours) + ":" + String(moment(minutes - diff, "m").format("mm"));
        }
        props.handleTimeInputChange("endOfWork", endTime)
      };

  return (
    <>
      <FormControl
        className="form-input-registration input-group "
        placeholder="Ime"
        aria-describedby="basic-addon1"
        value={props.newServiceProvider.username}
        name="username"
        onChange={props.handleFormInputChange("username")}
      />
      <FormControl
        className="form-input-registration input-group"
        placeholder="Broj računa"
        aria-describedby="basic-addon1"
        value={props.newServiceProvider.accountNumber}
        name="accountNumber"
        onChange={props.handleFormInputChange("accountNumber")}
      />
      <FormControl
        className="form-input-registration input-group"
        required
        placeholder="Email"
        aria-describedby="basic-addon1"
        value={props.newServiceProvider.email}
        name="email"
        onChange={props.handleFormInputChange("email")}
      />
      <FormControl
        className="form-input-registration input-group"
        placeholder="Pib"
        aria-describedby="basic-addon1"
        value={props.newServiceProvider.pib}
        name="pib"
        onChange={props.handleFormInputChange("pib")}
      />
      <div className="timepickers">
        <TimePicker
          hour24={true}
          value={props.newServiceProvider.startOfWork}
          placeholder="Početak radnog vremena..."
          onChange={(value) => onChangeStartTime(value)}
          className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto input-timepicker "
        />
        <TimePicker
          value={props.newServiceProvider.endOfWork}
          hour24={true}
          // error
          placeholder="Kraj radnog vremena..."
          onChange={(value) => onChangeEndTime(value)}
          className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto input-timepicker"
        />
      </div>

      <FormControl
        className="form-input-registration input-group"
        placeholder="Maksimalni broj dece"
        aria-describedby="basic-addon1"
        value={props.newServiceProvider.maxNumberOfKids}
        name="maxNumberOfKids"
        onChange={props.handleFormInputChange("maxNumberOfKids")}
      />
      <FormControl
        className="form-input-registration input-group"
        placeholder="Grad"
        aria-describedby="basic-addon1"
        value={props.newServiceProvider.city}
        name="city"
        onChange={props.handleFormInputChange("city")}
      />
      <FormControl
        className="form-input-registration input-group"
        placeholder="Adresa"
        aria-describedby="basic-addon1"
        value={props.newServiceProvider.adress}
        name="adress"
        onChange={props.handleFormInputChange("adress")}
      />
      <FormControl
        className="form-input-registration input-group"
        placeholder="Broj telefona"
        aria-describedby="basic-addon1"
        value={props.newServiceProvider.telephoneNumber}
        name="telephoneNumber"
        onChange={props.handleFormInputChange("telephoneNumber")}
      />
      <Form.Select
        onChange={props.handleFormInputChange("typeOfServiceProvider")}
        name="typeOfServiceProvider"
        className="form-input-registration input-group"
      >
        <option>Izaberite vrstu usluge</option>
        <option value="IGRAONICA">Igraonica</option>
        <option value="ANIMATOR">Animator</option>
        <option value="KETERING">Ketering</option>
      </Form.Select>
    </>
  );
}
