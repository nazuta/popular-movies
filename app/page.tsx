import { getPopularMovies } from '@/lib/movies'
import { MovieCard } from '@/components/movie-card'

export default async function Home() {
  try {
    const { results: movies } = await getPopularMovies()

    return (
      <main className="container py-6 md:py-12">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">Popular Movies</h1>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      </main>
    )
  } catch (error) {
    console.error('Error in Home component:', error)
    
    let errorMessage = 'An unexpected error occurred'
    if (error instanceof Error) {
      errorMessage = error.message
    }

    return (
      <main className="container py-6 md:py-12">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">Popular Movies</h1>
          <p className="text-red-500">
            Sorry, we couldn't load the movies at this time. Please try again later.
          </p>
          <p className="text-sm text-gray-500">Error details: {errorMessage}</p>
        </div>
      </main>
    )
  }
}

