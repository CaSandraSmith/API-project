import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"

export default function LoggedInNoReviews({spot}) {
    console.log("logged in no reviews")
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        setLoaded(true)
    }, [])

    if(!loaded) return <h1>Loading ...</h1>

    return (
        <div>
            <div>
                <i className="fa-solid fa-star"></i> New
            </div>
            <div>
                <button>Post Your Review</button>
                <h4>Be the frst to post a review!</h4>
            </div>
        </div>
    )
}