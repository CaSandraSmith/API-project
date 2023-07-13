import { useSelector } from "react-redux"
import { useModal } from '../../../context/Modal';
import DeleteReviewModal from "../../DeleteReviewModal";

export default function LoggedInCantReview() {
    const { setModalContent } = useModal();
    const user = useSelector(state => state.session.user)
    const reviews = useSelector(state => state.reviews.spot);
    const spot = useSelector(state => state.spots.singleSpot);
    const spotNumReviews = useSelector(state => state.spots.singleSpot.numReviews);
    const reviewArray = Object.values(reviews)
    const sortedArray = reviewArray.sort((a, b) => b.id - a.id)

    function formatDate(date) {
        let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        let createdDate = new Date(date)
        let month = createdDate.getMonth()
        let formattedmonth = months[month]
        let year = createdDate.getFullYear()
        return formattedmonth + " " + year
    }

    const onClick = (reviewToDelte) => {
        setModalContent(<DeleteReviewModal review={reviewToDelte} />)
    }

    return (
        <div className="individual-spots-reviews-wrapper">
            {spot.numReviews ? (
                <div>
                    <div>
                        <h3 className="review-title">
                            <div>
                                <i className="fa-solid fa-star review-detail-stars"></i>
                                {spot?.avgStarRating?.toFixed(1)}
                            </div>
                            <i className="fa-solid fa-circle"></i>
                            <div className="review-numbers">
                                {spot.numReviews} {spot.numReviews === 1 ? <span>review</span> : <span>reviews</span>}
                            </div>
                        </h3>
                    </div>
                    <div>
                        {sortedArray.map((userReview) => (
                            <div className="review-info wrapper">
                                <h4 className="reviewer-name">{userReview?.User?.firstName}</h4>
                                <h5 className="reviewer-date">{formatDate(userReview.createdAt)}</h5>
                                <p>{userReview.review}</p>
                                {userReview?.User?.id === user.id ? <button onClick={() => onClick(userReview)} className="delete-review-button">Delete</button> : null}
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div>
                    <h3 className="review-title"><i className="fa-solid fa-star review-detail-stars"></i> New</h3>
                </div>
            )}
        </div>
    )
}