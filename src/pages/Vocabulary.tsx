import { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
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
import { PaginationRounded } from '../components/UI/Pagination';
import VocabButtonSkeleton from '../components/UI/VocabButtonSkeleton';

const Vocabulary = () => {
  const dispatch = useAppDispatch();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const {
    vocabularies,
    totalCount,
    fetching,
    fetchError,
    posting,
    posted,
    postError,
  } = useAppSelector(state => state.vocabulary);
  const { categories, fetching: fetchingCategories } = useAppSelector(
    state => state.category
  );
  const { user } = useAppSelector(state => state.user);
  const accessToken = localStorage.getItem('accessToken');

  const resetState = () => dispatch(resetVocabularyState());

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    dispatch(getVocabularies(page));
  };

  console.log(fetchError);

  useEffect(() => {
    dispatch(getVocabularies(1));
  }, [dispatch]);

  useEffect(() => {
    if (user?.role === 'admin') {
      dispatch(getCategories());
    }
  }, [dispatch, user?.role]);

  useEffect(() => {
    if (posted) {
      dispatch(getVocabularies(1));
    }
    if (posted || postError) {
      setOpenSnackbar(true);
      dispatch(resetVocabularyState());
    }
  }, [posted, postError, dispatch]);

  if (!accessToken) {
    return <Redirect to="/login" />;
  }

  let mainContent: React.ReactNode;
  if (fetching) {
    mainContent = <VocabButtonSkeleton />;
  } else {
    mainContent = (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          mb: 2,
        }}
      >
        {vocabularies &&
          vocabularies.map(vocabulary => (
            <VocabButton key={vocabulary._id} vocabulary={vocabulary} />
          ))}
      </Box>
    );
  }

  return (
    <Layout>
      <Title label="Vocabulary" />
      {user?.role === 'admin' && (
        <>
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
        </>
      )}
      {mainContent}
      <PaginationRounded
        totalCount={totalCount}
        updatePage={handlePageChange}
      />
    </Layout>
  );
};

export default Vocabulary;
