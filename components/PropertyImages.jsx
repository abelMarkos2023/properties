import Image from 'next/image'
import React from 'react'

const PropertyImages = ({images}) => {
  return (
    <div>
        {
            images.length === 1 ? (
                <Image
                src={images[0]}
                alt=""
                width={1800}
                height={400}
                sizes="100vw"
                className="w-full rounded-xl object-cover h-[400px] mx-auto"
              />
            ) :(
                <div className="grid grid-cols-2 gap-4">
                {images.map((image, index) => (
                  <Image
                    key={index}
                    src={image}
                    alt=""
                    width={1800}
                    height={400}
                    
                    className={`w-full rounded-xl object-cover h-[400px] ${images.length % 2 == 1 && index == images.length -1 ? 'col-span-2' : 'col-span-1'}`}
                  />
                ))}
                </div>
            )
        }
    </div>
  )
}

export default PropertyImages