import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { reviewDeletions } from "../../store/reviews";

export default function DeleteReviewModal({review}) {
  console.log("review in modal", review)
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const confirmDelete = (e) => {
    e.preventDefault();
    dispatch(reviewDeletions(review.id)).then(closeModal)
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