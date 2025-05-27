import { Button, Typography, Box, Select, MenuItem, InputLabel } from '@mui/material';
import { useState } from 'react';
import API from '../api/axios';
import { CircularProgress } from '@mui/material';

export default function FileUpload({ isAuthenticated }) {
    const [file, setFile] = useState(null);
    const [model, setModel] = useState('gemini');
    const [summary, setSummary] = useState('');
    const [summaryType, setSummaryType] = useState('single');
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => setFile(e.target.files[0]);

    const handleSummarize = async () => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('model', model);

        setLoading(true);
        setSummary('');
        try {
            const res = await API.post('/pdf/upload', formData);
            setSummary(res.data.summary);
            setSummaryType(res.data.type);
        } catch (err) {
            console.error(err);
            alert('Upload or summarization failed');
        } finally {
            setLoading(false);
        }
    };

    function parseSummary(summaryString) {
        const sectionRegex = /\*\*(.+?):\*\*/g;
        const result = [];
        let match;
        let lastIndex = 0;
        let lastTitle = null;

        while ((match = sectionRegex.exec(summaryString)) !== null) {
            if (lastTitle !== null) {
                const content = summaryString.substring(lastIndex, match.index).trim();
                result.push({ title: lastTitle, content });
            }
            lastTitle = match[1].trim();
            lastIndex = sectionRegex.lastIndex;
        }

        if (lastTitle) {
            result.push({
                title: lastTitle,
                content: summaryString.substring(lastIndex).trim(),
            });
        }

        return result;
    }

    return (
        <Box
            sx={{
                minHeight: '100vh',
                backgroundColor: '#070738',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontFamily: "'Concert One', sans-serif",
                padding: 4,
            }}
        >
            <Box
                sx={{
                    backgroundColor: '#fff',
                    padding: '3rem',
                    borderRadius: '26px',
                    width: '100%',
                    maxWidth: '900px',
                    boxShadow: '0 0 20px rgba(255, 215, 0, 0.7)',
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        textAlign: 'center',
                        color: '#070738',
                        mb: 4,
                        fontWeight: 'bold',
                    }}
                >
                    Upload PDF and Summarize
                </Typography>

                <Box
                    sx={{
                        display: 'flex',
                        gap: 2,
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {/* File Upload */}
                    <Box sx={{ minWidth: 220, width: 220, display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: '5px' }}>
                        <InputLabel
                            sx={{
                                fontWeight: 'bold',
                                color: '#070738',
                                mb: 1,
                                textAlign: 'center',
                            }}
                        >
                            Choose File
                        </InputLabel>
                        <Box
                            sx={{
                                width: '100%',
                                height: '56px',
                                overflow: 'hidden',
                                display: 'flex',
                                alignItems: 'center',
                                px: 2,
                                backgroundColor: '#FFD700',
                                borderRadius: '10px',
                                fontWeight: 'bold',
                                color: '#070738',
                                boxShadow: '0 4px 8px rgba(7, 7, 56, 0.5)',
                            }}
                        >
                            <input
                                type="file"
                                accept=".pdf"
                                onChange={handleFileChange}
                                disabled={!isAuthenticated}
                                style={{
                                    cursor: 'pointer',
                                    fontWeight: 'bold',
                                    fontSize: '1rem',
                                    width: '100%',
                                }}
                            />
                        </Box>
                    </Box>

                    {/* Model Selection */}
                    <Box sx={{ minWidth: 220, width: 220, marginLeft: '5px' }}>
                        <InputLabel
                            sx={{
                                fontWeight: 'bold',
                                color: '#070738',
                                mb: 1,
                                textAlign: 'center',
                            }}
                        >
                            Select Model
                        </InputLabel>
                        <Select
                            value={model}
                            onChange={(e) => setModel(e.target.value)}
                            disabled={!isAuthenticated}
                            sx={{
                                backgroundColor: '#FFD700',
                                borderRadius: '10px',
                                fontWeight: 'bold',
                                boxShadow: '0 4px 8px rgba(7, 7, 56, 0.5)',
                                color: '#070738',
                                height: '56px',
                                width: '100%',
                                '& .MuiSelect-icon': { color: '#070738' },
                            }}
                        >
                            <MenuItem value="gemini">Gemini</MenuItem>
                            <MenuItem value="ollama">Ollama (Llama 3.2)</MenuItem>
                            <MenuItem value="gemini_ollama">Gemini + Ollama</MenuItem>
                        </Select>
                    </Box>
                </Box>

                {/* Summarize Button */}
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
                    <Button
                        variant="contained"
                        onClick={handleSummarize}
                        disabled={!file || !isAuthenticated}
                        sx={{
                            padding: '12px 30px',
                            backgroundColor: '#070738',
                            color: '#FFD700',
                            fontSize: '1rem',
                            fontWeight: 'bold',
                            borderRadius: '18px',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease-in-out',
                            boxShadow: '0 4px 10px rgba(7, 7, 56, 0.5)',
                            '&:hover': {
                                backgroundColor: '#FFD700',
                                color: '#070738',
                            },
                        }}
                    >
                        Summarize
                    </Button>

                    {loading && (
                        <Box sx={{ mt: 2, textAlign: 'center' }}>
                            <CircularProgress sx={{ color: '#FFD700' }} />
                            <Typography
                                sx={{
                                    mt: 1,
                                    fontWeight: 'bold',
                                    color: '#070738',
                                    fontFamily: "'Concert One', sans-serif",
                                }}
                            >
                                Summarizing...
                            </Typography>
                        </Box>
                    )}
                </Box>

                {/* Summary Display */}
                {summary && (
                    <Box
                        mt={6}
                        sx={{
                            backgroundColor: '#e6f0ff',
                            borderRadius: '20px',
                            padding: 4,
                            textAlign: 'center',
                            boxShadow: '0 0 12px rgba(7, 7, 56, 0.2)',
                        }}
                    >
                        <Typography variant="h4" sx={{ color: '#070738', mb: 3 }}>
                            Summary
                        </Typography>

                        {/* If it's structured */}
                        {summaryType === 'single' || /\*\*(.+?):\*\*/.test(summary.result || summary) ? (
                            parseSummary(summary.result || summary).map(({ title, content }) => (
                                <Box key={title} mb={4}>
                                    <Typography
                                        variant="subtitle1"
                                        fontWeight="bold"
                                        sx={{
                                            color: '#070738',
                                            backgroundColor: '#FFD700',
                                            borderRadius: '6px',
                                            px: 2,
                                            py: 1,
                                            display: 'inline-block',
                                            mb: 1,
                                        }}
                                    >
                                        {title}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            color: '#070738',
                                            maxWidth: '700px',
                                            margin: '0 auto',
                                            textAlign: 'center',
                                        }}
                                    >
                                        {content}
                                    </Typography>
                                </Box>
                            ))
                        ) : (
                            <Typography
                                sx={{
                                    color: '#070738',
                                    maxWidth: '700px',
                                    margin: '0 auto',
                                    whiteSpace: 'pre-line',
                                    textAlign: 'center',
                                }}
                            >
                                {summary.result || summary}
                            </Typography>
                        )}

                    </Box>
                )}

            </Box>
        </Box>
    );
}
