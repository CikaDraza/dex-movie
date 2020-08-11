import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '250px',
    height: '410px',
    margin: '5px',
    backgroundColor: '#f4f4f4',
    position: 'relative'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  avatar: {
    fontSize: '12px',
    backgroundColor: '#F9B416',
  },
  cardHeader: {
    height: '75px',
  },
  actionBtn: {
    position: 'absolute',
    bottom: 0,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export const Movies = ({title, year, type, imdbID, poster, plot, actors, rating, genre}) => {

    if(poster === 'N/A') {
      poster = 'https://d1klenmqvfdv9g.cloudfront.net/wp-content/uploads/2018/12/Asset-5-1-300x285.png';
    }

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="rating" className={classes.avatar}>
            {rating}
          </Avatar>
        }              
        title={title}
        subheader={`${type}, ${year}`}
        className={classes.cardHeader}
      />
      <CardMedia
        className={classes.media}
        image={poster}
        title={title}
      />
      <CardContent>
      <Typography variant="body2" color="textSecondary" component="p">
          {imdbID} | {genre}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          actors: {actors}
        </Typography>
      </CardContent>
      <CardActions className={classes.actionBtn}>
        <IconButton
          onClick={handleOpen}
          size="small"
        >...
        </IconButton>
      </CardActions>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">About</h2>
            <p id="transition-modal-description">{plot}</p>
          </div>
        </Fade>
      </Modal>
    </Card>
  );
}

