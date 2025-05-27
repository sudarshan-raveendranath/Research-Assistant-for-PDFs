import { Box, Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const circleVariants = {
  animate: {
    y: [0, 20, 0],
    x: [0, 10, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await API.post('/auth/register', { username, password });
      alert('Registration successful!');
      navigate('/login');
    } catch (err) {
      alert('Username already exists');
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#070738',
        fontFamily: "'Concert One', sans-serif",
        px: 2,
      }}
    >
      {[{ top: '45%', left: '10%', size: 300, color: '#FFD70020' },
        { top: '5%', right: '20%', size: 400, color: '#00FFFF30' },
        { bottom: '70%', left: '20%', size: 190, color: '#FF69B430' },
        { bottom: '10%', right: '20%', size: 190, color: '#ADFF2F25' },
        { top: '45%', left: '45%', size: 150, color: '#FF149330' },
      ].map((circle, index) => (
        <motion.div
          key={index}
          variants={circleVariants}
          animate="animate"
          style={{
            position: 'absolute',
            width: circle.size,
            height: circle.size,
            borderRadius: '50%',
            background: circle.color,
            top: circle.top,
            bottom: circle.bottom,
            left: circle.left,
            right: circle.right,
            zIndex: 0,
          }}
        />
      ))}

      <Box
        sx={{
          backgroundColor: '#fff',
          padding: '3rem',
          borderRadius: '26px',
          width: '100%',
          maxWidth: '400px',
          boxShadow: '0 0 20px rgba(255, 215, 0, 0.7)',
          zIndex: 1,
        }}
      >
        <Typography
          variant="h3"
          component="h2"
          align="center"
          sx={{ color: '#070738', mb: 3, fontFamily: "'Concert One', sans-serif" }}
        >
          Register
        </Typography>

        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{
            mb: 2,
            borderRadius: '18px',
            '& .MuiOutlinedInput-root': {
              borderRadius: '18px',
              backgroundColor: '#FFD700',
              color: '#070738',
              boxShadow: '0 4px 8px rgba(7, 7, 56, 0.5)',
              '& fieldset': {
                borderColor: '#070738',
              },
              '&:hover fieldset': {
                borderColor: '#070738',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#070738',
              },
            },
            input: {
              color: '#070738',
              fontSize: '1rem',
              fontFamily: "'Concert One', sans-serif",
            },
          }}
        />

        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{
            mb: 3,
            borderRadius: '18px',
            '& .MuiOutlinedInput-root': {
              borderRadius: '18px',
              backgroundColor: '#FFD700',
              color: '#070738',
              boxShadow: '0 4px 8px rgba(7, 7, 56, 0.5)',
              '& fieldset': {
                borderColor: '#070738',
              },
              '&:hover fieldset': {
                borderColor: '#070738',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#070738',
              },
            },
            input: {
              color: '#070738',
              fontSize: '1rem',
              fontFamily: "'Concert One', sans-serif",
            },
          }}
        />

        <Button
          variant="contained"
          fullWidth
          onClick={handleSubmit}
          sx={{
            padding: '12px',
            backgroundColor: '#070738',
            color: '#FFD700',
            fontSize: '1rem',
            fontWeight: 'bold',
            borderRadius: '18px',
            boxShadow: '0 4px 10px rgba(7, 7, 56, 0.5)',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              backgroundColor: '#FFD700',
              color: '#070738',
            },
            fontFamily: "'Concert One', sans-serif",
          }}
        >
          Register
        </Button>
      </Box>
    </Box>
  );
}
