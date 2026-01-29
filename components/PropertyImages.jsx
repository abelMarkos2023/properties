'use client';

import Image from "next/image";
import React from "react";
import { Gallery, Item } from "react-photoswipe-gallery";

const PropertyImages = ({ images }) => {
  return (
    <Gallery>
      <div>
        {images.length === 1 ? (
          <Item
            original={images[0].startsWith("http") ? images[0] : `/properties/${images[0]}`}
            thumbnail={images[0]}
            width={1800}
            height={800}
          >
            {({ ref, open }) => (
              <Image
                ref={ref}
                onClick={open}
                src={images[0]}
                alt="Property Image"
                width={1800}
                height={800}
                sizes="100vw"
                className="cursor-pointer w-full rounded-xl object-cover h-[400px] mx-auto"
              />
            )}
          </Item>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {images.map((image, index) => (
              <Item
                key={index}
                original={image.startsWith("http") ? image : `/properties/${image}`}
                thumbnail={image.startsWith("http") ? image : `/properties/${image}`}
                width={1800}
                height={800}
              >
                {({ ref, open }) => (
                  <Image
                  ref={ref}
                  onClick={open}
                key={index}
                src={image.startsWith("http") ? image : `/properties/${image}`}
                alt=""
                width={800}
                height={800}
                className={`w-full cursor-pointer rounded-xl object-cover h-[400px] ${
                  images.length % 2 == 1 && index == images.length - 1
                    ? "col-span-2"
                    : "col-span-1"
                }`}
              />
                )}
              </Item>
            ))}
          </div>
        )}
      </div>
    </Gallery>
  );
};

export default PropertyImages;
