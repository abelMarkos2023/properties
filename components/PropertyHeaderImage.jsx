import Image from 'next/image'
import React from 'react'

const PropertyHeaderImage = ({image}) => {

  const url = image.startsWith('http') ? image : `/properties/${image}`;
  return (
     <section>
      <div className="container-xl m-auto">
        <div className="grid grid-cols-1">
          <Image
            src={url}
            alt=""
            className="object-cover h-[500px] w-full"
            width={0}
            height={0}
            sizes="100vw"
          />
        </div>
      </div>
    </section>
  )
}

export default PropertyHeaderImage