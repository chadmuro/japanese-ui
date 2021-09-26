import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import Layout from '../components/Layout/Layout';
import {
  getCategories,
  resetCategoryState,
} from '../store/slices/categorySlice';
import CreateCategoryForm from '../components/forms/CreateCategoryForm';
import { Title } from '../components/Layout/Title';
import { AlertSnackbar } from '../components/UI/AlertSnackbar';
import { CategoryChip } from '../components/UI/CategoryChip';

const Category = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const dispatch = useAppDispatch();
  const { categories, fetching, fetchError, posting, posted, postError } =
    useAppSelector(state => state.category);
  const resetState = () => dispatch(resetCategoryState());

  console.log(fetching, fetchError);

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
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          pt: 4,
        }}
      >
        {categories &&
          categories.map(category => (
            <CategoryChip color="secondary" label={category.name} />
          ))}
      </Box>
    </Layout>
  );
};

export default Category;
