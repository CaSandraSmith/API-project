import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getUsersSpots } from '../../store/spots';
import UsersSpots from "../UsersSpots";

export default function ManageSpots() {
    const history = useHistory();
    const dispatch = useDispatch();
    let usersSpots = useSelector(state => state.spots.currentUserSpots)
    let spots = Object.values(usersSpots)
    console.log("spots", spots)
    useEffect(() => {
        dispatch(getUsersSpots())
    }, [dispatch])
    return (
        <div>
            <h1>Manage Your Spots</h1>
            <button onClick={() => history.push('/spots/new')}>Create a New Spot</button>
            <div>
                {spots.map(spot => (
                    <UsersSpots spot={spot} />
                ))}
            </div>
        </div>
    )
}