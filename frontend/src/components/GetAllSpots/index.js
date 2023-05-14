import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loadSpots } from '../../store/spots';
import IndividualSpotsListItem from '../IndividualSpotsListItem';
import './GetAllSpots.css'

export default function GetAllSpots() {
    const dispatch = useDispatch();
    const spots = useSelector((state) => state.spots.allSpots);
    const allSpots = Object.values(spots);

    useEffect(() => {
        dispatch(loadSpots())
    }, [dispatch])

    return (
        <div className='allSpotsWrapper'>
            {allSpots.map((spot) => (
                <IndividualSpotsListItem spot={spot} key={spot.id}/>
            ))}
        </div>
    )
}