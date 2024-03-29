import { Overlay, Tooltip } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { Rating } from "react-simple-star-rating";
import { TRANSLETE_TYPE_OF_SERVICE_PROVIDER, TYPE_OF_SERVICE_PROVIDER } from "../../const/const";

export default function ServiceOfferCardText(props) {
  const [showPriceDetails, setShowPriceDetails] = useState(false);
  const target = useRef(null);
  let priceDetails = props.priceDetails;
  let totalPrice = 999999999;
  let priceDescription = "";

  if (props.additionalServiceOfferType === TYPE_OF_SERVICE_PROVIDER.CATERING) {
    totalPrice =
      priceDetails.pricePerKid * priceDetails.numberOfKids +
      priceDetails.pricePerAdult * priceDetails.numberOfAdults;
    priceDescription = `Ukupno dece (${priceDetails.numberOfKids}) * cena po detetu (${priceDetails.pricePerKid}din)
      + Ukupno odraslih (${priceDetails.numberOfAdults}) * cena po odrasloj osobi (${priceDetails.pricePerAdult}din)
      = ${totalPrice}din`;
  } else {
    totalPrice = priceDetails.pricePerHour * priceDetails.durationOfHours;
    priceDescription = `Ukupan broj sati (${
      priceDetails.durationOfHours
    }h) * cena po satu (${priceDetails.pricePerHour}din) = ${
      priceDetails.durationOfHours * priceDetails.pricePerHour
    }din`;
  }
  return (
    <>
      <Link
        to={`/pruzaoci-usluga/${props.offer.serviceProviderId}`}
        className="link"
      >
        {props.offer.serviceProviderUsername}
      </Link>
      
        <Rating
          readonly
          size={40}
          ratingValue={props.offer.averageRating * 20}
          label
          //transition
          fillColor="orange"
          emptyColor="gray"
        />
      
      <br />
      <br />
      Ukupna cena:{totalPrice}din
      <i
        ref={target}
        onMouseEnter={() => setShowPriceDetails(!showPriceDetails)}
        onMouseLeave={() => setShowPriceDetails(!showPriceDetails)}
      >
        <FontAwesomeIcon icon={faInfoCircle} style={{ fontSize: 20 }} />
      </i>
      <Overlay
        target={target.current}
        show={showPriceDetails}
        placement="right"
      >
        {(props) => (
          <Tooltip id="overlay-example" {...props}>
            {priceDescription}
          </Tooltip>
        )}
      </Overlay>
    </>
  );
}
