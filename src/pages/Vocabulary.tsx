import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import Layout from '../components/Layout/Layout';
import { getVocabularies } from '../store/slices/vocabularySlice';

const useStyles = makeStyles(theme => ({
  title: {
    textAlign: 'center',
    paddingTop: theme.spacing(4),
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
        {vocabularies &&
          vocabularies.map(vocabulary => (
            <Typography variant="body1">{vocabulary.japanese}</Typography>
          ))}
      </Typography>
    </Layout>
  );
};

export default Vocabulary;
