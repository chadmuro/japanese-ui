import { useHistory } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import { CategoryChip } from './CategoryChip';
import { Vocabulary } from '../../constants/types';

interface VocabDetailsProps {
  vocabulary: Vocabulary | null;
  fetching: boolean;
}

const VocabDetails = ({ vocabulary, fetching }: VocabDetailsProps) => {
  const history = useHistory();
  const fiveItems = Array.from(Array(5).keys());

  const handleChipClick = (id: string) => {
    history.push(`/category/${id}`);
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '500px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: '1px white solid',
        borderRadius: 4,
        py: 4,
        px: 2,
      }}
    >
      <Typography variant="caption">
        {fetching ? <Skeleton width={100} /> : vocabulary?.reading}
      </Typography>
      <Typography variant="h4">
        {fetching ? <Skeleton width={200} /> : vocabulary?.japanese}
      </Typography>
      <Typography
        variant="h6"
        sx={{
          textTransform: 'lowercase',
        }}
      >
        {fetching ? <Skeleton width={100} /> : vocabulary?.english}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          pt: 4,
        }}
      >
        {fetching
          ? fiveItems.map(item => (
              <Skeleton
                key={item}
                variant="rectangular"
                width={50}
                height={32}
                sx={{ borderRadius: 4, mx: 1, my: 0.5, px: 0.5 }}
              />
            ))
          : vocabulary?.categories.map(category => (
              <CategoryChip
                key={category._id}
                color="secondary"
                label={category.name}
                onClick={() => handleChipClick(category._id)}
              />
            ))}
      </Box>
    </Box>
  );
};

export default VocabDetails;
