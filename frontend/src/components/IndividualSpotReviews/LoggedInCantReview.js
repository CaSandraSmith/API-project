import { useSelector } from "react-redux"
import { useModal } from '../../context/Modal';
import DeleteReviewModal from "../DeleteReviewModal";

export default function LoggedInCantReview() {
    console.log("logged in, but can't review")
    const { setModalContent } = useModal();
    const user = useSelector(state => state.session.user)
    const reviews = useSelector(state => state.reviews.spot);
    console.log("reviews", reviews)
    const spot = useSelector(state => state.spots.singleSpot);
    const spotNumReviews = useSelector(state => state.spots.singleSpot.numReviews);
    console.log("spot", spot)
    console.log("spotNumReviews", spotNumReviews)
    const reviewArray = Object.values(reviews)

    let formatRating = (rating) => {
        let num = rating.toString()
        if (num.length === 3) return num
        if (num.length === 1) return `${num}.0`
        if (num.length > 3) return `${num[0]}.${num[2]}`
    }

    function formatDate(date) {
        let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        let createdDate = new Date(date)
        let month = createdDate.getMonth()
        let formattedmonth = months[month]
        let year = createdDate.getFullYear()
        return formattedmonth +" " + year
    }

    const onClick = () => {
        setModalContent(<DeleteReviewModal spot={spot}/>)
    }

    return (
        <div>
            {spot.numReviews ? (
                <div>
                    <div>
                        <h3>
                            <div>
                                <i className="fa-solid fa-star"></i>
                                {formatRating(spot.avgStarRating)}
                            </div>
                            <div>
                                {spot.numReviews} reviews
                            </div>
                        </h3>
                    </div>
                    <div>
                        {reviewArray.map((userReview) => (
                            <div>
                                <h4>{userReview.User.firstName}</h4>
                                <h5>{formatDate(userReview.createdAt)}</h5>
                                <p>{userReview.review}</p>
                                {userReview.User.id === user.id ? <button onClick={onClick}>Delete</button> : null}
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div>
                    <i className="fa-solid fa-star"></i> New
                </div>
            )}
        </div>
    )
}