import { useEffect, useState } from "react"
import { useModal } from "../../../context/Modal"
import { useSelector } from "react-redux";
import PostReviewModal from "../../PostReviewModal"

export default function LoggedInNoReviews({ spot }) {
    const [loaded, setLoaded] = useState(false)
    const { setModalContent } = useModal();

    useEffect(() => {
        setLoaded(true)
    }, [])

    if (!loaded) return <h3>Loading ...</h3>

    const onClick = () => {
        setModalContent(<PostReviewModal spot={spot} />);
    };

    return (
        <div className="review-wrapper">
            <div>
                <h3 className="review-title"><i className="fa-solid fa-star review-detail-stars"></i> New</h3>
            </div>
            <div className="post-review-wrapper">
                <button className="post-review" onClick={onClick}>Post Your Review</button>
                <h4>Be the frst to post a review!</h4>
            </div>
        </div>
    )
}