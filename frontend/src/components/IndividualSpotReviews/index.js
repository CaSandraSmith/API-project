import { useEffect, useState } from "react";
import { getReviewsBySpotId } from "../../store/reviews";
import { useDispatch, useSelector } from "react-redux";
import LoggedInCantReview from "./LoggedInCantReview";
import LoggedInNoReviews from "./LoggedInNoReviews";
import LoggedInPostReview from "./LoggedInPostReview";
import LoggedOut from "./LoggedOut";

export default function IndividualSpotReviews({ spot }) {
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false)
    const reviews = useSelector(state => state.reviews.spot);
    const user = useSelector(state => state.session.user)
    
    
    let validateUser = (obj) => {
        let arr = Object.values(obj);
        if (spot.ownerId === user.id) return false
        for (let review of arr) {
            if (review.userId === user.id) return false
        }
        return true
    }
    
    useEffect(() => {
        dispatch(getReviewsBySpotId(spot.id))
        setLoaded(true)
    }, [dispatch]);

    if (loaded) {
        if (!user) return <LoggedOut spot={spot} reviews={reviews}/>
        if(!validateUser(reviews)) return <LoggedInCantReview spot={spot} reviews={reviews}/>
        if (!Object.values(reviews).length) return <LoggedInNoReviews spot={spot} />
    } else {
        return <h1>Loading ...</h1>
    }

    return (
        <div>
            {/* {!validateUser && <} */}
            {/* {spot.numReviews ? (
                <div>
                    <div>
                        <i className="fa-solid fa-star"></i>
                        {formatRating(spot.avgStarRating)}
                    </div>
                    <div>
                        {spot.numReviews} reviews
                    </div>
                    {user && validateUser(reviews) ? 
                    <div>
                        <button>Post Your Review</button>                         
                    </div>
                    : null}
                </div>
            ) : (
                <div>
                    <i className="fa-solid fa-star"></i> New
                    {user && validateUser(reviews) ? 
                    <div>
                        <button>Post Your Review</button> 
                        <h4>Be the frst to post a review!</h4>
                    </div>
                    : null}
                </div>
            )} */}
        </div>
    )
}