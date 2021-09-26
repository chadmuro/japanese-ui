import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Vocabulary } from '../../constants/types';

interface VocabButtonProps {
  vocabulary: Vocabulary;
}

const VocabButton = ({ vocabulary }: VocabButtonProps) => {
  return (
    <Link
      to={`/vocabulary/${vocabulary._id}`}
      style={{ textDecoration: 'none' }}
    >
      <Button variant="contained" color="primary" sx={{ mb: 2, mx: 1 }}>
        <Box pr={4}>
          <Typography variant="caption">{vocabulary.reading}</Typography>
          <Typography variant="h6">{vocabulary.japanese}</Typography>
        </Box>
        <Typography
          variant="h6"
          sx={{
            textTransform: 'lowercase',
          }}
        >
          {vocabulary.english}
        </Typography>
      </Button>
    </Link>
  );
};

export default VocabButton;
