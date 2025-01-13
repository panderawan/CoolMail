import './EmailRow.css';

import { Checkbox, IconButton } from '@mui/material';

import LabelImportantOutlinedIcon from '@mui/icons-material/LabelImportantOutlined';
import React from 'react';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import { selectMail } from './features/mailSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function EmailRow({ id, title, subject, description, time }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const openMail = () => {
    dispatch(
      selectMail({
        id,
        title,
        subject,
        description,
        time,
      })
    );
    navigate('/mail');
  };

  return (
    <div onClick={openMail} className='emailRow'>
      <div className='emailRow__options'>
        <Checkbox />
        <IconButton>
          <StarBorderOutlinedIcon />
        </IconButton>
        <IconButton>
          <LabelImportantOutlinedIcon />
        </IconButton>
      </div>
      <h3 className='emailRow__title'>{title}</h3>
      <div className='emailRow__message'>
        <h4>
          {subject}
          <span className='emailRow__description'>
            {''} - {description}
          </span>
        </h4>
      </div>
      <p className='emailRow__time'>{time}</p>
    </div>
  );
}

export default EmailRow;
