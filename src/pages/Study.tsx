import { Redirect } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import { Title } from '../components/Layout/Title';
import { useAppSelector } from '../store/hooks';

const Study = () => {
  const { user } = useAppSelector(state => state.user);

  if (!user) {
    return <Redirect to="/login" />;
  }

  return (
    <Layout>
      <Title label="Study" />
      Study me
    </Layout>
  );
};

export default Study;
