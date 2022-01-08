import Skeleton from '@mui/material/Skeleton';

export const VocabButtonSkeleton = () => {
  const tenItems = Array.from(Array(10).keys());

  return (
    <>
      {tenItems.map(item => (
        <Skeleton
          key={item}
          variant="rectangular"
          width={200}
          height={63}
          sx={{ mb: 2, mx: 1, borderRadius: 2 }}
        />
      ))}
    </>
  );
};
