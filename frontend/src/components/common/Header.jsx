import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../auth/authSlice';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <Box sx={{ margin: '16px', borderRadius: '16px', overflow: 'hidden' }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: '#FFD700',
          fontFamily: "'Concert One', sans-serif",
          color: '#070738',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography
            variant="h4"
            sx={{
              fontFamily: "'Titan One', cursive",
              color: '#070738',
            }}
          >
            📄 PDF Summarizer
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            {!isAuthenticated ? (
              <>
                <Button
                  onClick={() => navigate('/login')}
                  sx={{
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '1.2rem',
                    fontFamily: "'Concert One', sans-serif",
                    backgroundColor: '#070738',
                    color: '#FFD700',
                    borderRadius: '16px',
                    px: 3,
                    py: 1,
                    '&:hover': {
                      backgroundColor: '#000022',
                      color: '#FFF176',
                    },
                  }}
                >
                  Login
                </Button>
                <Button
                  onClick={() => navigate('/register')}
                  sx={{
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '1.2rem',
                    fontFamily: "'Concert One', sans-serif",
                    backgroundColor: '#070738',
                    color: '#FFD700',
                    borderRadius: '16px',
                    px: 3,
                    py: 1,
                    '&:hover': {
                      backgroundColor: '#000022',
                      color: '#FFF176',
                    },
                  }}
                >
                  Register
                </Button>
              </>
            ) : (
              <Button
                onClick={handleLogout}
                sx={{
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '1.2rem',
                  fontFamily: "'Concert One', sans-serif",
                  backgroundColor: '#070738',
                  color: '#FFD700',
                  borderRadius: '20px',
                  px: 3,
                  py: 1,
                  '&:hover': {
                    backgroundColor: '#000022',
                    color: '#FFF176',
                  },
                }}
              >
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
