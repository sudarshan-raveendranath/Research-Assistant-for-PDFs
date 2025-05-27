import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Collapse,
  IconButton,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import API from '../api/axios';

export default function UserSummaries() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [summaries, setSummaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) return;
    const fetchSummaries = async () => {
      try {
        const res = await API.get('/summaries/pdfs');
        setSummaries(res.data);
      } catch (err) {
        console.error('Error fetching summaries:', err);
        alert('Failed to fetch summaries');
      } finally {
        setLoading(false);
      }
    };
    fetchSummaries();
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#070738',
          color: '#FFD700',
          fontSize: '1.5rem',
        }}
      >
        Please log in to view your summaries.
      </Box>
    );
  }

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
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
        padding: 4,
        fontFamily: "'Concert One', sans-serif",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          color: '#FFD700',
          textAlign: 'center',
          mb: 4,
          fontWeight: 'bold',
        }}
      >
        Your PDF Summaries
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress sx={{ color: '#FFD700' }} />
        </Box>
      ) : summaries.length === 0 ? (
        <Typography sx={{ color: '#FFD700', textAlign: 'center', mt: 4 }}>
          No summaries found.
        </Typography>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {summaries.map((pdf) => {
            const isExpanded = expandedId === pdf.id;
            const parsedSummary = parseSummary(pdf.summary);

            return (
              <Grid item xs={12} sm={6} md={4} key={pdf.id}>
                <Card
                  sx={{
                    backgroundColor: '#fff',
                    borderRadius: '16px',
                    padding: 2,
                    boxShadow: '0 0 20px rgba(255, 215, 0, 0.5)',
                    cursor: 'pointer',
                  }}
                  onClick={() => toggleExpand(pdf.id)}
                >
                  <CardContent>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{ color: '#070738', fontWeight: 'bold' }}
                      >
                        {pdf.filename}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleExpand(pdf.id);
                        }}
                        aria-label={isExpanded ? 'Collapse' : 'Expand'}
                      >
                        {isExpanded ? (
                          <ExpandLessIcon sx={{ color: '#070738' }} />
                        ) : (
                          <ExpandMoreIcon sx={{ color: '#070738' }} />
                        )}
                      </IconButton>
                    </Box>

                    <Typography
                      variant="subtitle2"
                      sx={{
                        color: '#FFD700',
                        backgroundColor: '#070738',
                        borderRadius: '6px',
                        px: 1,
                        py: 0.5,
                        display: 'inline-block',
                        mb: 1,
                        userSelect: 'none',
                      }}
                    >
                      {pdf.model_used}
                    </Typography>

                    <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                      {parsedSummary.length > 0 ? (
                        parsedSummary.map(({ title, content }) => (
                          <Box key={title} mb={2}>
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
                                whiteSpace: 'pre-line',
                                fontSize: '0.95rem',
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
                            whiteSpace: 'pre-line',
                            fontSize: '0.95rem',
                          }}
                        >
                          {pdf.summary}
                        </Typography>
                      )}

                      <Typography
                        variant="caption"
                        sx={{ color: '#666', display: 'block', mt: 1 }}
                      >
                        Uploaded on: {new Date(pdf.uploaded_at).toLocaleString()}
                      </Typography>
                    </Collapse>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Box>
  );
}
