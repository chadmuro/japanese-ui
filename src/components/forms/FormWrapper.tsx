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
        pt: 0,
        pb: 4,
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
