import React from "react";
import styles from "../../../styles/styles";

const Hero = () => {
  return (
    <div
      className={`relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeat ${styles.normalFlex}`}
      style={{
        backgroundImage:
          "url(https://thumbs.dreamstime.com/b/may-africa-day-banner-animal-print-map-illustration-celebration-african-continent-ethnic-art-wild-textures-147521780.jpg)",
      }}
    ></div>
  );
};

export default Hero;
