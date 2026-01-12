'use client'

import React from 'react'
import { FacebookIcon, FacebookShareButton, LinkedinIcon, LinkedinShareButton, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton, EmailIcon, EmailShareButton, TelegramIcon, TelegramShareButton } from 'react-share'

const ShareButtons = ({property}) => {
  const siteDomain = process.env.NEXT_PUBLIC_SITE_DOMAIN || 'http://localhost:3000';
  const propertyUrl = `${siteDomain}/properties/${property._id}`;
  return (
    <>
    <h2 className="text-2xl font-bold text-center">
      Share this property on
    </h2>
    <div className="flex gap-2 justify-center items-center">
       <FacebookShareButton url={propertyUrl} quote={property.name} className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition">
        <FacebookIcon size={32} className='rounded-full' />
       </FacebookShareButton>
       <LinkedinShareButton url={propertyUrl} title={property.name} className="bg-blue-700 text-white px-4 py-2 rounded-full hover:bg-blue-800 transition">
       <LinkedinIcon size={32} className='rounded-full' />
       </LinkedinShareButton>
       <TwitterShareButton url={propertyUrl} hashtags={[`${property.type.replace(/\s/,'')}forRent`]} title={property.name} className="bg-blue-400 text-white px-4 py-2 rounded-full hover:bg-blue-500 transition">
       <TwitterIcon size={32} className='rounded-full' />
       </TwitterShareButton>
       <WhatsappShareButton url={propertyUrl} title={property.name} className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition">
       <WhatsappIcon size={32} className='rounded-full' />
       </WhatsappShareButton>
       <EmailShareButton url={propertyUrl} subject={property.name} className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition">
       <EmailIcon size={32} className='rounded-full' />
       </EmailShareButton>
       <TelegramShareButton url={propertyUrl} title={property.name} className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition">
       <TelegramIcon size={32} className='rounded-full' />
       </TelegramShareButton>
    </div>
    </>
  )
}

export default ShareButtons