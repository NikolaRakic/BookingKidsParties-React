import { useState } from "react";
import Nav from "react-bootstrap/Nav";
import { TYPE_OF_SERVICE_PROVIDER } from "../../const/const";

export default function Submenu(props) {
  const [currentType, setCurrentType] = useState(props.curType);

  const changeType = (type) => {
    setCurrentType(type);
    props.func(type);
  };

  return (
    <Nav
      className="submenu"
      justify
      variant="tabs"
      defaultActiveKey={currentType}
      onSelect={(typeOfService) => changeType(typeOfService)}
    >
      <Nav.Item>
        <Nav.Link eventKey={TYPE_OF_SERVICE_PROVIDER.PLAYROOM}>Igraonice</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey={TYPE_OF_SERVICE_PROVIDER.CATERING}>Ketering</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey={TYPE_OF_SERVICE_PROVIDER.ANIMATOR}>Animatori</Nav.Link>
      </Nav.Item>
    </Nav>
  );
}
