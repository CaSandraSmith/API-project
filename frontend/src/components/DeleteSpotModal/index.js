import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteASpot } from "../../store/spots";

export default function DeleteSpotModal() {
  const dispatch = useDispatch();
  const { setModalContent, setOnModalClose, closeModal } = useModal();


  // const confirmDelete = (e) => {
  //   e.preventDefault();
  //   return dispatch(deleteASpot(spotId))
  //     .then(closeModal)
  // };

  return (
    <>
      <h1>Confirm Delete</h1>
      <h2>Are you sure you want to remove this spot from the listings?</h2>
      <button >Yes (Delete Spot)</button>
      <button onClick={closeModal}>No (Keep Spot)</button>
    </>
  );
}