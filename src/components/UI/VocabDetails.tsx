import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import { Vocabulary } from '../../constants/types';

interface VocabDetailsProps {
  vocabulary: Vocabulary | null;
  fetching: boolean;
}

const VocabDetails = ({ vocabulary, fetching }: VocabDetailsProps) => {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {fetching && <div>Loading</div>}
      {vocabulary && !fetching && (
        <>
          <Typography variant="caption">{vocabulary.reading}</Typography>
          <Typography variant="h4">{vocabulary.japanese}</Typography>
          <Typography
            variant="h6"
            sx={{
              textTransform: 'lowercase',
            }}
          >
            {vocabulary.english}
          </Typography>
          <Box
            sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}
          >
            {vocabulary.categories &&
              vocabulary.categories.map(category => (
                <Chip
                  key={category._id}
                  color="secondary"
                  label={category.name}
                />
              ))}
          </Box>
        </>
      )}
    </Box>
  );
};

export default VocabDetails;
