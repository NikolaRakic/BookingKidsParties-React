import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleRight,
  faArrowAltCircleLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function ArrowAltCircle(props) {
  let navigate = useNavigate();

  return (
    <div className="center">
      {props.backUrl && <FontAwesomeIcon
          className="arrow-navigation"
          onClick={() => navigate(props.backUrl)}
          icon={faArrowAltCircleLeft}
        />} 
      {props.nextUrl && <FontAwesomeIcon
        className="arrow-navigation"
        onClick={() => navigate(props.nextUrl)}
        icon={faArrowAltCircleRight}
      />}  
      
    </div>
  );
}
