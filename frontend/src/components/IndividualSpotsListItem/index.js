import { useHistory } from "react-router-dom"
import './IndividualSpotListItem.css'
import { useState } from "react"

export default function IndividualSpotListItem({ spot }) {
    const [currentSpot, setCurrentSpot] = useState(false)
    const history = useHistory()

    function movePage() {
        history.push(`/spots/${spot.id}`)
    }
    return (
        <div onClick={movePage} className={`all-spots-page-spot-wrapper ${currentSpot}`} role="tooltip" aria-describedby={spot.name} >
            {spot.previewImage ? <img src={spot.previewImage} alt={spot.name} /> : <p>No preview Image</p>}
            <p>
                {spot.city}, {spot.state}
            </p>
            <p>
                ${spot.price} per night
            </p>
            <p>
                <i className="fa-solid fa-star"></i>{spot.avgRating}
            </p>
        </div>
    )
}