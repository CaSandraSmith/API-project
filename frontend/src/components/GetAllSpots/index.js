import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loadSpots } from '../../store/spots';

export default function GetAllSpots() {
    const dispatch = useDispatch();
    const spots = useSelector((state) => state.spots.allSpots);
    const allSpots = Object.values(spots);
    console.log(allSpots)
    useEffect(() => {
        dispatch(loadSpots())
    }, [dispatch])

    return (
        <ul>
            {allSpots.map((spot) => {
                <li>{spot.name}</li>
            })}
        </ul>
    )
}