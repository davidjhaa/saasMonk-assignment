'use client'

import { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import MovieForm from '../components/MovieForm';
import ReviewForm from '../components/ReviewForm';
import ReviewsModal from '../components/ReviewModal';
import { FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';

interface Movie {
  id: number;
  name: string;
  releaseDate: string;
  rating: number;
}

interface Review {
  id: number;
  movieId: number;
  author: string;
  content: string;
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
  }, [isMovieFormVisible]);

  const handleSearch = async (query: string) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/v1/movies/search?query=${query}`);
      setMovies(response.data); // Update the state with search results
    } catch (error) {
      console.error('Error searching movies:', error);
    }
  };

  const handleMovieClick = async (movie: Movie) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/v1/review?id=${movie.id}`); // Use movie.id
      setReviews(response.data);
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

  const handleDelete = (movie: Movie) => {
    alert(`Delete movie: ${movie.name}`);
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
              key={movie.id}
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
                <p className="font-medium text-gray-800 mb-4">Rating: {movie.rating}/10</p>

                <div className="flex justify-end space-x-3">
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={(e) => handleEdit(e, movie)} // Pass `e` here
                  >
                    <FaEdit size={18} />
                  </button>
                  <button className="text-red-500 hover:text-red-700" onClick={() => handleDelete(movie)}>
                    <FaTrash size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {isReviewsModalVisible && selectedMovie && (
          <ReviewsModal
            movieName={selectedMovie.name}
            reviews={reviews}
            onClose={() => setIsReviewsModalVisible(false)}
          />
        )}

        {isMovieFormVisible && (
          <MovieForm
            onClose={() => {
              setIsMovieFormVisible(false);
              setSelectedMovie(null); 
            }}
            movie={selectedMovie} // Pass selectedMovie to pre-fill the form
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
