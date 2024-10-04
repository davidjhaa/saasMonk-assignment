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
      <div className="bg-white p-5 rounded-lg shadow-lg max-w-2xl w-full">
        <h2 className="text-2xl font-bold mb-4">{movieName}</h2>
        {reviews.length > 0 ? (
          <ul className="space-y-4">
            {reviews.map((review) => (
              <li key={review.id} className="border p-4 rounded-lg shadow-sm">
                <p className="text-gray-700">{review.content}</p>
                <p className="text-sm text-gray-500">By {review.author}</p>
                <p className="text-sm text-purple-600">Rating: {review.rating}/10</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No reviews available for this movie.</p>
        )}
        <button className="mt-4 text-red-500" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ReviewsModal;
