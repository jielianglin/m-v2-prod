import React from 'react';
import axios from "axios";

import FileInput from '../FileInput';
import Tags from './Tags';
import Caption from './Caption';

import { Typography, Chip, Avatar } from "@material-ui/core";
import Button from "@material-ui/core/Button";


import { ThemeProvider } from "@material-ui/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

import { createMuiTheme } from "@material-ui/core/styles";


const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#9611ff",
        },
        secondary: {
            main: "#668389",
        },
    },
});

export default function WellBeingTool(props) {
    const [image, setImage] = React.useState(null);

    const [post, setPost] = React.useState(false);
    const [tags, setTags] = React.useState([]);
    const [src, setSrc] = React.useState(null);
    const [caption, setCaption] = React.useState(null);
    const [returnCaption, setReturnCaption] = React.useState(null);
    const [returnTags, setReturnTags] = React.useState([]);
    const [returnAITags, setReturnAITags] = React.useState([]);
    const [progress, setProgress] = React.useState(false);

    const enteredCaption = (caption) => {
        setCaption(caption);
    };
    const selectedTags = (tags) => {
        setTags(tags);
    };

    const selectedImage = (img) => {
        setImage(img);
    };

    const resetCanvas = () => {
        setImage(!image);
    }

    async function postData() {
        setProgress(true);
        console.log(tags);
        console.log(tags.join(","));
        let formData = new FormData();
        formData.append("file", image);
        formData.append("tags", tags.join(","));
        formData.append("caption", caption);
        let response = await axios.post("http://localhost:8000/images", formData);
        props.newTitle();
        setSrc(`http://localhost:8000/images/${response.data.id}.jpeg`);
        console.log(response.data.caption);
        setReturnCaption(response.data.caption);
        console.log(response.data.tags);
        setReturnTags(response.data.tags);
        console.log(response.data.ai_tags);
        setReturnAITags(response.data.ai_tags || []);
        setPost(true);
        setProgress(false);
    }

    if (image) {
        return (
            <div>
                {post ?
                    <div className="returnForm">
                        < img
                            style={{
                                display: "block",
                                margin: "0 auto",
                                height: "50%",
                                borderRadius: "5px",
                            }
                            }
                            className="returned-image"
                            src={src}
                            alt=""
                        />
                        <br />
                        <ThemeProvider theme={theme}>
                            <Typography variant="h6" color="primary">
                                <div className="returned-caption">
                                    <i>"</i>
                                    <i>
                                        {" "}
                                        <span>{returnCaption}</span>{" "}
                                    </i>
                                    <i>"</i>
                                </div>
                            </Typography>
                            <br />
                            <span className="tags-return">
                                <Typography color="primary"> Your Tags: </Typography>
                                {returnTags.map((item) => (
                                    <Chip
                                        className="chip1" style={{ color: "#000000", backgroundColor: "#B272CE" }}
                                        className="returned-tags-chip"
                                        avatar={
                                            <Avatar style={{ color: "#E6DAC8" }}>
                                                <div style={{ color: "#FFFFFF" }}>
                                                    #
                                                </div>
                                            </Avatar>
                                        }
                                        key={item.id}
                                        label={item.tag}
                                        variant="outlined"
                                    />
                                ))}
                            </span>
                            <br />
                            <br />
                            <span className="ai_tags_return">
                                <Typography color="secondary"> Tags from ImageNet AI: </Typography>
                                {returnAITags.length === 0 && (
                                    <Typography variant="h12" color="secondary">
                                        <i>[couldn't identify any tags] </i>
                                    </Typography>
                                )}

                                {returnAITags.map((item) => (
                                    <Chip
                                        className="chip2" style={{ color: "#000000", backgroundColor: "#FFFFFF" }}

                                        className="returned-ai-tags-chip"
                                        avatar={
                                            <Avatar style={{ background: "#B5BCB4" }}>
                                                <div style={{ color: "#FFFFFF" }}>
                                                    #
                                                </div>
                                            </Avatar>
                                        }
                                        key={item.id}
                                        label={item.tag}
                                    />
                                ))}
                            </span>
                            <br />
                            <Button onClick={resetCanvas}>Back to WellBeing upload</Button>
                            <br />
                        </ThemeProvider>
                    </div >

                    :

                    <div style={{ padding: "50px", backgroundColor: "#E6DAC8", borderRadius: "3px", boxShadow: "3px 3px 3px #b4beb7" }}>
                        <Caption enteredCaption={enteredCaption} />
                        <br />
                        <div >
                            <img src={image} alt="" style={{ width: "100%", maxWidth: "800px" }} />
                        </div>
                        <br />
                        <Tags selectedTags={selectedTags} />
                        <br />
                        <div className="save-data">
                            <Button
                                disabled={!image || !caption || tags.length === 0}
                                className="save-button"
                                palette="primary"
                                onClick={postData}
                            >
                                {" "}
                                Save{" "}
                            </Button>
                            <ThemeProvider theme={theme}>
                                {progress && <CircularProgress />}
                            </ThemeProvider>
                        </div>
                    </div >

                }
            </div>)

    } else {
        return (

            <FileInput
                //is this needed okay? 
                selectImage={setImage}
                selectedImage={selectedImage}
            />
        );
    }
}

