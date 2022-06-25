import moment from "moment";
import { Rating } from "react-simple-star-rating";

export default function CommentsSection(props) {
  let comments = [];

  if (typeof props.comments !== "undefined") {
    comments = props.comments;
    console.log(comments);
  }
  return (
    <>
      {comments.map((comment, index) => {
        return (
          <div className="comment" key={index} ref={props.refProp}>
            <p className="time-comment">
              {moment(comment.dateTime).format("YYYY-MM-DD")}
            </p>
            <p className="text-comment">{comment.comment}</p>
            <div className="row-details stars-comment">
              <Rating
                readonly
                size={30}
                ratingValue={comment.rate * 20}
                label
                //transition
                fillColor="orange"
                emptyColor="gray"
              />
            </div>
          </div>
        );
      })}
    </>
  );
}
