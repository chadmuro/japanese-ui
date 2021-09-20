import { useState, useEffect } from 'react';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import Layout from '../components/Layout/Layout';
import {
  getCategories,
  resetCategoryState,
} from '../store/slices/categorySlice';
import CreateCategoryForm from '../components/forms/CreateCategoryForm';
import { Title } from '../components/Layout/Title';
import { AlertSnackbar } from '../components/UI/AlertSnackbar';

const Category = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const dispatch = useAppDispatch();
  const { categories, fetching, fetchError, posting, posted, postError } =
    useAppSelector(state => state.category);
  const resetState = () => dispatch(resetCategoryState());

  console.log(posting, posted, postError);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    if (posted) {
      dispatch(getCategories());
    }
    if (posted || postError) {
      setOpenSnackbar(true);

      return () => {
        console.log('cleanup run');
        dispatch(resetCategoryState());
      };
    }
  }, [posted, postError, dispatch]);

  return (
    <Layout>
      <Title label="Category" />
      <CreateCategoryForm posting={posting} />
      <AlertSnackbar
        open={openSnackbar}
        setOpen={setOpenSnackbar}
        message={postError ? postError : 'New category created'}
        severity={postError ? 'error' : 'success'}
        resetState={resetState}
      />
      <Container>
        <Grid
          container
          spacing={2}
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
