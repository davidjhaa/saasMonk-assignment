import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

interface Movie {
  _id: string;
  movieName: string;
}

interface Review {
  reviewerName: string;
  comment: string;
  rating: number;
}

interface ReviewFormProps {
  movies: Movie[];
  onClose: () => void;
  review?: Review; 
}

const ReviewForm: React.FC<ReviewFormProps> = ({ onClose, movies }) => {
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState('');


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("id - ",selectedMovieId)
    if (!selectedMovieId || !rating || !comment) {
      toast.error("Movie, rating, and comment are required");
    return;
    }

    try {
      const response = await axios.post('https://saas-monk-backend-rho.vercel.app/api/v1/review', {
        movieId: selectedMovieId, 
        author, 
        rating, 
        comment, 
      });

      if (response.status === 201 || response.status === 200) {
        toast.success('Review added successfully!');
        setTimeout(() => {
          onClose();
        }, 3000);
      } else {
        toast.error('Failed to add review, please try again');
      }
    } catch (error) {
      console.error('Error adding review:', error);
      toast.error('Error submitting review, please try again');
    }

    setSelectedMovieId(null);
    setAuthor('');
    setRating(null);
    setComment('');
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center text-black">
      <div className="bg-white p-5 rounded-lg shadow-lg w-[500px]">
        <h2 className="text-xl mb-4 text-black">Add New Review</h2>
        <form onSubmit={handleSubmit}>
          <select
            className="border p-2 mb-4 w-full text-black"
            value={selectedMovieId || ''}
            onChange={(e) => setSelectedMovieId(e.target.value)}
          >
            <option value="">Select a movie</option>
            {movies.map((movie) => (
              <option key={movie._id} value={movie._id} className='text-black'>
                {movie?.movieName}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Your name"
            className="border p-2 mb-4 w-full"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <input
            type="number"
            placeholder="Rating out of 10"
            className="border p-2 mb-4 w-full"
            value={rating || ''}
            onChange={(e) => setRating(Number(e.target.value))}
            max={10}
            min={1}
          />
          <textarea
            rows={6}
            placeholder="Review comments"
            className="border p-2 mb-4 w-full resize-none"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            type="submit"
            className="bg-purple-500 text-white px-4 py-2 rounded-lg w-full"
          >
            Add review
          </button>
        </form>
        <button className="mt-2 text-red-500" onClick={onClose}>
          Close
        </button>
      </div>
      <ToastContainer position="top-right"
        autoClose={2500}
        hideProgressBar={true} />
    </div>
  );
};

export default ReviewForm;
