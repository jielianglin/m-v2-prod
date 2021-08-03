import React from 'react';
import FileInput from '../FileInput';
import Tags from './Tags';
import Caption from './Caption';



export default function P5Mold() {
    const [image, setImage] = React.useState(null);

    if (image) {
        return (
            <div style={{ padding: "50px", backgroundColor: "#E6DAC8", borderRadius: "3px", boxShadow: "3px 3px 3px #b4beb7" }}>
                <Caption />
                <br />
                <div >
                    <img src={image} alt="" style={{ width: "100%", maxWidth: "800px" }} />
                </div>
                <br />
                <Tags />
            </div >
        )

    } else {
        return (
            <FileInput selectImage={setImage} />
        );
    }
}

