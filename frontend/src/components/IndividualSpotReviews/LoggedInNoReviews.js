import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useModal } from "../../context/Modal"
import PostReviewModal from "../PostReviewModal"

export default function LoggedInNoReviews({spot}) {
    console.log("logged in no reviews")
    const [loaded, setLoaded] = useState(false)
    const { setModalContent } = useModal();

    useEffect(() => {
        setLoaded(true)
    }, [])

    if(!loaded) return <h1>Loading ...</h1>

    const onClick = () => {
        setModalContent(<PostReviewModal spot={spot}/>);
    };

    return (
        <div>
            <div>
                <i className="fa-solid fa-star"></i> New
            </div>
            <div>
                <button onClick={onClick}>Post Your Review</button>
                <h4>Be the frst to post a review!</h4>
            </div>
        </div>
    )
}