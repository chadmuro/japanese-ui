import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import Box from '@mui/material/Box';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import Layout from '../components/Layout/Layout';
import {
  getCategories,
  resetCategoryState,
} from '../store/slices/categorySlice';
import CreateCategoryForm from '../components/forms/Category/CreateCategoryForm';
import { Title } from '../components/Layout/Title';
import { AlertSnackbar } from '../components/UI/AlertSnackbar';
import { CategoryChip } from '../components/UI/CategoryChip';

const Category = () => {
  const history = useHistory();
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
        dispatch(resetCategoryState());
      };
    }
  }, [posted, postError, dispatch]);

  const handleChipClick = (id: string) => {
    history.push(`/category/${id}`);
  };

  return (
    <Layout>
      <Title label="Category" />
      <CreateCategoryForm posting={posting} posted={posted} />
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
            <CategoryChip
              key={category._id}
              color="secondary"
              label={category.name}
              onClick={() => handleChipClick(category._id)}
            />
          ))}
      </Box>
    </Layout>
  );
};

export default Category;
