import { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Category } from '../../../constants/types';
import { useAppDispatch } from '../../../store/hooks';
import { postVocabulary } from '../../../store/slices/vocabularySlice';
import { FormWrapper } from '../FormWrapper';

interface FormValues {
  japanese: string;
  reading: string;
  english: string;
  categories: Category[];
}

interface CreateVocabularyFormProps {
  categories: Category[];
  fetchingCategories: boolean;
  posting: boolean;
  posted: boolean;
}

const CreateVocabularyForm = ({
  categories,
  fetchingCategories,
  posting,
  posted,
}: CreateVocabularyFormProps) => {
  const dispatch = useAppDispatch();
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      japanese: '',
      reading: '',
      english: '',
      categories: [],
    },
  });

  const onSubmit: SubmitHandler<FormValues> = data => {
    const categories = data.categories.map(category => category._id);
    dispatch(postVocabulary({ ...data, categories }));
  };

  useEffect(() => {
    if (posted) {
      reset();
    }
  }, [reset, posted]);

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="japanese"
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            fullWidth
            variant="outlined"
            label="Japanese"
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
            sx={{ mb: 1 }}
          />
        )}
        rules={{ required: 'Japanese is required' }}
      />
      <Controller
        name="reading"
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            fullWidth
            variant="outlined"
            label="Reading"
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
            sx={{ mb: 1 }}
          />
        )}
        rules={{ required: 'Reading is required' }}
      />
      <Controller
        name="english"
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            fullWidth
            variant="outlined"
            label="English"
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
            sx={{ mb: 1 }}
          />
        )}
        rules={{ required: 'English is required' }}
      />
      <Controller
        name="categories"
        control={control}
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
            loading={fetchingCategories}
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
            sx={{ mb: 1 }}
          />
        )}
      />
      <Button
        fullWidth
        type="submit"
        color="primary"
        variant="contained"
        disabled={posting}
      >
        Submit
      </Button>
    </FormWrapper>
  );
};

export default CreateVocabularyForm;
