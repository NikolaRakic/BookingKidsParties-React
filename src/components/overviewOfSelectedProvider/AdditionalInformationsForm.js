import { FormControl } from "react-bootstrap";
import { AuthenticationService } from "../../services/AuthenticationService";

export default function AdditionalInformationsForm(props) {

  // useEffect(()=>{
  //   localStorage.setItem("email", "")
  //   localStorage.setItem("name", "")
  // },[])

  const handleFormInputChange = (name) => (event) => {
    const val = event.target.value;
    props.setAdditionalInformations({...props.additionalInformations, [name]: val});
  };
  return (
    <div className="center">
      <FormControl
        className="form-input input-group  "
        type="number"
        placeholder="Broj godina deteta (Opciono)"
        aria-describedby="basic-addon1"
        //value=""
        name="username"
        onChange={handleFormInputChange("ageOfKids")}
      />
      <FormControl
        className="form-input input-group textarea "
        placeholder="Dodatni zahtevi... (Opciono)"
        as="textarea"
        onChange={handleFormInputChange("additionalRequest")}
      />
      {!AuthenticationService.getUserId() && (
          <>
        <FormControl
          className="form-input2 input-group  "
          type="text"
          placeholder="Ime i prezime*"
          aria-describedby="basic-addon1"
          name="name"
          onChange={handleFormInputChange("name")}
        />
        <FormControl
          className="form-input2 input-group  "
          type="email"
          placeholder="Email adresa*"
          aria-describedby="basic-addon1"
          name="email"
          onChange={handleFormInputChange("email")}
        />
        </>
      )}
    </div>
  );
}
