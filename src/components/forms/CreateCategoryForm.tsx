import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useAppDispatch } from '../../store/hooks';
import { postCategory } from '../../store/slices/categorySlice';
import { FormWrapper } from './FormWrapper';

interface FormValues {
  name: string;
}

const CreateCategoryForm = () => {
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
          />
        )}
        rules={{ required: 'Category name is required' }}
      />
      <Button fullWidth type="submit" color="primary" variant="contained">
        Submit
      </Button>
    </FormWrapper>
  );
};

export default CreateCategoryForm;
