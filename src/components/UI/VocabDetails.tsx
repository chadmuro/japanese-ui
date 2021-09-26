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
          ? [...Array(5)].map((i: any) => (
              <Skeleton
                variant="rectangular"
                width={50}
                height={20}
                sx={{ borderRadius: 4, mx: 1, my: 0.5, px: 0.5 }}
              />
            ))
          : vocabulary?.categories.map(category => (
              <CategoryChip
                key={category._id}
                color="secondary"
                label={category.name}
              />
            ))}
      </Box>
    </Box>
  );
};

export default VocabDetails;
