import FileUpload from '../components/FileUpload';
import { useSelector } from 'react-redux';
import { Typography, Box } from '@mui/material';

export default function HomePage() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <Box>
      {isAuthenticated ? (
        <FileUpload />
      ) : (
        <Typography sx={{ p: 4 }}>Please login to upload and summarize PDFs.</Typography>
      )}
    </Box>
  );
  
}


