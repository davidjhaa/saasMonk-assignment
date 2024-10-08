import { FaEdit, FaTrash } from 'react-icons/fa';

interface Review {
  reviewerName: string;
  comment: string;
  rating: number;
}

interface Movie {
  _id: string;
  movieName: string;
  releaseDate: string;
  averageRating: number;
}

interface ReviewsModalProps {
  movieName: string; 
  movie: Movie | null;
  reviews: Review[];
  onClose: () => void;
}


const ReviewsModal: React.FC<ReviewsModalProps> = ({ movieName, movie, reviews, onClose }) => {
  
  const handleEditReview = () => {
    // setSelectedReview(review);
    // setIsReviewFormVisible(true);
  };

  const handleDeleteReview = async () => {
    // const confirmDelete = window.confirm('Are you sure you want to delete this review?');
  
    // if (!confirmDelete) return;
    // console.log("delete ",movie._id)
  
    // try {
    //   await axios.delete(`https://saas-monk-backend-rho.vercel.app/api/v1/review/${movie._id}/review/${idx}`);
    //   alert('Review deleted successfully!');
    //   setReviews((prevReviews) => prevReviews.filter((_, index) => index !== idx));

    //   alert('Review deleted successfully!');
    // } 
    // catch (error) {
    //   console.error('Error deleting review:', error);
    //   alert('Failed to delete the review. Please try again.');
    // }
  };
  

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg shadow-lg max-w-2xl w-full h-[540px] overflow-auto">
        <div className='flex justify-between items-center mb-5'>
          <h2 className="text-2xl text-black font-bold mb-4">{movieName}</h2>
          <h1 className='text-4xl text-blue-700'>{`${movie?.averageRating}/10`}</h1>
        </div>
        {reviews.length > 0 ? (
          <ul className="space-y-4">
            {reviews.map((review, idx) => (
              <li key={idx} className="border p-4 rounded-lg shadow-sm">
                <div className="flex justify-between px-3 py-2">
                  <p className="text-gray-700">{review.comment}</p>
                  <p className="text-sm text-purple-600">Rating: {review.rating}/10</p>
                </div>
                <div className="flex justify-between px-4 py-2">
                  <p className="text-sm text-gray-500">By {review.reviewerName}</p>
                  <div className='flex gap-2'>
                    <FaEdit size={18} className='cursor-pointer' onClick={() => handleEditReview()} />
                    <FaTrash size={18} className='cursor-pointer' onClick={()=>handleDeleteReview()} />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-black text-2xl">No reviews available for - {movieName}.</p>
        )}
        <button className="mt-4 text-red-500" onClick={onClose}>
          Close
        </button>
      </div>

      {/* {isReviewFormVisible && selectedReview && (
        <ReviewForm
          review={selectedReview}
          onClose={() => setIsReviewFormVisible(false)}
          // fetchReviews={reviews}  
        />
      )} */}
    </div>
  );
};

export default ReviewsModal;
