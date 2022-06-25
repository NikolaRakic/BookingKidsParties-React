import { useState } from "react";
import Nav from "react-bootstrap/Nav";

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
        <Nav.Link eventKey="IGRAONICA">Igraonice</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="KETERING">Ketering</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="ANIMATOR">Animatori</Nav.Link>
      </Nav.Item>
    </Nav>
  );
}
