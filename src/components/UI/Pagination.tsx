import Pagination, { PaginationProps } from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

interface PaginationRoundedProps extends PaginationProps {
  totalCount: number;
  updatePage: (event: React.ChangeEvent<unknown>, page: number) => void;
}

export const PaginationRounded = ({
  totalCount,
  updatePage,
}: PaginationRoundedProps) => {
  const numberOfPages = Math.ceil(totalCount / 10);

  return (
    <Stack spacing={2}>
      <Pagination count={numberOfPages} shape="rounded" onChange={updatePage} />
    </Stack>
  );
};
