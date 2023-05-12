import { useState } from "react"
import "./PostReviewModal.css"

export default function PostReviewModal({ spotId }) {
    let [description, setDescription] = useState("");
    let [stars, setStars] = useState(0);
    let [activeStars, setActiveStars] = useState(0);

    let checkReview = () => {
        if (description.length < 10 || !stars) {
            return true
        }
        return false
    }

    function handleSubmit(e) {
        e.preventDefault()
    }

    return (
        <div>
            <h1>How was your stay?</h1>
            <form>
                <label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
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