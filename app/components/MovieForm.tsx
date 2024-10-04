import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useState , useEffect} from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Movie {
  _id: string;
  movieName: string;
  releaseDate: string;
  averageRating: number;
}

interface MovieFormProps {
  onClose: () => void;
  movie?: Movie; 
}


const MovieForm: React.FC<MovieFormProps> = ({ onClose , movie}) => {
  const [movieName, setMovieName] = useState('');
  const [releaseDate, setReleaseDate] = useState<Date | null>(null); 

  useEffect(() => {
    if (movie) {
      setMovieName(movie.movieName); 
      setReleaseDate(movie.releaseDate ? new Date(movie.releaseDate) : null);
    } else {
      setMovieName(''); 
      setReleaseDate(null); 
    }
  }, [movie]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'movieName') {
      setMovieName(value);
    } 
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!movieName || !releaseDate) {
      toast.error('Movie name and release date are required.');
      return;
    }

    try {
      const response = movie
        ? await axios.put(`https://saas-monk-backend-rho.vercel.app/api/v1/movies/${movie._id}`, {
            movieName,
            releaseDate,
          })
        : await axios.post('https://saas-monk-backend-rho.vercel.app/api/v1/movies', {
            movieName,
            releaseDate,
          });

      console.log('Movie saved:', response.data);
      toast.success(movie ? 'Movie updated successfully!' : 'Movie created successfully!');

      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Error saving movie:', error);
      toast.error('Failed to save movie. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center text-black">
      <div className="bg-white p-5 rounded-lg shadow-lg w-[500px]">
        <h2 className="text-xl font-bold mb-4">{movie ? 'Edit Movie' : 'Add New Movie'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="movieName" 
            placeholder="Name"
            className="border p-2 mb-4 w-full"
            value={movieName}
            onChange={handleChange} 
          />
          <DatePicker
            selected={releaseDate}
            className="border p-2 mb-4 w-full cursor-pointer"
            onChange={(date: Date | null) => setReleaseDate(date)}
            placeholderText='Select Release Date'
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full"
          >
            {movie ? 'Update movie' : 'Create movie'}
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

export default MovieForm;
