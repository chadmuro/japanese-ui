import { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import Layout from '../components/Layout/Layout';
import { getVocabularies } from '../store/slices/vocabularySlice';
import VocabButton from '../components/UI/VocabButton';

const useStyles = makeStyles(theme => ({
  title: {
    textAlign: 'center',
    padding: theme.spacing(4, 0, 2),
  },
}));

const Vocabulary = () => {
  const classes = useStyles();
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
      <Typography component="h2" variant="h4" className={classes.title}>
        Vocabulary
      </Typography>
      {vocabularies &&
        vocabularies.map(vocabulary => (
          <VocabButton key={vocabulary._id} vocabulary={vocabulary} />
        ))}
    </Layout>
  );
};

export default Vocabulary;
