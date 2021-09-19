import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import Layout from '../components/Layout/Layout';
import { getVocabularies } from '../store/slices/vocabularySlice';
import VocabButton from '../components/UI/VocabButton';
import { Title } from '../components/Layout/Title';

const Vocabulary = () => {
  const dispatch = useAppDispatch();
  const { vocabularies, fetching, error } = useAppSelector(
    state => state.vocabulary
  );

  useEffect(() => {
    dispatch(getVocabularies());
  }, [dispatch]);

  console.log(vocabularies, fetching, error);

  return (
    <Layout>
      <Title label="Vocabulary" />
      {vocabularies &&
        vocabularies.map(vocabulary => (
          <VocabButton key={vocabulary._id} vocabulary={vocabulary} />
        ))}
    </Layout>
  );
};

export default Vocabulary;
