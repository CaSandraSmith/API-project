export default function LoggedInPostReview({spot, reviews}) {
    console.log("logged in and can post review")
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
        return formattedmonth + " " + year
    }

    return (
        <div>
            <div>
                <div>
                    <i className="fa-solid fa-star"></i>
                    {formatRating(spot.avgStarRating)}
                </div>
                <div>
                    {spot.numReviews} reviews
                </div>
            </div>
            <div>
                <button>Post Your Review</button>
            </div>
            <div>
                {reviewArray.map((userReview) => (
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