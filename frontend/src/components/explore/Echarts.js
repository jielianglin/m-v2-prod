import React, { useEffect } from "react";
import ReactEcharts from "echarts-for-react";
import axios from "axios";
import Popover from "@material-ui/core/Popover";


const useStyles = makeStyles((theme) => ({
    popover: {
        pointerEvents: 'none',
    },
    paper: {
        padding: theme.spacing(1),
        backgroundColor: 'transparent',
    },
}));

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        backgroundColor: "#E6DAC8"
    },
}))(MuiDialogContent);

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

export default function Chart() {
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    // const [response, setResponse] = React.useState( {tags: null, preview: null, carousel: null})
    const [graph, setGraph] = React.useState({ nodes: [], links: [] });
    const [imagePreview, setImagePreview] = React.useState([]);
    const [pics, setPics] = React.useState([]);

    const showGallery = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);

    };
    const showPopover = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const closePopover = () => {
        setAnchorEl(null);
    };

    const openPopover = Boolean(anchorEl);

    function getRandomColor() {
        var value = (Math.random() * 0xff) | 0;
        var grayscale = (value << 16) | (value << 8) | value;
        var color = "#" + grayscale.toString(16);
        return color;
    }

    const showGallery = () => {
        setGallery(true);
    }

    const onEvents = {
        'mouseMove': showPopover,
        'click': showGallery
    }

    useEffect(() => {
        async function fetchData() {
            const tags = await axios.get("http://127.0.0.1:8000/tags/network");
            setGraph(tags.data);
            const preview = await axios.get("http://127.0.0.1:8000/images/thumbnail");
            var randomPreview = preview[Math.floor(Math.random() * preview.length)];
            setImagePreview(randomPreview);
            const images = await axios.get("http://127.0.0.1:8000/images/image")
             setPics(images.data);
        }
        fetchData();
    }, []);

    let option = {
        tooltip: {
            alwaysShowContent: true,
        },
        series: [
            {
                type: "graph",
                layout: "force",
                data: graph.nodes.map((n) => ({
                    ...n,
                    symbolSize: n.value * 3,
                    itemStyle: { color: getRandomColor() },
                })),
                links: graph.links.map((l) => ({
                    ...l,
                    lineStyle: { color: "#24e1ea" },
                })),
                roam: true,
                label: {
                    position: "right",
                },
                force: {
                    repulsion: 100,
                },
            },
        ],
    };
    return (
        <div>
            <div className="eCharts">
                <ReactEcharts style={{ width: "100%", height: "100vh" }} option={option} onEvents={onEvents} />
            </div>
            <div className="eChartsPreview">
                <Popover
                    id="mouse-over-popover"
                    className={classes.popover}
                    classes={{
                        paper: classes.paper,
                    }}
                    elevation={0}
                    open={openPopover}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'center',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    onClose={closePopover}
                    disableRestoreFocus
                >
                    <div
                        style={{
                            borderRadius: "3px",
                            height: "110px",
                            width: "110px",
                            boxShadow: "3px 3px 3px #b4beb7"
                        }}
                    >
                        <img src={imagePreview}
                            width="110px" alt=""
                            style={{
                                borderRadius: "3px",
                                onMouseLeave={ closePopover }
                            }}
                            alt="" />
                    </div>
                </Popover>
            </div>
            <div className="eChartsGallery">
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
                        <Typography variant="h5">Images for `${graph.n}`</Typography>
                    </DialogTitle>
                    <DialogContent dividers>
                        <div className={classes.root}>
                            <ImageList rowHeight={160} className={classes.imageList} cols={3}>
                                {pics.map((image) => (
                                    <ImageListItem key={image.id} cols={image.cols || 1} >
                                        <img src={image.id} alt="" maxHeight="100px"
                                        //onClick={showCarousel} 
                                        />
                                    </ImageListItem>
                                ))}
                            </ImageList>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div>);
}
