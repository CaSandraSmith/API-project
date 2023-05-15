import { useModal } from "../../context/Modal"
import { useSelector } from "react-redux"
import PostReviewModal from "../PostReviewModal"

export default function LoggedInPostReview() {
    const { setModalContent } = useModal();
    const reviews = useSelector(state => state.reviews.spot);
    const spot = useSelector(state => state.spots.singleSpot);
    console.log("logged in and can post review")
    const reviewArray = Object.values(reviews)
    const sortedArray = reviewArray.sort((a,b) => b.id - a.id)

    let formatRating = (rating) => {
        if (rating) rating.toFixed(1);
    }

    function formatDate(date) {
        let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        let createdDate = new Date(date)
        let month = createdDate.getMonth()
        let formattedmonth = months[month]
        let year = createdDate.getFullYear()
        return formattedmonth + " " + year
    }

    const onClick = () => {
        setModalContent(<PostReviewModal spot={spot}/>);
    };

    return (
        <div>
            <h3 className="review-title">
                <div>
                    <i className="fa-solid fa-star"></i>
                    {formatRating(spot.avgStarRating)}
                </div>
                <div>
                    {spot.numReviews} reviews
                </div>
            </h3>
            <div>
                <button onClick={onClick}>Post Your Review</button>
            </div>
            <div>
                {sortedArray.map((userReview) => (
                    <div>
                        <h4>{userReview.User.firstName}</h4>
                        <h5>{formatDate(userReview.createdAt)}</h5>
                        <p>{userReview.review}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}