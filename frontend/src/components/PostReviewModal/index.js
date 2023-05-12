import { useState } from "react"
import { useDispatch } from "react-redux";
import { createReview } from "../../store/reviews";
import { useModal } from "../../context/Modal";
import "./PostReviewModal.css"

export default function PostReviewModal({ spot }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    let [review, setReview] = useState("");
    let [stars, setStars] = useState(0);
    let [activeStars, setActiveStars] = useState(0);
    const [errors, setErrors] = useState({});

    let checkReview = () => {
        if (review.length < 10 || !stars) {
            return true
        }
        return false
    }

    async function handleSubmit (e) {
        setErrors({})
        e.preventDefault()
        let reviewData = {stars, review}
        let reviewResponse = await dispatch(createReview(reviewData, spot.id))

        if (reviewResponse.errors) setErrors(reviewResponse.errors)
        else {
            closeModal()
        }
    }

    return (
        <div>
            <h1>How was your stay?</h1>
            {errors.review ? <h2>{errors.review}</h2> : null}
            {errors.stars ? <h2>{errors.stars}</h2> : null}
            <form>
                <label>
                    <textarea
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        placeholder="Leave your review here..."
                    />
                </label>
                <div>
                    <div >
                        <i className={`fa-star ${stars >= 1 || activeStars >= 1 ? "fa-solid" : "fa-regular"}`} onClick={() => setStars(1)} onMouseEnter={() => setActiveStars(1)} ></i>
                    </div>
                    <div>
                        <i className={`fa-star ${stars >= 2 || activeStars >= 2 ? "fa-solid" : "fa-regular"}` } onClick={() => setStars(2)} onMouseEnter={() => setActiveStars(2)}></i>
                    </div>
                    <div>
                        <i className={`fa-star ${stars >= 3 || activeStars >= 3 ? "fa-solid" : "fa-regular"}`} onClick={() => setStars(3)} onMouseEnter={() => setActiveStars(3)}></i>
                    </div>
                    <div>
                        <i className={`fa-star ${stars >= 4 || activeStars >= 4 ? "fa-solid" : "fa-regular"}`} onClick={() => setStars(4)} onMouseEnter={() => setActiveStars(4)}></i>
                    </div>
                    <div >
                        <i className={`fa-star ${stars === 5 || activeStars >= 5 ? "fa-solid" : "fa-regular"}`} onClick={() => setStars(5)} onMouseEnter={() => setActiveStars(5)}></i>
                    </div>
                    <div>
                        <p>Stars</p>
                    </div>
                </div>
                <button onClick={handleSubmit} disabled={checkReview()}>Submit Your Review</button>
            </form>
        </div>
    )
}