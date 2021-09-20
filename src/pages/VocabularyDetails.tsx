import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import Layout from '../components/Layout/Layout';
import { getVocabulary } from '../store/slices/vocabularySlice';
import { Title } from '../components/Layout/Title';
import VocabDetails from '../components/UI/VocabDetails';

type VocabularyParams = {
  id: string;
};

const Vocabulary = () => {
  const { id } = useParams<VocabularyParams>();
  const dispatch = useAppDispatch();
  const { vocabulary, fetching, error } = useAppSelector(
    state => state.vocabulary
  );

  useEffect(() => {
    dispatch(getVocabulary({ id }));
  }, [dispatch, id]);

  console.log(vocabulary, fetching, error);

  return (
    <Layout>
      <Title label="Vocabulary" />
      <VocabDetails vocabulary={vocabulary} fetching={fetching} />
    </Layout>
  );
};

export default Vocabulary;
