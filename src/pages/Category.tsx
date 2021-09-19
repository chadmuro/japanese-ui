import { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import Layout from '../components/Layout/Layout';
import { getCategories } from '../store/slices/categorySlice';
import CreateCategoryForm from '../components/forms/CreateCategoryForm';
import { Title } from '../components/Layout/Title';

const useStyles = makeStyles(theme => ({
  grid: {
    marginTop: theme.spacing(4),
  },
}));

const Category = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { categories, fetching, error } = useAppSelector(
    state => state.category
  );

  console.log(categories, fetching, error);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <Layout>
      <Title label="Categories" />
      <CreateCategoryForm />
      <Container>
        <Grid
          container
          spacing={3}
          justifyContent="center"
          className={classes.grid}
        >
          {categories &&
            categories.map(category => (
              <Grid key={category._id} item>
                <Chip color="secondary" label={category.name} />
              </Grid>
            ))}
        </Grid>
      </Container>
    </Layout>
  );
};

export default Category;
