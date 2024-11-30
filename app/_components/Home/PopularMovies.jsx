"use client"
import { getPopularMovies } from '@/actions/common.action';
import { Skeleton } from '@/components/ui/skeleton';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react'

const MovieCard = dynamic(() => import('@/components/MovieCard'), {
  loading: () => <p></p>,
})

const PopularMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const loadPopularPersons = async () => {
      setMovies(await getPopularMovies());
      setLoading(false)
    }

    loadPopularPersons();
  }, [])
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-4xl">Popular Movies</h2>
            <p className="max-w-[900px] text-gray-800 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Check out the latest and greatest movies in our database.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          {
            loading && 
            <>
            <Skeleton className="h-[300px] w-full sm:w-[300px] rounded-xl border-white" />
            <Skeleton className="h-[300px] w-full sm:w-[300px] rounded-xl border-white" />
            <Skeleton className="h-[300px] w-full sm:w-[300px] rounded-xl border-white" />
            <Skeleton className="h-[300px] w-full sm:w-[300px] rounded-xl border-white" />
            </>
          }

          {!loading && movies.length > 0 && movies.map((movie) => <MovieCard key={movie.id} title={movie} />)}
        </div>
        {!loading && movies.length === 0 && <p className="my-4 text-center">No upcoming movies. Stay Tuned</p>}
      </div>
    </section>
  )
}

export default PopularMovies