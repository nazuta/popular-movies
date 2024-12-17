const TMDB_API_URL = 'https://api.themoviedb.org/3'
const TMDB_IMAGE_URL = 'https://image.tmdb.org/t/p'

export async function getPopularMovies() {
  if (!process.env.TMDB_API_KEY) {
    throw new Error('TMDB_API_KEY is not set in environment variables')
  }

  try {
    const res = await fetch(`${TMDB_API_URL}/movie/popular`, {
      headers: {
        'Authorization': `Bearer ${process.env.TMDB_API_KEY}`,
        'Content-Type': 'application/json'
      },
      next: { revalidate: 3600 }
    })
    
    if (!res.ok) {
      const errorText = await res.text()
      console.error('API response not ok:', res.status, res.statusText, errorText)
      throw new Error(`API response not ok: ${res.status} ${res.statusText}. ${errorText}`)
    }

    const data = await res.json()
    return data as MovieResponse
  } catch (error) {
    console.error('Failed to fetch movies:', error)
    throw error
  }
}

export function getImagePath(path: string, size: 'original' | 'w500' = 'w500') {
  return `${TMDB_IMAGE_URL}/${size}${path}`
}

