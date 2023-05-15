import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { findOneSpot } from '../../store/spots';
import IndividualSpotReviews from '../IndividualSpotReviews';
import { clearSingleSpot } from '../../store/spots';
import "./GetOneSpot.css"

export default function GetOneSpot() {
    const { id } = useParams();
    const dispatch = useDispatch()
    const spot = useSelector(state => state.spots.singleSpot)
    const reviews = useSelector(state => state.reviews.spot)
    let num = Object.values(reviews).length
    useEffect(() => {
        dispatch(findOneSpot(id))
        return (() => dispatch(clearSingleSpot()))
    }, [dispatch, num])

    if (!Object.values(spot).length) return null

    return (
        <div className='singleSpotPage'>
            <div className='single-spot-name-location'>
                <h1>{spot.name}</h1>
                <h2>{spot.city}, {spot.state}, {spot.country}</h2>
            </div>
            <div className='getOneSpotImages'>
                <div>
                    <img src={spot.SpotImages[0].url} alt={spot.SpotImages[0].name} className='preview-image images' />
                </div>
                <div className='optional-images'>
                    {spot.SpotImages[1] ?
                        <img src={spot.SpotImages[1].url} alt={spot.SpotImages[1].name} className='spotImage1 images' />
                        :
                        <img src='https://res.cloudinary.com/djp7wsuit/image/upload/v1684114076/Untitled_design_ducrv0.png' alt='image-not-found' className='spotImage1 images' />
                    }
                    {spot.SpotImages[2] ?
                        <img src={spot.SpotImages[2].url} alt={spot.SpotImages[2].name} className='spotImage2 images' />
                        :
                        <img src='https://res.cloudinary.com/djp7wsuit/image/upload/v1684114076/Untitled_design_ducrv0.png' alt='image-not-found' className='spotImage2 images' />
                    }
                    {spot.SpotImages[3] ?
                        <img src={spot.SpotImages[3].url} alt={spot.SpotImages[3].name} className='spotImage3 images' />
                        :
                        <img src='https://res.cloudinary.com/djp7wsuit/image/upload/v1684114076/Untitled_design_ducrv0.png' alt='image-not-found' className='spotImage3 images' />
                    }
                    {spot.SpotImages[4] ?
                        <img src={spot.SpotImages[4].url} alt={spot.SpotImages[4].name} className='spotImage4 images' />
                        :
                        <img src='https://res.cloudinary.com/djp7wsuit/image/upload/v1684114076/Untitled_design_ducrv0.png' alt='image-not-found' className='spotImage4 images' />
                    }
                </div>
            </div>
            <div>
                <div>
                    <h3>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h3>
                    <p>{spot.description}</p>
                    <div>
                        <div>
                            <div>
                                ${spot.price} night
                            </div>
                            {num ? (
                                <div>
                                    <div>
                                        <i className="fa-solid fa-star"></i>
                                        {spot.avgStarRating}
                                    </div>
                                    <div>
                                        {num} reviews
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
            </div>
            <div>
                <IndividualSpotReviews />
            </div>
        </div>
    )
}