import ReviewCard from '../../components/ReviewModal';

export async function getServerSideProps({ params }: { params: { id: string } }) {
  const movie = await prisma.movie.findUnique({
    where: { id: parseInt(params.id, 10) },
    include: { reviews: true },
  });
  
  return { props: { movie } };
}

export default function MovieDetailsPage({ movie }: { movie: any }) {
  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">{movie.name}</h1>
      <p>Released on {new Date(movie.releaseDate).toLocaleDateString()}</p>
      <h2 className="text-2xl mt-8 mb-4">Reviews</h2>

      {movie.reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        movie.reviews.map((review) => <ReviewCard key={review.id} review={review} />)
      )}
    </div>
  );
}
