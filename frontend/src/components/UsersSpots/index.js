import { Link } from "react-router-dom";
import DeleteSpotModal from "../DeleteSpotModal";
import { useModal } from '../../context/Modal';
import EditSpotForm from "../EditSpotForm";

export default function UsersSpots({ spot }) {
    const { setModalContent } = useModal();

    const onClick = () => {
        setModalContent(<DeleteSpotModal spot={spot}/>);
    };

    return (
        <div>
            <img src={spot.previewImage} alt={spot.name} />
            <div>
                <div>{spot.city}, {spot.state}</div>
                {spot.avgRating ? (
                    <div>
                        <i className="fa-solid fa-star"></i>
                        {spot.avgRating}
                    </div>
                ) : (
                    <div>
                        <i className="fa-solid fa-star"></i> New
                    </div>
                )}
                <div>
                    ${spot.price} night
                </div>
            </div>
            <div>
                <Link to={`/spots/${spot.id}/edit`}>
                    <button>Update</button>
                </Link>
                <button onClick={onClick}>Delete</button>
            </div>
        </div>
    )
}