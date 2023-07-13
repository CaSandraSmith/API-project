import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { findOneSpot } from '../../store/spots';
import IndividualSpotReviews from './IndividualSpotReviews';
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

    let testClick = () => {
        console.log("hello")
    }

    return (
        <div className='singleSpotPage'>
            <div className='single-spot-name-location'>
                <h1>{spot.name}</h1>
                <h2>{spot.city}, {spot.state}, {spot.country}</h2>
            </div>
            <div className='getOneSpotImages' onClick={testClick}>
                <div className='preview-image-wrapper'>
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
                <button className='view-single-spot-photos-button'>
                    <div className='view-single-spot-photos-icons'>
                        <i className="fa-solid fa-ellipsis-vertical"></i>
                        <i className="fa-solid fa-ellipsis-vertical"></i>
                        <i className="fa-solid fa-ellipsis-vertical"></i>
                    </div>
                    <p className='view-single-spot-photos-text'>Show all photos</p>
                </button>
            </div>
            <div className='individual-spot-info'>
                <div className='host-info'>
                    <h3 className='host'>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h3>
                    <p>{spot.description}</p>
                </div>
                <div className='booking-info-wrapper'>
                    <div className='booking-info'>
                        <div>
                            ${spot.price} night
                        </div>
                        {num ? (
                            <div className='rating-star-info-single-spot'>
                                <div className='star-rating'>
                                    <i className="fa-solid fa-star booking-star-rating"></i>
                                    {spot?.avgStarRating?.toFixed(1)}
                                </div>
                                <i className="fa-solid fa-circle"></i>
                                <div>
                                    {num} {num === 1 ? <span>review</span> : <span>reviews</span>}
                                </div>
                            </div>
                        ) : (
                            <div className='rating-star-info-single-spot'>
                                <i className="fa-solid fa-star booking-star-rating"></i> New
                            </div>
                        )}
                    </div>
                    <button className='reserve-button' onClick={() => window.alert("Feature coming soon")}>Reserve</button>
                </div>
            </div>
            <div className='rating-info'>
                <IndividualSpotReviews />
            </div>
        </div>
    )
}