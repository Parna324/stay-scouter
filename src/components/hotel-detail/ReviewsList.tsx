
import { Hotel } from "@/types/hotel";
import { Star } from "lucide-react";

interface ReviewsListProps {
  hotel: Hotel;
}

export const ReviewsList = ({ hotel }: ReviewsListProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Guest Reviews</h2>
        <div className="flex items-center">
          <Star className="h-5 w-5 text-yellow-500 fill-yellow-500 mr-1" />
          <span className="font-bold text-lg">{hotel.rating}</span>
          <span className="text-gray-500 dark:text-gray-400 ml-1">
            ({hotel.reviews.length} reviews)
          </span>
        </div>
      </div>
      
      <div className="space-y-6">
        {hotel.reviews.map((review) => (
          <div key={review.id} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0 last:pb-0">
            <div className="flex justify-between items-start">
              <div className="flex items-center">
                {review.user.avatar ? (
                  <img
                    src={review.user.avatar}
                    alt={review.user.name}
                    className="h-10 w-10 rounded-full mr-3"
                  />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center mr-3">
                    <span className="text-gray-600 dark:text-gray-300">
                      {review.user.name.charAt(0)}
                    </span>
                  </div>
                )}
                <div>
                  <h4 className="font-medium">{review.user.name}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(review.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                <span className="ml-1 font-medium">{review.rating}</span>
              </div>
            </div>
            <p className="mt-3 text-gray-700 dark:text-gray-300">
              {review.comment}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
