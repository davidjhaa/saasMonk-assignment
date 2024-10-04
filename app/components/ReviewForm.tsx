interface ReviewFormProps {
  movies: { id: number; name: string }[];
  onClose: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ movies, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center text-black">
      <div className="bg-white p-5 rounded-lg shadow-lg w-[500px]">
        <h2 className="text-xl mb-4 text-black">Add New Review</h2>
        <form>
          <select className="border p-2 mb-4 w-full text-black">
            <option>Select a movie</option>
            {movies.map((movie) => (
              <option key={movie.id} value={movie.id}>
                {movie.name}
              </option>
            ))}
          </select>
          <input type="text" placeholder="Your name" className="border p-2 mb-4 w-full" />
          <input type="number" placeholder="Rating out of 10" className="border p-2 mb-4 w-full" />
          <textarea rows={6} placeholder="Review comments" className="border p-2 mb-4 w-full resize-none" />
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
    </div>
  );
};

export default ReviewForm;
