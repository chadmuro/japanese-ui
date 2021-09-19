import Box from '@mui/material/Box';

interface FormWrapperProps {
  children: React.ReactNode;
  onSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
}

export const FormWrapper = ({ children, onSubmit }: FormWrapperProps) => {
  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{
        py: 0,
        px: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        maxWidth: '500px',
      }}
    >
      {children}
    </Box>
  );
};
