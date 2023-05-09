import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { findOneSpot } from '../../store/spots';

export default function GetOneSpot() {
    const { id } = useParams();
    const dispatch = useDispatch()
    const spot = useSelector(state => state.spots.singleSpot)

    
    useEffect(() => {
        dispatch(findOneSpot(id))
    }, [dispatch])
    
    if (!Object.values(spot).length) return <h1>Loading ...</h1>

    return (
        <div>
            <div>
                <h1>{spot.name}</h1>
                <h2>{spot.city}, {spot.state}, {spot.country}</h2>
            </div>
            <div>
                {spot.SpotImages.map(image => (
                    <img src={image.url} alt={spot.name} />
                ))}
            </div>
            <div>
                <h3>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h3>
                <p>{spot.description}</p>
                <div>
                    <div>
                        <div>
                            ${spot.price} night
                        </div>
                        <div>
                            <div>
                                <i className="fa-solid fa-star"></i>{spot.avgStarRating}
                            </div>
                            <div>
                                {spot.numReviews} reviews
                            </div>
                        </div>
                    </div>
                    <div>
                        <button>Reserve</button>
                    </div>
                </div>
            </div>
        </div>
    )
}