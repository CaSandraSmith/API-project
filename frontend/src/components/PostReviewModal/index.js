import { useState } from "react"

export default function PostReviewModal({ spotId }) {
    const [description, setDescription] = useState("");
    const [stars, setStars] = useState("")

    let checkReview = () => {
        if (description.length < 10 || !stars) {
            return true
        }
        // console
        return false
    }

    function handleSubmit(e) {
        e.prevemtDefault()
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

                <button onClick={handleSubmit} disabled={true}>Submit Your Review</button>
            </form>
        </div>
    )
}