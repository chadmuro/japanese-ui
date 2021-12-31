import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import Layout from '../components/Layout/Layout';
import { getCategories } from '../store/slices/categorySlice';
import {
  getVocabulary,
  resetVocabularyState,
} from '../store/slices/vocabularySlice';
import { Title } from '../components/Layout/Title';
import VocabDetails from '../components/UI/VocabDetails';
import EditVocabularyForm from '../components/forms/Vocabulary/EditVocabularyForm';
import { AlertSnackbar } from '../components/UI/AlertSnackbar';

type VocabularyParams = {
  id: string;
};

const Vocabulary = () => {
  const { id } = useParams<VocabularyParams>();
  const [editForm, setEditForm] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const dispatch = useAppDispatch();
  const { vocabulary, fetching, fetchError, posting, posted, postError } =
    useAppSelector(state => state.vocabulary);
  const { categories, fetching: fetchingCategories } = useAppSelector(
    state => state.category
  );
  const resetState = () => dispatch(resetVocabularyState());

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    if (!editForm) {
      dispatch(getVocabulary({ id }));
    }
  }, [dispatch, id, editForm]);

  useEffect(() => {
    if (posted || postError) {
      setOpenSnackbar(true);
      dispatch(resetVocabularyState());
    }
  }, [posted, postError, dispatch]);

  console.log(fetchError);

  return (
    <Layout>
      <Title label="Vocabulary" />
      {editForm ? (
        <EditVocabularyForm
          categories={categories}
          fetchingCategories={fetchingCategories}
          posting={posting}
          vocabulary={vocabulary}
        />
      ) : (
        <VocabDetails vocabulary={vocabulary} fetching={fetching} />
      )}

      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-end',
          px: 4,
          mt: 1,
        }}
      >
        <IconButton
          sx={{ color: 'text.primary' }}
          onClick={() => setEditForm(!editForm)}
        >
          <EditIcon />
        </IconButton>
      </Box>
      <AlertSnackbar
        open={openSnackbar}
        setOpen={setOpenSnackbar}
        message={postError ? postError : 'Vocabulary updated'}
        severity={postError ? 'error' : 'success'}
        resetState={resetState}
      />
    </Layout>
  );
};

export default Vocabulary;
