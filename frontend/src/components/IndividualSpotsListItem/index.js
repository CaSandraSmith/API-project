export default function IndividualSpotListItem({spot}) {

    return (
        <div>
            {spot.previewImage ? <img src={spot.previewImage} alt={spot.name}/> : <p>No preview Image</p>}            
            <p>
                {spot.city}, {spot.state}
            </p>
            <p>
                ${spot.price} per night
            </p>
            <p>
            <i class="fa-solid fa-star"></i>{spot.avgRating}
            </p>
        </div>
    )
}