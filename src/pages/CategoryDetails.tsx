import { useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { getCategory } from '../store/slices/categorySlice';
import Layout from '../components/Layout/Layout';
import { Title } from '../components/Layout/Title';
import VocabButton from '../components/UI/VocabButton';
import { CategoryChip } from '../components/UI/CategoryChip';
import { PaginationRounded } from '../components/UI/Pagination';
import { VocabButtonSkeleton } from '../components/UI/VocabButtonSkeleton';

type CategoryParams = {
  id: string;
};

const CategoryDetails = () => {
  const { id } = useParams<CategoryParams>();
  const dispatch = useAppDispatch();
  const { category, totalCount, fetching, fetchError } = useAppSelector(
    state => state.category
  );
  const accessToken = localStorage.getItem('accessToken');

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    dispatch(getCategory({ id, page }));
  };

  useEffect(() => {
    dispatch(getCategory({ id, page: 1 }));
  }, [dispatch, id]);

  if (!accessToken) {
    return <Redirect to="/login" />;
  }

  let mainContent: React.ReactNode;
  if (fetching) {
    mainContent = <VocabButtonSkeleton />;
  } else if (fetchError) {
    mainContent = <Typography>{fetchError}</Typography>;
  } else if (!fetching && category?.vocabularies.length === 0) {
    mainContent = <Typography>No vocabularies found</Typography>;
  } else {
    mainContent = (
      <>
        {category?.vocabularies.map(vocabulary => (
          <VocabButton key={vocabulary._id} vocabulary={vocabulary} />
        ))}
      </>
    );
  }

  return (
    <Layout>
      <Title label="Category" />
      <Box mb={2}>
        {fetching ? (
          <Skeleton
            variant="rectangular"
            width={50}
            height={32}
            sx={{ borderRadius: 4 }}
          />
        ) : (
          <CategoryChip color="secondary" label={category?.name} />
        )}
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          mb: 2,
        }}
      >
        {mainContent}
      </Box>
      <PaginationRounded
        totalCount={totalCount}
        updatePage={handlePageChange}
      />
    </Layout>
  );
};

export default CategoryDetails;
