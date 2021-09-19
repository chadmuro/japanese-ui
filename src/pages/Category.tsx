import { useEffect } from 'react';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import Layout from '../components/Layout/Layout';
import { getCategories } from '../store/slices/categorySlice';
import CreateCategoryForm from '../components/forms/CreateCategoryForm';
import { Title } from '../components/Layout/Title';

const Category = () => {
  const dispatch = useAppDispatch();
  const { categories, fetching, error } = useAppSelector(
    state => state.category
  );

  console.log(categories, fetching, error);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <Layout>
      <Title label="Category" />
      <CreateCategoryForm />
      <Container>
        <Grid
          container
          spacing={3}
          justifyContent="center"
          sx={{
            mt: 4,
          }}
        >
          {categories &&
            categories.map(category => (
              <Grid key={category._id} item>
                <Chip color="secondary" label={category.name} />
              </Grid>
            ))}
        </Grid>
      </Container>
    </Layout>
  );
};

export default Category;
