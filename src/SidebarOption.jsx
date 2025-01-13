import './SidebarOption.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function SidebarOption({ Icon, title, number, selected }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <div className={`sidebarOption ${selected && 'sidebarOption--active'}`} onClick={handleClick}>
      <Icon />
      <h3>{title}</h3>
      {number && <p>{number}</p>}
    </div>
  );
}

export default SidebarOption;