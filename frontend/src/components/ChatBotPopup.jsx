import React, { useState, useRef, useEffect } from 'react';
import {
    Box,
    Fab,
    Paper,
    Typography,
    IconButton,
    TextField,
    Button,
    Tooltip,
    CircularProgress
} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { FaRobot, FaUser } from 'react-icons/fa';
import API from '../api/axios';

const ChatBotPopup = ({ disabled = false }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [showScrollToBottom, setShowScrollToBottom] = useState(false);
    const messagesEndRef = useRef(null);
    const messagesContainerRef = useRef(null);

    const toggleChat = () => {
        if (!disabled) setIsOpen(!isOpen);
    };

    const prepareChatHistory = () => {
        const pairs = [];
        for (let i = 0; i < messages.length; i += 2) {
            const userMsg = messages[i]?.type === 'user' ? messages[i].text : '';
            const botMsg = messages[i + 1]?.type === 'bot' ? messages[i + 1].text : '';
            if (userMsg) {
                pairs.push([userMsg, botMsg || '']);
            }
        }
        return pairs;
    };

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = { type: 'user', text: input };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setInput('');
        setLoading(true);

        try {
            const response = await API.post('/api/chat', {
                question: input,
                chat_history: prepareChatHistory(),
            });

            const data = response.data;
            const botMessage = { type: 'bot', text: data.answer || "Sorry, I couldn't get an answer." };
            setMessages([...newMessages, botMessage]);
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || 'Unknown error';
            setMessages([...newMessages, { type: 'bot', text: `Error: ${errorMessage}` }]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const handleScroll = () => {
        const container = messagesContainerRef.current;
        if (container) {
            const atBottom = container.scrollHeight - container.scrollTop <= container.clientHeight + 50;
            setShowScrollToBottom(!atBottom);
        }
    };

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
        setShowScrollToBottom(false);
    };

    return (
        <>
            <Tooltip title={disabled ? "Please login to chat" : "Chat with Assistant"}>
                <span>
                    <Fab
                        onClick={toggleChat}
                        sx={{
                            position: 'fixed',
                            bottom: 20,
                            right: 20,
                            backgroundColor: '#FFD700',
                            color: '#070738',
                            boxShadow: '0 4px 12px rgba(7, 7, 56, 0.6)',
                            fontWeight: 'bold',
                            '&:hover': {
                                backgroundColor: '#070738',
                                color: '#FFD700',
                            },
                            opacity: disabled ? 0.5 : 1,
                            pointerEvents: disabled ? 'none' : 'auto',
                            zIndex: 1000,
                        }}
                    >
                        <ChatIcon />
                    </Fab>
                </span>
            </Tooltip>

            {!disabled && isOpen && (
                <Paper
                    elevation={6}
                    sx={{
                        position: 'fixed',
                        bottom: 80,
                        right: 20,
                        width: 360,
                        height: 520,
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: '20px',
                        overflow: 'hidden',
                        fontFamily: "'Concert One', sans-serif",
                        zIndex: 1000,
                        boxShadow: '0 0 20px rgba(255, 215, 0, 0.7)',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            p: 2,
                            bgcolor: '#070738',
                            color: '#FFD700',
                        }}
                    >
                        <Typography variant="h6">AI Chatbot</Typography>
                        <IconButton onClick={toggleChat} size="small" sx={{ color: '#FFD700' }}>
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    <Box
                        ref={messagesContainerRef}
                        onScroll={handleScroll}
                        sx={{
                            flex: 1,
                            p: 2,
                            overflowY: 'auto',
                            bgcolor: '#f9f9f9',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1,
                        }}
                    >
                        {messages.map((msg, index) => (
                            <Box
                                key={index}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    flexDirection: msg.type === 'user' ? 'row-reverse' : 'row',
                                    gap: 1,
                                }}
                            >
                                {msg.type === 'bot' ? <FaRobot size={20} color="#070738" /> : <FaUser size={20} color="#FFD700" />}
                                <Paper
                                    elevation={3}
                                    sx={{
                                        p: 1.5,
                                        backgroundColor: msg.type === 'bot' ? '#e6f0ff' : '#fff7cc',
                                        borderRadius: '12px',
                                        maxWidth: '80%',
                                        fontWeight: 'bold',
                                        color: '#070738',
                                        boxShadow: '0 2px 6px rgba(7, 7, 56, 0.3)',
                                    }}
                                >
                                    {msg.text}
                                </Paper>
                            </Box>
                        ))}
                        <div ref={messagesEndRef} />
                    </Box>

                    {showScrollToBottom && (
                        <Fab
                            size="small"
                            onClick={scrollToBottom}
                            sx={{
                                position: 'absolute',
                                bottom: 75,
                                right: 20,
                                backgroundColor: '#FFD700',
                                color: '#070738',
                                boxShadow: '0 4px 10px rgba(7, 7, 56, 0.4)',
                                '&:hover': {
                                    backgroundColor: '#070738',
                                    color: '#FFD700',
                                },
                            }}
                        >
                            <KeyboardArrowDownIcon />
                        </Fab>
                    )}

                    <Box sx={{ p: 2, borderTop: '1px solid #ccc', bgcolor: '#fff' }}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Ask something..."
                            sx={{
                                bgcolor: '#fff',
                                borderRadius: '8px',
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': { borderColor: '#070738' },
                                    '&:hover fieldset': { borderColor: '#FFD700' },
                                    '&.Mui-focused fieldset': { borderColor: '#FFD700' },
                                },
                            }}
                        />
                        <Button
                            variant="contained"
                            onClick={handleSend}
                            disabled={loading || !input}
                            sx={{
                                mt: 1,
                                width: '100%',
                                backgroundColor: '#070738',
                                color: '#FFD700',
                                fontWeight: 'bold',
                                borderRadius: '12px',
                                '&:hover': {
                                    backgroundColor: '#FFD700',
                                    color: '#070738',
                                },
                            }}
                        >
                            {loading ? <CircularProgress size={20} sx={{ color: '#FFD700' }} /> : 'Send'}
                        </Button>
                    </Box>
                </Paper>
            )}
        </>
    );
};

export default ChatBotPopup;
