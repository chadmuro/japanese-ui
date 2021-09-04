import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useAppDispatch } from '../../store/hooks';
import { postCategory } from '../../store/slices/categorySlice';

interface FormValues {
  name: string;
}

const useStyles = makeStyles(theme => ({
  form: {
    padding: theme.spacing(4, 2, 0),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: '500px',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const CreateCategoryForm = () => {
  const classes = useStyles();
  const { handleSubmit, control } = useForm();
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<FormValues> = data => {
    dispatch(postCategory(data.name));
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <Controller
        name="name"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            fullWidth
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
      <Button fullWidth type="submit" color="primary" variant="contained">
        Submit
      </Button>
    </form>
  );
};

export default CreateCategoryForm;
