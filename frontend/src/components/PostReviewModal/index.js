import { useState } from "react"

export default function PostReviewModal({ spotId }) {
    const [description, setDescription] = useState("");
    const [stars, setStars] = useState("")
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
                <button>Submit Your Review</button>
            </form>
        </div>
    )
}