import React, { useEffect } from "react";
import ReactEcharts from "echarts-for-react";
import axios from "axios";
import Popover from "@material-ui/core/Popover";
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import { Typography, Chip, Avatar } from "@material-ui/core";

import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from '@material-ui/core/styles';

import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';

import Carousel from 'react-material-ui-carousel';

import MatchBar from "./Matchbar";
// import Visual from "./Visual";

const useStyles = makeStyles((theme) => ({
    popover: {
        pointerEvents: 'none',
    },
    paper: {
        padding: theme.spacing(1),
        backgroundColor: 'transparent',
    },
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

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        backgroundColor: "#E6DAC8"
    },
}))(MuiDialogContent);

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

export default function Chart() {
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    // const [response, setResponse] = React.useState( {tags: null, preview: null, carousel: null})
    const [graph, setGraph] = React.useState({ nodes: [], links: [] });
    const [imagePreview, setImagePreview] = React.useState([]);
    const [results, setResults] = React.useState([]);
    const [gallery, setGallery] = React.useState(false);
    const [carousel, setCarousel] = React.useState(false);

    const showDialog = () => {
        setOpen(true);
        setGallery(!gallery)
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

    const onEvents = {
        'mouseMove': showPopover,
        'click': showDialog
    }

    useEffect(() => {
        async function fetchData() {
            const tags = await axios.get("http://127.0.0.1:8000/tags/network");
            setGraph(tags.data);
            //not sure about the preview call
            const preview = await axios.get(`http://127.0.0.1:8000/images?tag=${graph}`);
            var randomPreview = preview[Math.floor(Math.random() * preview.length)];
            setImagePreview(randomPreview);
            const images = await axios.get(`http://127.0.0.1:8000/images?tag=${graph}`)
            setResults(images.data);
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
    const showCarousel = (e) => {
        setGallery(!gallery);
        // setSlidePosition(e.target.id);
        setCarousel(!carousel);
    }
    const showGallery = () => {
        setCarousel(!carousel);
        setGallery(!gallery);
    }

    return (
        <div>

            <div className="eCharts">
                <ReactEcharts style={{ width: "100%", height: "100vh", zIndex: "auto" }} option={option} onEvents={onEvents} />
            </div>
            {/* <div> <Visual style={{ position: "absolute", zIndex: -1 }} /> </div> */}
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
                            }}
                            onMouseLeave={closePopover}
                        />
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
                        {gallery && (
                            <div className="gallery">
                                <div className={classes.root}>
                                    <ImageList rowHeight={160} className={classes.imageList} cols={3}>
                                        {results.map((item) => (
                                            <ImageListItem key={item.id} cols={item.cols || 1} >
                                                <img src={item.id} alt="" maxHeight="100px"
                                                    onClick={showCarousel}
                                                />
                                            </ImageListItem>
                                        ))}
                                    </ImageList>
                                </div>
                            </div>
                        )}
                        {carousel && (
                            <Carousel>
                                {results.map((item) => (
                                    <div className="carouselResults">
                                        <Typography className="mtag-label"> {item.caption}
                                        </Typography>
                                        <div key={item.id} cols={item.cols || 1} style={{ display: "flex", justifyContent: "center" }}>
                                            <img id={item.id} src={item.src} alt="" maxHeight="100px" onClick={showGallery}
                                            />
                                        </div>

                                        <div className="metadata" >
                                            <div style={{ display: "block", textAlign: "center" }}>
                                                <Typography className="mtag-label"> Our Tags:
                                                </Typography>
                                            </div>
                                            <div className="userTags" style={{ display: "flex", justifyContent: "center", padding: "10px" }}>

                                                {item.tags.map((posttag) => {

                                                    return (
                                                        <Chip className="chip1" style={{ color: "#B272CE", backgroundColor: "#FFFFFF" }} avatar={
                                                            <Avatar style={{ color: "#B272CE" }}>
                                                                <div style={{ color: "#FFFFFF" }}>
                                                                    #
                                                                </div>
                                                            </Avatar>
                                                        }
                                                            key={posttag.id}
                                                            label={posttag.tag}
                                                            component="a"
                                                            href="#chip"
                                                            variant="outlined"
                                                            color="primary"
                                                            clickable
                                                        />
                                                    );
                                                })}
                                            </div>

                                            <div style={{ display: "block", textAlign: "center" }}>
                                                <Typography className="ai_tags"> AI Tags:
                                                </Typography>
                                            </div>
                                            <div className="AITAgs" style={{ display: "flex", justifyContent: "center", padding: "10px" }}>


                                                {item.ai_tags.map((aitag) => {

                                                    return (
                                                        <Chip className="chip2" style={{ color: "#000000", backgroundColor: "#FFFFFF" }} avatar={
                                                            <Avatar style={{ background: "#B5BCB4" }}>
                                                                <div style={{ color: "#FFFFFF" }}>
                                                                    #
                                                                </div>
                                                            </Avatar>
                                                        }
                                                            key={aitag.id}
                                                            label={aitag.tag}
                                                            component="a"
                                                            href="#chip"
                                                            clickable
                                                        />
                                                    );
                                                })}
                                            </div>
                                            <div>
                                                {item.ai_tags.map((aiitem) => {
                                                    return (
                                                        <MatchBar
                                                            match={parseFloat(aiitem.confidence)}
                                                            aitag={aiitem.tag}
                                                        />
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>))}
                            </Carousel>
                        )
                        }
                    </DialogContent>
                </Dialog>
            </div>
        </div>);
}
