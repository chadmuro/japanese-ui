import { useEffect } from 'react';
import Box from '@mui/material/Box';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import Layout from '../components/Layout/Layout';
import { getVocabularies } from '../store/slices/vocabularySlice';
import VocabButton from '../components/UI/VocabButton';
import { Title } from '../components/Layout/Title';

const Vocabulary = () => {
  const dispatch = useAppDispatch();
  const { vocabularies, fetching, fetchError } = useAppSelector(
    state => state.vocabulary
  );

  useEffect(() => {
    dispatch(getVocabularies());
  }, [dispatch]);

  console.log(vocabularies, fetching, fetchError);

  return (
    <Layout>
      <Title label="Vocabulary" />
      <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        {vocabularies &&
          vocabularies.map(vocabulary => (
            <VocabButton key={vocabulary._id} vocabulary={vocabulary} />
          ))}
      </Box>
    </Layout>
  );
};

export default Vocabulary;
