import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '60px',
      }}
    >
      <Typography>Copyright &copy; Chad Murobayashi 2022</Typography>
    </Box>
  );
};

export default Footer;
