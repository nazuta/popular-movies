import Image from 'next/image'
import { Star } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'
import { getImagePath } from '@/lib/movies'
import type { Movie } from '@/types/movie'

interface MovieCardProps {
  movie: Movie
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <Card className="overflow-hidden group">
      <div className="relative aspect-[2/3]">
        <Image
          src={getImagePath(movie.poster_path)}
          alt={movie.title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <CardContent className="p-4">
        <h2 className="font-semibold truncate">{movie.title}</h2>
        <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Star className="w-4 h-4 fill-primary text-primary mr-1" />
            {movie.vote_average.toFixed(1)}
          </div>
          <span>•</span>
          <div>{new Date(movie.release_date).getFullYear()}</div>
        </div>
      </CardContent>
    </Card>
  )
}

