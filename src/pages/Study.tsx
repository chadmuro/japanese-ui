import { Redirect } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import { Title } from '../components/Layout/Title';

const Study = () => {
  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken) {
    return <Redirect to="/login" />;
  }

  return (
    <Layout>
      <Title label="Study" />
      Coming soon...
    </Layout>
  );
};

export default Study;
