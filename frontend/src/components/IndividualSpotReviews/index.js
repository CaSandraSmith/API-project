import { useEffect, useState } from "react";
import { getReviewsBySpotId } from "../../store/reviews";
import { useDispatch, useSelector } from "react-redux";
import LoggedInCantReview from "./LoggedInCantReview";
import LoggedInNoReviews from "./LoggedInNoReviews";
import LoggedInPostReview from "./LoggedInPostReview";
import LoggedOut from "./LoggedOut";
import './IndividualSpotReviews.css';

export default function IndividualSpotReviews() {
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false);
    const spot = useSelector(state => state.spots.singleSpot);
    const reviews = useSelector(state => state.reviews.spot);
    const user = useSelector(state => state.session.user)
    console.log(2)
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
    }, [dispatch, spot]);

    if (loaded) {
        //logged out
        if (!user) return <LoggedOut spot={spot} reviews={reviews}/>
        //logged in but can't post review for some reason
        if(!validateUser(reviews)) return <LoggedInCantReview spot={spot} />
        //logged in and there are no reviews
        if (!Object.values(reviews).length) return <LoggedInNoReviews spot={spot} />
        //logged in, there are reviews, but they can still post
        return <LoggedInPostReview spot={spot} reviews={reviews}/>
    } else {
        return <h3>Loading ...</h3>
    }
}