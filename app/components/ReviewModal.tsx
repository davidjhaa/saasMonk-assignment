import { FaEdit, FaTrash } from 'react-icons/fa';

interface Review {
  id: number;
  author: string;
  content: string;
  rating: number;
}

interface ReviewsModalProps {
  movieName: string;
  reviews: Review[];
  onClose: () => void;
}

const ReviewsModal: React.FC<ReviewsModalProps> = ({ movieName, reviews, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg shadow-lg max-w-2xl w-full h-[540px] overflow-auto">
        <div>
          <h2 className="text-2xl text-black font-bold mb-4">{movieName}</h2>
          {/* <h1>{avgRating}</h1> */}
        </div>
        {reviews.length > 0 ? (
          <ul className="space-y-4">
            {reviews.map((review) => (
              <li key={review.id} className="border p-4 rounded-lg shadow-sm">
                <div className="flex justify-between px-3 py-2">
                  <p className="text-gray-700">{review.comment}</p>
                  <p className="text-sm text-purple-600">Rating: {review.rating}/10</p>
                </div>
                <div className="flex justify-between px-4 py-2">
                  <p className="text-sm text-gray-500">By {review.reviewerName}</p>
                  <div className='flex gap-2'>
                    <FaEdit size={18} className='cursor-pointer'/>
                    <FaTrash size={18} className='cursor-pointer'/>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-black text-2xl">No reviews available for - "{movieName}".</p>
        )}
        <button className="mt-4 text-red-500" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ReviewsModal;
