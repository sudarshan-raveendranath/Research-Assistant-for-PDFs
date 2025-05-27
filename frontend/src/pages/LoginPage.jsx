import { Box, Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import API from '../api/axios';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../auth/authSlice';
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

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorModal, setErrorModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const res = await API.post('/auth/login', { username, password });
      dispatch(loginSuccess({ token: res.data.access_token, user: username }));
      navigate('/');
    } catch (err) {
      setErrorModal(true);
    }
  };

  const closeModal = () => setErrorModal(false);

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#070738",
        fontFamily: "'Concert One', sans-serif",
      }}
    >
      {/* Animated background circles */}
      {[
        { top: '45%', left: '10%', size: 300, color: '#FFD70020' },
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
          backgroundColor: "#fff",
          padding: "3rem",
          borderRadius: "26px",
          width: "100%",
          maxWidth: "400px",
          boxShadow: "0 0 20px rgba(255, 215, 0, 0.7)",
          zIndex: 1,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            textAlign: "center",
            color: "#070738",
            mb: 4,
            fontFamily: "'Concert One', sans-serif",
          }}
        >
          Login
        </Typography>

        <TextField
          fullWidth
          label="Username"
          variant="filled"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{
            mb: 2,
            backgroundColor: "#FFD700",
            borderRadius: "18px",
            input: { color: "#070738", fontWeight: 'bold' },
            '& .MuiFilledInput-root': {
              borderRadius: '18px',
              boxShadow: "0 4px 8px rgba(7, 7, 56, 0.5)",
            },
          }}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="filled"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{
            mb: 3,
            backgroundColor: "#FFD700",
            borderRadius: "18px",
            input: { color: "#070738", fontWeight: 'bold' },
            '& .MuiFilledInput-root': {
              borderRadius: '18px',
              boxShadow: "0 4px 8px rgba(7, 7, 56, 0.5)",
            },
          }}
        />
        <Button
          fullWidth
          onClick={handleSubmit}
          sx={{
            padding: "12px",
            backgroundColor: "#070738",
            color: "#FFD700",
            fontSize: "1rem",
            fontWeight: "bold",
            borderRadius: "18px",
            cursor: "pointer",
            transition: "all 0.3s ease-in-out",
            boxShadow: "0 4px 10px rgba(7, 7, 56, 0.5)",
            '&:hover': {
              backgroundColor: "#FFD700",
              color: "#070738",
            },
          }}
        >
          Login
        </Button>

        <Typography
          sx={{
            textAlign: "center",
            mt: 2,
            color: "#070738",
            fontSize: "1rem",
          }}
        >
          Don't have an account?{" "}
          <span
            style={{ color: "#070738", cursor: "pointer", fontWeight: "bold" }}
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </Typography>

        {errorModal && (
          <Box
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 999,
            }}
          >
            <Box
              sx={{
                backgroundColor: "#fff",
                padding: "2rem",
                borderRadius: "15px",
                width: "300px",
                textAlign: "center",
                boxShadow: "0 0 20px rgba(255, 215, 0, 0.7)",
              }}
            >
              <Typography sx={{ color: "#070738", fontSize: "1.2rem", mb: 2 }}>
                Invalid credentials
              </Typography>
              <Button
                onClick={closeModal}
                sx={{
                  padding: "10px 20px",
                  backgroundColor: "#070738",
                  color: "#FFD700",
                  borderRadius: "10px",
                  fontWeight: "bold",
                  transition: "all 0.3s ease-in-out",
                  boxShadow: "0 4px 10px rgba(7, 7, 56, 0.5)",
                  '&:hover': {
                    backgroundColor: "#FFD700",
                    color: "#070738",
                  },
                }}
              >
                OK
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}
