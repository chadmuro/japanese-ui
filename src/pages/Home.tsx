import { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { getCategories } from '../store/slices/categorySlice';
import { resetVocabularyState } from '../store/slices/vocabularySlice';
import CreateVocabularyForm from '../components/forms/Vocabulary/CreateVocabularyForm';
import { Title } from '../components/Layout/Title';
import { AlertSnackbar } from '../components/UI/AlertSnackbar';

const Home = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const dispatch = useAppDispatch();
  const { categories, fetching } = useAppSelector(state => state.category);
  const { posting, posted, postError } = useAppSelector(
    state => state.vocabulary
  );
  const resetState = () => dispatch(resetVocabularyState());
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    if (posted || postError) {
      setOpenSnackbar(true);

      return () => {
        dispatch(resetVocabularyState());
      };
    }
  }, [posted, postError, dispatch]);

  return (
    <Layout>
      <Title label="Useful Japanese vocabulary and phrases for developers." />
      <CreateVocabularyForm
        categories={categories}
        fetchingCategories={fetching}
        posting={posting}
        posted={posted}
      />
      <AlertSnackbar
        open={openSnackbar}
        setOpen={setOpenSnackbar}
        message={postError ? postError : 'New vocabulary created'}
        severity={postError ? 'error' : 'success'}
        resetState={resetState}
      />
    </Layout>
  );
};

export default Home;
