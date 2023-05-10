import { useHistory } from "react-router-dom";

export default function UsersSpots({ spot }) {
    const history = useHistory()
    return (
        <div>
            <img src={spot.previewImage} alt={spot.name} />
            <div>
                <div>{spot.city}, {spot.state}</div>
                {spot.avgRating ? (
                    <div>
                        <i className="fa-solid fa-star"></i>
                        {spot.avgRating}
                    </div>
                ) : (
                    <div>
                        <i className="fa-solid fa-star"></i> New
                    </div>
                )}
                <div>
                    ${spot.price} night
                </div>
            </div>
            <div>
                <button onClick={() => history.push(`/spots/${spot.id}/edit`)}>Update</button>
                <button>Delete</button>
            </div>
        </div>
    )
}