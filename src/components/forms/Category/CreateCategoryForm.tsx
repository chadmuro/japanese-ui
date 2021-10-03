import { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useAppDispatch } from '../../../store/hooks';
import { postCategory } from '../../../store/slices/categorySlice';
import { FormWrapper } from '../FormWrapper';

interface FormValues {
  name: string;
}

interface CreateCategoryFormProps {
  posting: boolean;
  posted: boolean;
}

const CreateCategoryForm = ({ posting, posted }: CreateCategoryFormProps) => {
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      name: '',
    },
  });
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<FormValues> = data => {
    dispatch(postCategory(data.name));
  };

  useEffect(() => {
    if (posted) {
      reset();
    }
  }, [posted, reset]);

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="name"
        control={control}
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
