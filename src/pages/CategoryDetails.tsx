import { useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { getCategory } from '../store/slices/categorySlice';
import Layout from '../components/Layout/Layout';
import { Title } from '../components/Layout/Title';
import VocabButton from '../components/UI/VocabButton';
import { CategoryChip } from '../components/UI/CategoryChip';

type CategoryParams = {
  id: string;
};

const CategoryDetails = () => {
  const { id } = useParams<CategoryParams>();
  const dispatch = useAppDispatch();
  const { category, fetching, fetchError } = useAppSelector(
    state => state.category
  );
  const { user } = useAppSelector(state => state.user);

  useEffect(() => {
    dispatch(getCategory({ id }));
  }, [dispatch, id]);

  console.log(fetching, fetchError);

  if (!user) {
    return <Redirect to="/login" />;
  }

  return (
    <Layout>
      <Title label="Category" />
      <CategoryChip color="secondary" label={category?.name} />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          mt: 4,
        }}
      >
        {category &&
          category.vocabularies.map(vocabulary => (
            <VocabButton key={vocabulary._id} vocabulary={vocabulary} />
          ))}
      </Box>
    </Layout>
  );
};

export default CategoryDetails;
