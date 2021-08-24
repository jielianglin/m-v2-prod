import Carousel from 'react-material-ui-carousel';

export default function Carousel(props) {
    const carousel = () => {
        return (
            <Carousel>
                {results.map((image) => (
                    <div key={image.id} cols={image.cols || 1} >
                        <img src={image.id} alt="" maxHeight="100px" onClick={showCarousel}
                        />
                    </div>
                ))}
            </Carousel>
        )
    }

    return (
        <div className="carousel">
            <img src={image.id} alt="" maxHeight="100px" onClick={showGallery} />
        </div>
    )
}