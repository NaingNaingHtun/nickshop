import React from "react";
import ReactImageMagnify from "react-image-magnify";
import "./style.css";
// import coat687 from "../../public/images/coat687.jpg";
// import coat1200 from "../../public/images/coat1200.jpg";
const ImageMagnify = () => {
  return (
    <div className="fluid">
      <div className="fluid__image-container">
        <ReactImageMagnify
          {...{
            smallImage: {
              alt: "Wristwatch by Ted Baker London",
              isFluidWidth: true,
              src: "images/backgroundImage.jpg",
            },
            largeImage: {
              src: "images/backgroundImage.jpg",
              width: 1200,
              height: 1800,
            },
          }}
        />
      </div>
      <div className="fluid__instructions">
        <h3>Basic Example</h3>
        <p>Side by Side enlargement for mouse input.</p>
        <p>In place enlargement for touch input.</p>
        <p>Fluid between breakpoints.</p>
      </div>
      <div style={{ height: "500px" }} />
    </div>
  );
};

export default ImageMagnify;
