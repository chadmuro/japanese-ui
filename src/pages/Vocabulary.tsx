import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import Layout from '../components/Layout/Layout';
import {
  getVocabularies,
  resetVocabularyState,
} from '../store/slices/vocabularySlice';
import { getCategories } from '../store/slices/categorySlice';
import CreateVocabularyForm from '../components/forms/Vocabulary/CreateVocabularyForm';
import { AlertSnackbar } from '../components/UI/AlertSnackbar';
import VocabButton from '../components/UI/VocabButton';
import { Title } from '../components/Layout/Title';

const Vocabulary = () => {
  const dispatch = useAppDispatch();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { vocabularies, fetching, fetchError, posting, posted, postError } =
    useAppSelector(state => state.vocabulary);
  const { categories, fetching: fetchingCategories } = useAppSelector(
    state => state.category
  );
  const resetState = () => dispatch(resetVocabularyState());

  console.log(fetching, fetchError);

  useEffect(() => {
    dispatch(getVocabularies());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    if (posted) {
      dispatch(getVocabularies());
    }
    if (posted || postError) {
      setOpenSnackbar(true);
      dispatch(resetVocabularyState());
    }
  }, [posted, postError, dispatch]);

  return (
    <Layout>
      <Title label="Vocabulary" />
      <CreateVocabularyForm
        categories={categories}
        fetchingCategories={fetchingCategories}
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
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          pt: 4,
        }}
      >
        {vocabularies &&
          vocabularies.map(vocabulary => (
            <VocabButton key={vocabulary._id} vocabulary={vocabulary} />
          ))}
      </Box>
    </Layout>
  );
};

export default Vocabulary;
