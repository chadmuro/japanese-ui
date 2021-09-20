import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useAppDispatch } from '../../store/hooks';
import { postCategory } from '../../store/slices/categorySlice';
import { FormWrapper } from './FormWrapper';

interface FormValues {
  name: string;
}

interface CreateCategoryFormProps {
  posting: boolean;
}

const CreateCategoryForm = ({ posting }: CreateCategoryFormProps) => {
  const { handleSubmit, control } = useForm();
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<FormValues> = data => {
    dispatch(postCategory(data.name));
  };
  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
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
            sx={{ mb: 1 }}
          />
        )}
        rules={{ required: 'Category name is required' }}
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

export default CreateCategoryForm;
