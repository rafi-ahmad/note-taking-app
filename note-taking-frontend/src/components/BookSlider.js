import React, { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const BookSlider = ({ paragraph }) => {
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(1);
  const [totalSlides, setTotalSlides] = useState(1);

  // Function to split text based on a maximum character length per part
  const splitText = (text, maxLength) => {
    const words = text.split(" ");
    const chunks = [];
    let currentChunk = "";

    words.forEach((word) => {
      if (currentChunk.length + word.length <= maxLength) {
        currentChunk += `${word} `;
      } else {
        chunks.push(currentChunk.trim());
        currentChunk = `${word} `;
      }
    });

    if (currentChunk.length > 0) {
      chunks.push(currentChunk.trim());
    }

    return chunks;
  };

  useEffect(() => {
    const maxLength = 1000; // Maximum characters per part
    const pages = splitText(paragraph, maxLength);
    setTotalSlides(pages.length);
   
  }, []);

  const settings = {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (current, next) => setCurrentSlide(next + 1),
  };

  const handleNext = () => {
    sliderRef.current.slickNext();
  };

  const handlePrevious = () => {
    sliderRef.current.slickPrev();
  };

  return (
    <div className="max-w-xl mx-auto relative">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handlePrevious}
          className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <div className="text-gray-600 font-bold">
          {currentSlide}/{totalSlides}
        </div>
        <button
          onClick={handleNext}
          className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
      <Slider
        ref={sliderRef}
        {...settings}
      >
        {splitText(paragraph, 1000).map((page, index) => (
          <div
            key={index}
            className="p-1 rounded-lg h-96"
          >
            <p className="text-justify">{page}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BookSlider;
