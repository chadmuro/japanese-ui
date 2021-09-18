import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import cyan from '@material-ui/core/colors/cyan';
import blueGrey from '@material-ui/core/colors/blueGrey';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Category } from '../../constants/types';
import { useAppDispatch } from '../../store/hooks';
import { postVocabulary } from '../../store/slices/vocabularySlice';

interface FormValues {
  japanese: string;
  reading: string;
  english: string;
  categories: Category[];
}

const useStyles = makeStyles(theme => ({
  form: {
    padding: theme.spacing(2, 0),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: '500px',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  autocomplete: {
    background: cyan[50],
    color: blueGrey[900],
  },
}));

interface CreateVocabularyFormProps {
  categories: Category[];
}

const CreateVocabularyForm = ({ categories }: CreateVocabularyFormProps) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { handleSubmit, control } = useForm();

  const onSubmit: SubmitHandler<FormValues> = data => {
    const categories = data.categories.map(category => category._id);
    dispatch(postVocabulary({ ...data, categories }));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <Controller
        name="japanese"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            fullWidth
            variant="outlined"
            label="Japanese"
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
          />
        )}
        rules={{ required: 'Japanese is required' }}
      />
      <Controller
        name="reading"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            fullWidth
            variant="outlined"
            label="Reading"
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
          />
        )}
        rules={{ required: 'Reading is required' }}
      />
      <Controller
        name="english"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            fullWidth
            variant="outlined"
            label="English"
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
          />
        )}
        rules={{ required: 'English is required' }}
      />
      <Controller
        name="categories"
        control={control}
        defaultValue={[]}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            fullWidth
            multiple
            id="categories"
            value={value}
            onChange={(e, category) => {
              onChange(category);
            }}
            options={categories}
            getOptionLabel={category => category.name}
            renderInput={params => (
              <TextField
                {...params}
                variant="outlined"
                label="Select categories"
              />
            )}
            ChipProps={{
              color: 'secondary',
            }}
            classes={{ paper: classes.autocomplete }}
          />
        )}
      />
      <Button fullWidth type="submit" color="primary" variant="contained">
        Submit
      </Button>
    </form>
  );
};

export default CreateVocabularyForm;
