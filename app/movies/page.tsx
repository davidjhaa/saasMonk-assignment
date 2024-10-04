'use client'

import { useState } from 'react';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';
import MovieForm from '../components/MovieForm';
import ReviewForm from '../components/ReviewForm';
import ReviewsModal from '../components/ReviewModal';
import { FaEdit, FaTrash } from 'react-icons/fa';


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


  const movies: Movie[] = [
    { id: 1, name: 'Star Wars: A New Hope', releaseDate: '2022-08-01', rating: 9 },
    { id: 2, name: 'The Empire Strikes Back', releaseDate: '1980-05-21', rating: 8.5 },
  ];

  const reviews: Review[] = [
    { id: 1, movieId: 1, author: 'Amitav Khandelwal', content: 'This is the best movie ever! I really enjoyed it.', rating: 9 },
    { id: 2, movieId: 1, author: 'John Doe', content: 'Amazing effects and story!', rating: 8 },
    { id: 3, movieId: 2, author: 'Jane Smith', content: 'Great sequel to the original.', rating: 8.5 },
  ];

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsReviewsModalVisible(true);
  };

  const getReviewsForMovie = (movieId: number) => {
    return reviews.filter((review) => review.movieId === movieId);
  };

  const filteredMovies = movies.filter(movie =>
    movie.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = () => {
    alert(`Edit movie: `);
  };

  const handleDelete = () => {
    // Handle delete functionality here
    alert(`Delete movie: `);
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

      {/* second child */}
      <div className='p-5 bg-white'>
        <h1 className='text-black text-3xl mb-4'>The best movie review site!</h1>
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="border rounded-lg p-4 bg-purple-100 cursor-pointer"
              onClick={() => handleMovieClick(movie)}
            >
              <div className="bg-purple-100 p-4 rounded-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{movie.name}</h2>
                <p className="text-gray-600 mb-2">
                  Released: {new Date(movie.releaseDate).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
                <p className="font-medium text-gray-800 mb-4">Rating: {movie.rating}/10</p>

                <div className="flex justify-end space-x-3">
                  <button className="text-blue-500 hover:text-blue-700" onClick={handleEdit}>
                    <FaEdit size={18} />
                  </button>
                  <button className="text-red-500 hover:text-red-700" onClick={handleDelete}>
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
            reviews={getReviewsForMovie(selectedMovie.id)}
            onClose={() => setIsReviewsModalVisible(false)}
          />
        )}

        {isMovieFormVisible && <MovieForm onClose={() => setIsMovieFormVisible(false)} />}

        {isReviewFormVisible && (
          <ReviewForm
            movies={movies}
            onClose={() => setIsReviewFormVisible(false)}
          />
        )}
      </div>
    </div >
  );
};

export default HomePage;
