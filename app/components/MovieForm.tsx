interface MovieFormProps {
    onClose: () => void;
  }
  
  const MovieForm: React.FC<MovieFormProps> = ({ onClose }) => {
    return (
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center text-black">
        <div className="bg-white p-5 rounded-lg shadow-lg w-[500px]">
          <h2 className="text-xl mb-4">Add New Movie</h2>
          <form>
            <input type="text" placeholder="Name" className="border p-2 mb-4 w-full" />
            <input type="date" placeholder="Release date" className="border p-2 mb-4 w-full" />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full"
            >
              Create movie
            </button>
          </form>
          <button className="mt-2 text-red-500" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    );
  };
  
  export default MovieForm;
  