import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Category, Vocabulary } from '../../../constants/types';
import { useAppDispatch } from '../../../store/hooks';
import { updateVocabulary } from '../../../store/slices/vocabularySlice';
import { FormWrapper } from '../FormWrapper';

interface FormValues {
  japanese: string;
  reading: string;
  english: string;
  categories: Pick<Category, '_id' | 'name'>[];
}

interface EditVocabularyFormProps {
  categories: Category[];
  fetchingCategories: boolean;
  posting: boolean;
  vocabulary: Vocabulary | null;
}

const EditVocabularyForm = ({
  categories,
  fetchingCategories,
  posting,
  vocabulary,
}: EditVocabularyFormProps) => {
  const dispatch = useAppDispatch();

  const originalCategories = vocabulary?.categories.map(category => {
    return {
      _id: category._id,
      name: category.name,
    };
  });

  const defaultValues = {
    japanese: vocabulary ? vocabulary.japanese : '',
    reading: vocabulary ? vocabulary.reading : '',
    english: vocabulary ? vocabulary.english : '',
    categories: vocabulary ? originalCategories : [],
  };
  const { handleSubmit, control } = useForm({
    defaultValues,
  });

  const onSubmit: SubmitHandler<FormValues> = data => {
    const categoriesDefault = originalCategories?.map(category => category._id);
    const categoriesNew = data.categories.map(category => category._id);
    const categoriesAdd = categoriesNew.filter(
      id => !categoriesDefault?.includes(id)
    );
    const categoriesRemove = categoriesDefault?.filter(
      id => !categoriesNew.includes(id)
    );

    dispatch(
      updateVocabulary({
        ...data,
        categories: categoriesNew,
        categoriesAdd,
        categoriesRemove,
        id: vocabulary?._id || '',
      })
    );
  };

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
            isOptionEqualToValue={(option, value) => option._id === value._id}
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

export default EditVocabularyForm;
