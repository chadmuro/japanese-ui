import Chip, { ChipProps } from '@mui/material/Chip';

export const CategoryChip = (props: ChipProps) => {
  return (
    <Chip
      {...props}
      sx={{
        mx: 1,
        my: 0.5,
        px: 0.5,
      }}
    />
  );
};
