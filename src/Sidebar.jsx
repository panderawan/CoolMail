import './Sidebar.css';

import { Button, IconButton } from '@mui/material';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AddIcon from '@mui/icons-material/Add';
import DuoIcon from '@mui/icons-material/Duo';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InboxIcon from '@mui/icons-material/Inbox';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import NoteIcon from '@mui/icons-material/Note';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import StarIcon from '@mui/icons-material/Star';
import { collection, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import SidebarOption from './SidebarOption';
import {
  openSendMessage
} from './features/mailSlice';
import { db } from './firebase';

function Sidebar() {
  const dispatch = useDispatch();
  const [emailCount, setEmailCount] = useState(0);

  useEffect(() => {
    const coll = collection(db, 'emails');
    const unsubscribe = onSnapshot(coll, (snapshot) => {
      setEmailCount(snapshot.size);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className='sidebar'>
      <Button
        className='sidebar__compose'
        startIcon={<AddIcon fontSize='large' />}
        onClick={() => dispatch(openSendMessage())}
      >
        Nouveau Message
      </Button>

      <SidebarOption
        Icon={InboxIcon}
        title='Boite de réception'
        number={emailCount}
        selected={true}
      />
      <SidebarOption Icon={StarIcon} title='Messages Suivis' />
      <SidebarOption Icon={AccessTimeIcon} title='En Attente' />
      <SidebarOption Icon={LabelImportantIcon} title='Important' />
      <SidebarOption Icon={NoteIcon} title='Brouillons' />
      <SidebarOption Icon={ExpandMoreIcon} title='Plus' />

      <div className='sidebar__footer'>
        <div className='sidebar__footerIcons'>
          <IconButton>
            <PersonIcon />
          </IconButton>
          <IconButton>
            <DuoIcon />
          </IconButton>
          <IconButton>
            <PhoneIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;