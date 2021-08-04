import React from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from '@material-ui/core/styles';

import image1 from './Gallery/image1/image1.jpg';
import image2 from './Gallery/image2/image2.jpg';
import image3 from './Gallery/image3/image3.png';

import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: "#E6DAC8",
    },
    imageList: {
        width: 500,
        height: 450,
    },
}));

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
        color: "#2B4466",
        backgroundColor: "#E6DAC8",
    },
    closeButton: {
        position: "absolute",
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],

    },
});

const DeleteButton = withStyles({
    root: {
        background: '#2B4466',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px #b4beb7',
    },
    label: {
        textTransform: 'capitalize',
    },
})(Button);

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton
                    aria-label="close"
                    className={classes.closeButton}
                    onClick={onClose}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        backgroundColor: "#E6DAC8"
    },
}))(MuiDialogContent);

export default function Dashboard() {
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();
    // const [select, setSelect] = React.useState(false);
    // const [gallery, setGallery] = React.useState("");

    // const selectImage = (onClick) => {
    //     setSelect(true);
    // }

    const images = [
        {
            src: `${image1}`,

        },
        {
            src: `${image2}`,


        },
        {
            src: `${image3}`,

        },
    ]

    // setGallery(images);

    // const deleteHandler = () => {
    //     if (select === true) {
    //         setGallery(images.filter(el => el.src !== images.src))
    //     }
    //     return images;
    // }

    const handleClickOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);

    };

    return (
        <div>
            <Button onClick={handleClickOpen}>
                <AccountCircleIcon style={{ fontSize: 80, color: "#FFFFFF" }} />
            </Button>
            <Dialog
                onClose={handleClose}
                aria-labelledby="simple-dialog-title"
                open={open}

                maxWidth="md"
                fullWidth={true}
            >
                <DialogTitle
                    //newTitle={newTitle}
                    id="customized-dialog-title"
                    onClose={handleClose}
                >
                    <Typography variant="h5">Manage my pictures</Typography>
                </DialogTitle>
                <DialogContent dividers>
                    <div className={classes.root}>
                        <ImageList rowHeight={160} className={classes.imageList} cols={3}>
                            {images.map((image) => (
                                <ImageListItem key={image.src} cols={image.cols || 1}>
                                    <img src={image.src} alt="" />
                                </ImageListItem>
                            ))}
                        </ImageList>
                    </div>
                </DialogContent>

                <div style={{ display: "flex", justifyContent: "center", backgroundColor: "#E6DAC8", padding: "10px" }}>
                    <DeleteButton >
                        <Typography variant="h8">
                            DELETE
                        </Typography>
                    </DeleteButton>
                </div>


            </Dialog>
        </div>
    )
}
