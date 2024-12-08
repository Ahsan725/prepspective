import React from 'react';
import Image from 'next/image';

type SvgImageProps = {
  src: string;
  alt: string;
};


const SvgImage: React.FC<SvgImageProps> = ({ src, alt }) => {
  return (
    <div className="relative flex flex-col lg:flex-row justify-center items-center h-auto lg:h-screen lg:gap-16 px-4 lg:px-8 mt-4">
      {/* Text Section (2/5 on lg screens) */}
      <div className="flex flex-col items-center lg:items-center lg:justify-center lg:w-2/5 text-center lg:ml-4">
        {/* Features Label */}
        <div className="flex items-center justify-center mb-4">
          <h2 className="inline-block font-extrabold text-xs sm:text-sm md:text-sm lg:text-md text-indigo-700 text-center tracking-wider bg-indigo-200 rounded-md px-2 py-0">
            FEATURES
          </h2>
        </div>

        {/* Main Heading */}
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          What Sets Us Apart
        </h2>

        {/* Subheading */}
        <h3 className="md:w-3/4 lg:w-full mx-auto font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
          Our platform revolutionizes interview preparation with tailored insights, expert breakdowns, and a supportive community designed to help you succeed.
              </h3>
      </div>

      {/* Image Section (3/5 on lg screens) */}
      <div className="relative lg:w-4/5">
        <Image
          src={src}
          alt={alt}
          width={1500}
          height={200}
          className="object-cover rounded-md"
        />
        {/* Fade effect */}
        <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-b from-transparent via-white to-white pointer-events-none"></div>
      </div>
    </div>
  );
};

export default SvgImage;
