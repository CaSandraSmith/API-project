export default function LoggedOut({ spot, reviews }) {
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

    return (
        <div>
            {spot.numReviews ? (
                <div>
                    <div>
                        <h3 className="review-title">
                            <div>
                                <i className="fa-solid fa-star"></i>
                                {formatRating(spot.avgStarRating)}
                            </div>
                            <i className="fa-solid fa-circle review-detail-stars"></i>
                            <div>
                                {spot.numReviews} { spot.numReviews === 1 ? <span>review</span>  : <span>reviews</span> }
                            </div>
                        </h3>
                    </div>
                    <div>
                        {reviewArray.map((userReview) => (
                            <div className="review-info">
                                <h4 className="reviewer-name">{userReview.User.firstName}</h4>
                                <h5 className="reviewer-date">{formatDate(userReview.createdAt)}</h5>
                                <p>{userReview.review}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div>
                    <h3 className="review-title"><i className="fa-solid fa-star"></i> New</h3>
                </div>
            )}
        </div>
    )
}