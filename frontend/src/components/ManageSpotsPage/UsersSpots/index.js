import { Link } from "react-router-dom";
import DeleteSpotModal from "../../DeleteSpotModal";
import { useModal } from '../../../context/Modal';
import EditSpotForm from "../../EditSpotForm";
import { useHistory } from "react-router-dom";
import './UsersSpots.css';

export default function UsersSpots({ spot }) {
    const history = useHistory()
    const { setModalContent } = useModal();

    const onClick = () => {
        setModalContent(<DeleteSpotModal spot={spot} />);
    };

    function movePage() {
        history.push(`/spots/${spot.id}`)
    }

    return (
        <div className="individual-user-spots-page-wrapper">
            <div onClick={movePage}>
                <img src={spot.previewImage} alt={spot.name} />
                <div className="spot-info-wrapper">
                    <div className="get-all-spots-location-stars">
                        <p>{spot.city}, {spot.state}</p>
                        <div>
                            <div>
                                {spot.avgRating ? (
                                    <p className="all-spots-bold">
                                        <i className="fa-solid fa-star"></i>
                                        {spot?.avgRating?.toFixed(1)}
                                    </p>
                                ) : (
                                    <p>
                                        <i className="fa-solid fa-star"></i> New
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div>
                        <p><span className="all-spots-bold">${spot.price}</span> night</p>
                    </div>
                </div>
            </div>
            <div className="update-and-delete-buttons">
                <Link to={`/spots/${spot.id}/edit`}>
                    <button className="update-spot-button">Update</button>
                </Link>
                <div>

                <button onClick={onClick}>Delete</button>
                </div>
            </div>
        </div>
    )
}