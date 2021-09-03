import React, { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import Layout from '../components/Layout/Layout';
import { getCategories, postCategory } from '../store/slices/categorySlice';

const useStyles = makeStyles(theme => ({
  title: {
    textAlign: 'center',
    paddingTop: theme.spacing(4),
  },
  form: {
    paddingTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      width: '500px',
      margin: theme.spacing(1),
    },
  },
  grid: {
    marginTop: theme.spacing(4),
  },
}));

interface FormValues {
  name: string;
}

const Category = () => {
  const classes = useStyles();
  const { handleSubmit, control } = useForm();
  const dispatch = useAppDispatch();
  const { categories, fetching, error } = useAppSelector(
    state => state.category
  );

  console.log(categories, fetching, error);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const onSubmit: SubmitHandler<FormValues> = data => {
    dispatch(postCategory(data.name));
  };

  return (
    <Layout>
      <Typography component="h2" variant="h4" className={classes.title}>
        Categories
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              variant="outlined"
              label="New Category"
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error ? error.message : null}
            />
          )}
          rules={{ required: 'Category name is required' }}
        />

        <Button type="submit" color="primary" variant="contained">
          Submit
        </Button>
      </form>
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
    </Layout>
  );
};

export default Category;
