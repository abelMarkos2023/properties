import Link from 'next/link'
import React from 'react'

const Pagination = ({page,totalPages}) => {
  return (
    <div className="container mx-auto p-8 flex justify-center items-center">
        {
            page > 1 && (
                <Link href={`/properties/?page=${page > 1 ? page - 1 : 1}`} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg">
        Prev
        </Link>
            )
        }

        <span className="mx-2">Page {page} of {totalPages}</span>
        {
            page < totalPages && (
                <Link href={`/properties/?page=${page < totalPages ? page + 1 : totalPages}`} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg">Next</Link>
            )
        }
    </div>
  )
}

export default Pagination