import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteASpot } from "../../store/spots";

export default function DeleteReviewModal({spot}) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const confirmDelete = (e) => {
    e.preventDefault();
    dispatch(deleteASpot(spot.id)).then(closeModal)
  };

  return (
    <>
      <h1>Confirm Delete</h1>
      <h2>Are you sure you want to delete this review?</h2>
      <button onClick={confirmDelete}>Yes (Delete Review)</button>
      <button onClick={closeModal}>No (Keep Review)</button>
    </>
  );
}