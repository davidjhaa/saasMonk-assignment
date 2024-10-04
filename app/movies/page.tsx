'use client'

import { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import MovieForm from '../components/MovieForm';
import ReviewForm from '../components/ReviewForm';
import ReviewsModal from '../components/ReviewModal';
import { FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';

interface Movie {
  _id: string;
  movieName: string;
  releaseDate: string;
  averageRating: number;
}

interface Review {
  _id: string;
  reviewerName: string;
  comment: string;
  rating: number;
}

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isMovieFormVisible, setIsMovieFormVisible] = useState(false);
  const [isReviewFormVisible, setIsReviewFormVisible] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isReviewsModalVisible, setIsReviewsModalVisible] = useState<boolean>(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/v1/movies');
        setMovies(response.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, [isMovieFormVisible, isReviewFormVisible]);

  const handleSearch = async (query: string) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/v1/movies/search?query=${query}`);
      setMovies(response.data); 
    } catch (error) {
      console.error('Error searching movies:', error);
    }
  };

  const handleMovieClick = async (movie: Movie) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/v1/review?id=${movie._id}`); 
      // console.log(response.data)
      setReviews(response.data.reviews);
      setSelectedMovie(movie);
      setIsReviewsModalVisible(true);
    } catch (error) {
      console.error('Error fetching reviews for movie:', error);
    }
  };

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>, movie: Movie) => {
    e.stopPropagation();
    setSelectedMovie(movie);
    setIsMovieFormVisible(true);
    setIsReviewsModalVisible(false);
  };

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>, movie: Movie) => {
    e.stopPropagation();
    setIsReviewsModalVisible(false);
    const confirmDelete = window.confirm(`Are you sure you want to delete the movie "${movie.movieName}"?`);
    
    if (!confirmDelete) return;
  
    try {
      await axios.delete(`http://localhost:3001/api/v1/movies/${movie._id}`);
      
      setMovies((prevMovies) => prevMovies.filter((m) => m._id !== movie._id));
      
      alert(`"${movie.movieName}" deleted successfully.`);
    } 
    catch (error) {
      console.error('Error deleting movie:', error);
      alert('Failed to delete the movie. Please try again.');
    }
  };
  

  return (
    <div className="min-h-screen bg-white">
      <header className="flex justify-between items-center bg-slate-200 px-5 py-2 mb-4">
        <h1 className="text-xl text-black">MOVIECRITIC</h1>
        <div className="flex justify-center">
          <button
            onClick={() => setIsMovieFormVisible(true)}
            className="bg-blue-500 text-blue px-2 py-2 rounded-lg mr-2"
          >
            Add new movie
          </button>
          <button
            onClick={() => setIsReviewFormVisible(true)}
            className="bg-purple-500 text-white px-4 py-2 rounded-lg">
            Add new review
          </button>
        </div>
      </header>

      <div className='p-5 bg-white'>
        <h1 className='text-black text-3xl mb-4'>The best movie review site!</h1>
        <SearchBar value={searchTerm} onChange={setSearchTerm} onSearch={handleSearch} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {movies.map((movie) => (
            <div
              key={movie._id}
              className="border rounded-lg p-4 bg-purple-100 cursor-pointer"
              onClick={() => handleMovieClick(movie)}
            >
              <div className="bg-purple-100 p-4 rounded-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{movie.movieName}</h2>
                <p className="text-gray-600 mb-2">
                  Released: {new Date(movie.releaseDate).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
                <p className="font-medium text-gray-800 mb-4">Rating: {movie.averageRating}/10</p>

                <div className="flex justify-end space-x-5">
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={(e) => handleEdit(e, movie)}
                  >
                    <FaEdit size={24} />
                  </button>
                  <button 
                    className="text-red-500 hover:text-red-700" 
                    onClick={(e) => handleDelete(e, movie)}
                  >
                    <FaTrash size={24} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {isReviewsModalVisible && selectedMovie && (
          <ReviewsModal
            movieName={selectedMovie.movieName}
            reviews={reviews}
            setReviews = {setReviews}
            movie={selectedMovie}
            onClose={() => setIsReviewsModalVisible(false)}
          />
        )}

        {isMovieFormVisible && (
          <MovieForm
            onClose={() => {
              setIsMovieFormVisible(false);
              setSelectedMovie(null);
            }}
            movie={selectedMovie}
          />
        )}

        {isReviewFormVisible && (
          <ReviewForm
            movies={movies}
            onClose={() => setIsReviewFormVisible(false)}
          />
        )}
      </div>
    </div>
  );
};

export default HomePage;
