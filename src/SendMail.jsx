import "./SendMail.css";

import { addDoc, serverTimestamp } from "firebase/firestore";
import { dbEmailRef } from "./firebase.js";

import { Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import { closeSendMessage } from "./features/mailSlice";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

function SendMail() {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    console.log("the formData is :" + formData);

    addDoc(dbEmailRef, {
      to: formData.to,
      subject: formData.subject,
      message: formData.message,
      timestamp: serverTimestamp(),
    });

    dispatch(closeSendMessage());
  };

  return (
    <div className='sendMail'>
      <div className='sendMail__header'>
        <h3>Nouveau Message</h3>
        <CloseIcon
          className='sendMail__close'
          onClick={() => dispatch(closeSendMessage())}
        />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          name='to'
          placeholder='À'
          type='email'
          {...register("to", { required: true })}
        />
        {errors.to && <p className='sendMail__error'>To is required!</p>}
        <input
          name='subject'
          placeholder='Sujet'
          type='text'
          {...register("subject", { required: true })}
        />
        {errors.subject && (
          <p className='sendMail__error'>Subject is required!</p>
        )}
        <input
          name='message'
          className='sendMail__message'
          placeholder='Message...'
          type='text'
          {...register("message", { required: true })}
        />
        {errors.message && (
          <p className='sendMail__error'>Message is required!</p>
        )}
        <div className='sendMail__options'>
          <Button
            className='sendMail__send'
            variant='contained'
            color='primary'
            type='submit'
          >
            Envoyer
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SendMail;
