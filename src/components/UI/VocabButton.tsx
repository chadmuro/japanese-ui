import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Vocabulary } from '../../constants/types';

const useStyles = makeStyles(theme => ({
  link: {
    textDecoration: 'none',
  },
  button: {
    marginBottom: theme.spacing(2),
  },
  text: {
    textTransform: 'lowercase',
  },
}));

interface VocabButtonProps {
  vocabulary: Vocabulary;
}

const VocabButton = ({ vocabulary }: VocabButtonProps) => {
  const classes = useStyles();

  return (
    <Link to={`/vocabulary/${vocabulary._id}`} className={classes.link}>
      <Button variant="contained" color="primary" className={classes.button}>
        <Box pr={4}>
          <Typography variant="caption">{vocabulary.reading}</Typography>
          <Typography variant="h6">{vocabulary.japanese}</Typography>
        </Box>
        <Typography className={classes.text} variant="h6">
          {vocabulary.english}
        </Typography>
      </Button>
    </Link>
  );
};

export default VocabButton;
