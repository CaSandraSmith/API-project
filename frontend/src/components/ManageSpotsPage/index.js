import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getUsersSpots } from '../../store/spots';
import { clearUserSpots } from '../../store/spots'
import UsersSpots from "./UsersSpots";
import './ManageSpots.css';

export default function ManageSpots() {
    const history = useHistory();
    const dispatch = useDispatch();
    let usersSpots = useSelector(state => state.spots.currentUserSpots)
    let spots = Object.values(usersSpots)

    useEffect(() => {
        dispatch(getUsersSpots())
        return (() => dispatch(clearUserSpots()))
    }, [dispatch])

    return (
        <div className="manage-spots-page-wrapper">
            <div className="manage-spots-header">
                <h1 className="manage-spots-title">Manage Spots</h1>
                <button className="create-a-new-spot-button" onClick={() => history.push('/spots/new')}>Create a New Spot</button>
            </div>
            <div className="all-user-spots-wrapper">
                {spots.map(spot => (
                    <UsersSpots spot={spot} />
                ))}
            </div>
        </div>
    )
}