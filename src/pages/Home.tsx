import { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Layout from '../components/Layout/Layout';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { getCategories } from '../store/slices/categorySlice';
import CreateVocabularyForm from '../components/forms/CreateVocabularyForm';

const useStyles = makeStyles(theme => ({
  title: {
    textAlign: 'center',
    paddingTop: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.h6.fontSize,
    },
  },
}));

const Home = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector(state => state.category);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <Layout>
      <Typography component="h2" variant="h4" className={classes.title}>
        Useful Japanese vocabulary and phrases for developers.
      </Typography>
      <CreateVocabularyForm categories={categories} />
    </Layout>
  );
};

export default Home;
