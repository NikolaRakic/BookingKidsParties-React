import { InputGroup, FormControl } from "react-bootstrap";

export default function Inputs(props) {
  return (
    <>
      <InputGroup className="mb-3 input-group">
        <FormControl
          className="form-input input-group"
          placeholder="Unesite ime grada..."
          aria-describedby="basic-addon1"
          value={props.formData.city}
          onChange={props.handleFormInputChange("city")}
        />
      </InputGroup>
      <div className="input-group-div">
        <FormControl
          className="form-input"
          placeholder="Unesite broj dece..."
          aria-describedby="basic-addon1"
          value={props.formData.numberOfKids}
          onChange={props.handleFormInputChange("numberOfKids")}
        />
        <FormControl
          className="form-input"
          placeholder="Unesite broj roditelja..."
          aria-label="Username"
          aria-describedby="basic-addon1"
          value={props.formData.numberOfAdults}
          onChange={props.handleFormInputChange("numberOfAdults")}
        />
      </div>
    </>
  );
}
