import { useModal } from "../../../context/Modal"
import { useSelector } from "react-redux"
import PostReviewModal from "../../PostReviewModal"

export default function LoggedInPostReview() {
    const { setModalContent } = useModal();
    const reviews = useSelector(state => state.reviews.spot);
    const spot = useSelector(state => state.spots.singleSpot);
    const reviewArray = Object.values(reviews)
    const sortedArray = reviewArray.sort((a, b) => b.id - a.id)

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
        setModalContent(<PostReviewModal spot={spot} />);
    };

    return (
        <div className="review-wrapper">
            <h3 className="review-title">
                <div>
                    <i className="fa-solid fa-star review-detail-stars"></i>
                    {formatRating(spot.avgStarRating)}
                </div>
                <div className="review-numbers">
                    {spot.numReviews} {spot.numReviews === 1 ? <span>review</span> : <span>reviews</span>}
                </div>
            </h3>
            <div className="post-review-wrapper">
                <button className="post-review" onClick={onClick}>Post Your Review</button>
            </div>
            <div>
                {sortedArray.map((userReview) => (
                    <div className="review-info wrapper">
                        <h4 className="reviewer-name">{userReview.User.firstName}</h4>
                        <h5 className="reviewer-date">{formatDate(userReview.createdAt)}</h5>
                        <p>{userReview.review}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}