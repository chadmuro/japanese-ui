import { useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { getCategories } from '../store/slices/categorySlice';
import CreateVocabularyForm from '../components/forms/CreateVocabularyForm';
import { Title } from '../components/Layout/Title';

const Home = () => {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector(state => state.category);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <Layout>
      <Title label="Useful Japanese vocabulary and phrases for developers." />
      <CreateVocabularyForm categories={categories} />
    </Layout>
  );
};

export default Home;
