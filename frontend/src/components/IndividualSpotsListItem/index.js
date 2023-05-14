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
        <div onClick={movePage} className={`all-spots-page-spot-wrapper ${currentSpot}`} data-title={spot.name}>
            <img src={spot.previewImage} alt={spot.name} />
            <div className="spot-info-wrapper">
                <div className="get-all-spots-location-stars">
                    <p>
                        {spot.city}, {spot.state}
                    </p>
                    <div>
                        <div>
                            {spot.avgRating ?
                                <p className="all-spots-bold">
                                    <i className="fa-solid fa-star"></i> {spot.avgRating.toFixed(1)}
                                </p> :
                                <p>
                                    <i className="fa-solid fa-star"></i> New
                                </p>
                            }
                        </div>
                    </div>
                </div>
                <div>
                    <p><span className="all-spots-bold">${spot.price}</span> night</p>
                </div>
            </div>
        </div>
    )
}