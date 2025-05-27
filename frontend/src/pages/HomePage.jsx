import React from 'react';
import FileUpload from '../components/FileUpload';
import ChatBotPopup from '../components/ChatBotPopup'; // Adjust path
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';

export default function HomePage() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <Box>
      <FileUpload isAuthenticated={isAuthenticated} />
      <ChatBotPopup disabled={!isAuthenticated} />
    </Box>
  );
}
