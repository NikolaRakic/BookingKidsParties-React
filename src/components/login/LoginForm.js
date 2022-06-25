import {  FormControl } from "react-bootstrap";

export default function LoginForm(props){

    return(
        <>
             <FormControl
              className="form-input input-group  "
              placeholder="Korisničko ime ili email"
              aria-describedby="basic-addon1"
              value={props.credentials.usernameOrEmail}
              name="username"
              onChange={props.handleFormInputChange("usernameOrEmail")}
            />
            <FormControl
              className="form-input input-group"
              placeholder="Lozinka"
              aria-describedby="basic-addon1"
              value={props.credentials.password}
              type="password"
              name="password"
              onChange={props.handleFormInputChange("password")}
            />
        </>
    )
}