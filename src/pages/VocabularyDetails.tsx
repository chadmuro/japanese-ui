import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import Layout from '../components/Layout/Layout';
import { getVocabulary } from '../store/slices/vocabularySlice';
import { Title } from '../components/Layout/Title';

type VocabularyParams = {
  id: string;
};

const Vocabulary = () => {
  const { id } = useParams<VocabularyParams>();
  const dispatch = useAppDispatch();
  const { vocabularies, fetching, error } = useAppSelector(
    state => state.vocabulary
  );

  useEffect(() => {
    dispatch(getVocabulary({ id }));
  }, [dispatch, id]);

  console.log(vocabularies, fetching, error);

  return (
    <Layout>
      <Title label="Vocabulary" />
    </Layout>
  );
};

export default Vocabulary;
