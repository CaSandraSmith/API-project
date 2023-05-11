import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { findOneSpot } from '../../store/spots';
import IndividualSpotReviews from '../IndividualSpotReviews';

export default function GetOneSpot() {
    const { id } = useParams();
    const dispatch = useDispatch()
    const spot = useSelector(state => state.spots.singleSpot)
    const [loaded, setLoaded] = useState(false)


    useEffect(() => {
        dispatch(findOneSpot(id))
        setLoaded(true)
    }, [dispatch])

    if (!Object.values(spot).length) return null
    if (!loaded) return <h1>Loading ...</h1>
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
                        {spot.numReviews ? (
                            <div>
                                <div>
                                    <i className="fa-solid fa-star"></i>
                                    {spot.avgStarRating}
                                </div>
                                <div>
                                    {spot.numReviews} reviews
                                </div>
                            </div>
                        ) : (
                            <div>
                                <i className="fa-solid fa-star"></i> New
                            </div>
                        )}
                    </div>
                    <div>
                        <button>Reserve</button>
                    </div>
                </div>
            </div>
            <div>
                <IndividualSpotReviews />
            </div>
        </div>
    )
}