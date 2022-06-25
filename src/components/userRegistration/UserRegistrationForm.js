import { FormControl } from "react-bootstrap";

export default function UserRegistrationForm(props){

    return(
        <>
            <FormControl
            className="form-input input-group "
            placeholder="Ime"
            aria-describedby="basic-addon1"
            value={props.newUser.name}
            name="name"
            onChange={props.handleFormInputChange("name")}
          />
          <FormControl
            className="form-input input-group"
            placeholder="Prezime"
            aria-describedby="basic-addon1"
            value={props.newUser.surname}
            name="surname"
            onChange={props.handleFormInputChange("surname")}
          />
          <FormControl
            className="form-input input-group"
            required
            placeholder="Username"
            aria-describedby="basic-addon1"
            value={props.newUser.username}
            name="username"
            onChange={props.handleFormInputChange("username")}
          />
          <FormControl
            className="form-input input-group"
            placeholder="Sifra"
            aria-describedby="basic-addon1"
            value={props.newUser.password}
            type="password"
            name="password"
            onChange={props.handleFormInputChange("password")}
          />
          <FormControl
            className="form-input input-group"
            placeholder="Email"
            aria-describedby="basic-addon1"
            value={props.newUser.email}
            type="email"
            name="email"
            onChange={props.handleFormInputChange("email")}
          />
          <FormControl
            className="form-input input-group"
            placeholder="Broj telefona"
            aria-describedby="basic-addon1"
            value={props.newUser.telephoneNumber}
            type="number"
            name="telephoneNumber"
            onChange={props.handleFormInputChange("telephoneNumber")}
          />
        </>
    )
}