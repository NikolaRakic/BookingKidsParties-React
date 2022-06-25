import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faEnvelope,
  faPhoneSquareAlt,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import StarsRating from "./StarsRating";

export default function ProfileDetails(props) {
  const serviceProvider = props.serviceProvider;
  const workTime = `${serviceProvider.startOfWork?.slice(0, -3)}h -
                      ${serviceProvider.endOfWork?.slice(0, -3)}h`;

  return (
    <div className="profile-details">
      <div className="row-details">
        <FontAwesomeIcon icon={faMapMarkerAlt} style={{ fontSize: 48 }} />
        <p className="detail">
          {serviceProvider.adress}, {serviceProvider.city}
        </p>
      </div>
      <div className="row-details">
        <FontAwesomeIcon icon={faEnvelope} style={{ fontSize: 48 }} />
        <p className="detail">{serviceProvider.email}</p>
      </div>
      <div className="row-details">
        <FontAwesomeIcon icon={faPhoneSquareAlt} style={{ fontSize: 48 }} />
        <p className="detail">{serviceProvider.telephoneNumber}</p>
      </div>
      <div className="row-details">
        <FontAwesomeIcon icon={faClock} style={{ fontSize: 48 }} />
        <p className="detail">Radno vreme: {workTime}</p>
      </div>
      <StarsRating
        scrollToCommentsSection={props.scrollToCommentsSection}
        ratingValue={props.ratingValue}
        countOfRate={props.countOfRate}
      />
    </div>
  );
}
