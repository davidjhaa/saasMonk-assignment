import { FaEdit, FaTrash } from 'react-icons/fa';

type MovieProps = {
  movie: {
    id: number;
    name: string;
    releaseDate: string;
    rating: number;
  };
};

const MovieCard = ({ movie }: MovieProps) => {
  const handleEdit = () => {
    alert(`Edit movie: ${movie.name}`);
  };

  const handleDelete = () => {
    // Handle delete functionality here
    alert(`Delete movie: ${movie.name}`);
  };

  return (
    <div className="bg-purple-100 p-4 rounded-lg shadow-md">
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
  );
};

export default MovieCard;
