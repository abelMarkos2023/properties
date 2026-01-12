"use client";

import {
  checkBookmarkStatus,
  toggeleBookmarkedProperty,
} from "@/actions/properties.action";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { FaBookmark } from "react-icons/fa";
import { toast } from "react-toastify";

const BookmarkButton = ({ property }) => {
  const { data: session } = useSession();

  const userId = session?.user?.id;

  const [loading, setLoading] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleBookmarkProperty = async () => {
    if (!userId) {
      toast.error("You must be logged in to bookmark properties");
      return;
    }

    setLoading(true);

    const { message, bookmarked } = await toggeleBookmarkedProperty(
      property._id
    );

    toast.success(message);
    setLoading(false);
    setIsBookmarked(bookmarked);
  };

  useEffect(() => {
    checkBookmarkStatus(property._id)
      .then((res) => setIsBookmarked(res.isBookmarked))
      .catch((err) => toast.error(err.message));
  }, []);
  return isBookmarked ? (
    <button
      className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center cursor-pointer"
      onClick={handleBookmarkProperty}
    >
      <FaBookmark className="mr-2" />
      {loading ? (
        <span className="flex items-center gap-2">
          <span>Removing Bookmark...</span>
          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
        </span>
      ) : 
        (<span>Remove Bookmark</span>)
      }
    </button>
  ) : (
    <button
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center cursor-pointer"
      onClick={handleBookmarkProperty}
    >
      <FaBookmark className="mr-2" /> {loading ? (
        <span className="flex items-center gap-2">
          <span>Adding Bookmark...</span>
          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
        </span>
      ) : (
        <span>Add Bookmark</span>
      )}
    </button>
  );
};

export default BookmarkButton;
