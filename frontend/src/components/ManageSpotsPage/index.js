import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getUsersSpots } from '../../store/spots';

export default function ManageSpots() {
    const history = useHistory();
    const dispatch = useDispatch();
    let usersSpots = useSelector(state => state.spots.currentUserSpots)
    console.log("usersSpots", usersSpots)

    useEffect(() => {
        dispatch(getUsersSpots())
    }, [dispatch])
    return(
        <div>
            <h1>Manage Your Spots</h1>
            <button onClick={() => history.push('/spots/new')}>Create a New Spot</button>
        </div>
    )
}