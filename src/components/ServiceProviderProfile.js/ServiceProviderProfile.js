import CommentsSection from "./CommentsSection";
import PhotoSlider from "./PhotoSlider";
import ProfileDetails from "./ProfileDetails";
import { useEffect, useRef } from "react";


export default function ServiceProviderProfile(props) {

  const serviceProvider = props.serviceProvider;
  const myRef = useRef(null)

  const scrollToCommentsSection = () => {
      myRef.current.scrollIntoView({
        behavior: 'auto',
        block: 'center',
        inline: 'center'
    });
  }

  return (
    <>
      <h2 className="title">{serviceProvider.username}</h2>

      <div className="profile">
        <PhotoSlider
          photos={props.photos}
        />
        <ProfileDetails
          serviceProvider={serviceProvider}
          ratingValue={props.ratingValue}
          countOfRate={props.countOfRate}
          scrollToCommentsSection={scrollToCommentsSection}
        />
      </div>
  
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <CommentsSection refProp={myRef} comments={props.comments}/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
    </>
  );
}
