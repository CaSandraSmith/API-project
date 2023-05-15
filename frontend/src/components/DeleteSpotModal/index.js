import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteASpot } from "../../store/spots";
import './DeleteSpotModal.css'

export default function DeleteSpotModal({spot}) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const confirmDelete = (e) => {
    e.preventDefault();
    dispatch(deleteASpot(spot.id)).then(closeModal)
  };

  return (
    <div className="delete-spot-modal">
      <h1 className="delete-modal-title">Confirm Delete</h1>
      <h2>Are you sure you want to remove this spot from the listings?</h2>
      <button onClick={confirmDelete} className="yes-delete-spot-button">Yes (Delete Spot)</button>
      <button onClick={closeModal} className="no-keep-spot-button">No (Keep Spot)</button>
    </div>
  );
}