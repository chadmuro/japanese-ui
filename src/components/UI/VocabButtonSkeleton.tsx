import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

const VocabButtonSkeleton = () => {
  const tenItems = Array.from(Array(10).keys());

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        mb: 2,
      }}
    >
      {tenItems.map(item => (
        <Skeleton
          key={item}
          variant="rectangular"
          width={200}
          height={63}
          sx={{ mb: 2, mx: 1, borderRadius: '8px' }}
        />
      ))}
    </Box>
  );
};

export default VocabButtonSkeleton;
