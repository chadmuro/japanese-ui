import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import Layout from '../components/Layout/Layout';
import { getVocabulary } from '../store/slices/vocabularySlice';

const useStyles = makeStyles(theme => ({
  title: {
    textAlign: 'center',
    padding: theme.spacing(4, 0, 2),
  },
}));

type VocabularyParams = {
  id: string;
};

const Vocabulary = () => {
  const classes = useStyles();
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
      <Typography component="h2" variant="h4" className={classes.title}>
        Vocabulary
      </Typography>
    </Layout>
  );
};

export default Vocabulary;
