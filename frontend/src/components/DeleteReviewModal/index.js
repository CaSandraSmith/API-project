import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { reviewDeletions } from "../../store/reviews";
import './DeleteReviewModal.css'


export default function DeleteReviewModal({review}) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const confirmDelete = (e) => {
    e.preventDefault();
    dispatch(reviewDeletions(review.id)).then(closeModal)
  };

  return (
    <div className="delete-review-modal">
      <h1 className="delete-modal-title">Confirm Delete</h1>
      <h2>Are you sure you want to delete this review?</h2>
      <button onClick={confirmDelete} className="yes-delete-review-button">Yes (Delete Review)</button>
      <button onClick={closeModal} className="no-keep-review-button">No (Keep Review)</button>
    </div>
  );
}