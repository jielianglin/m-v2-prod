import React, { useEffect } from "react";
import ReactEcharts from "echarts-for-react";
import axios from "axios";
import Popover from "@material-ui/core/Popover";
import EchartsCarousel from "EchartsCarousel";

const useStyles = makeStyles((theme) => ({
    popover: {
        pointerEvents: 'none',
    },
    paper: {
        padding: theme.spacing(1),
        backgroundColor: 'transparent',
    },
}));

export default function Chart() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    // const [response, setResponse] = React.useState( {tags: null, preview: null, carousel: null})
    const [graph, setGraph] = React.useState({ nodes: [], links: [] });
    const [imagePreview, setImagePreview] = React.useState([]);
    const [images, setImages] = React.useState([]);
    const [carousel, setCarousel] = React.useState(false);

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

    const showCarousel = () => {
        setCarousel(true);
    }

    const onEvents = {
        'mouseMove': showPopover,
        'click': showCarousel
    }

    useEffect(() => {
        async function fetchData() {
            const tags = await axios.get("http://127.0.0.1:8000/tags/network");
            setGraph(tags.data);
            const preview = await axios.get("http://127.0.0.1:8000/images/thumbnail");
            setImagePreview(preview.data[0]);
            const images = await axios.get("http://127.0.0.1:8000/images/image")
            setImages(images.data);

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
            <ReactEcharts style={{ width: "100%", height: "100vh" }} option={option} onEvents={onEvents} />
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
                {imagePreview}
            </Popover>
            {carousel && (
                <EchartsCarousel images={images} />
            )
            }
        </div>);
}
