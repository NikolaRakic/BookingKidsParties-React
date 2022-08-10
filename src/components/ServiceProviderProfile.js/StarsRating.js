import { Rating } from "react-simple-star-rating";
import { Link } from "react-router-dom";
export default function StarsRating(props) {

  const existRate = (rate) => {
    if (rate !== 0) {
      return true;
    }
    return false;
  };

  return (
    <>
      <div className="row-details stars">
        <Rating
          //onClick={handleRating}

          readonly
          size={50}
          ratingValue={props.ratingValue * 20}
          label
          //transition
          fillColor="orange"
          emptyColor="gray"
        />
        <p className="rating-value-p">{Number((props.ratingValue).toFixed(1))}</p>
      </div>

      {existRate(props.countOfRate) ? (
        <Link
          to=""
          onClick={props.scrollToCommentsSection}
          className="count-of-rating-p"
        >
          {`Pogledaj ocene (` + props.countOfRate + `)`}
        </Link>
      ) : (
        <p className="count-of-rating-p">Nema ocena</p>
      )}
    </>
  );
}
