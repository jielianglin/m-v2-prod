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

import Gallery from 'react-grid-gallery';
import image1 from './Gallery/image1/image1.jpg';
import image2 from './Gallery/image2/image2.jpg';
import image3 from './Gallery/image3/image3.png';


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
    const [select, setSelect] = React.useState(false);
    const [gallery, setGallery] = React.useState("");

    const selectImage = (onClick) => {
        setSelect(true);
    }

    const images = [
        {
            src: `${image1}`,
            onSelect: select,
            thumbnail: "",
            thumbnailWidth: 100,
            thumbnailHeight: 100,
        },
        {
            src: `${image2}`,
            onSelect: select,
            thumbnail: "",
            thumbnailWidth: 100,
            thumbnailHeight: 100,

        },
        {
            src: `${image3}`,
            onSelect: select,
            thumbnail: "",
            thumbnailWidth: 100,
            thumbnailHeight: 100,
        },
    ]

    setGallery(images);

    const deleteHandler = () => {
        if (select === true) {
            setGallery(images.filter(el => el.src !== images.src))
        }
        return images;
    }

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
                    <Gallery images={images} onSelectImage={selectImage} />
                </DialogContent>
                <DialogContent dividers>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <DeleteButton onClick={deleteHandler}>
                            <Typography variant="h8">
                                DELETE
                            </Typography>
                        </DeleteButton>
                    </div>
                </DialogContent>

            </Dialog>
        </div>
    )
}
