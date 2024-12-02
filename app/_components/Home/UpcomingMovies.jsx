"use client"

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { useEffect, useState } from "react";
import { getUpcomingMovies } from "@/actions/common.action";
import CarouselSkeleton from "@/components/CarouselSkeleton";
import dynamic from "next/dynamic";

const MovieCard = dynamic(() => import('@/components/MovieCard'), {
  loading: () => <p></p>,
})

const UpcomingMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const loadingUpcomingMovies = async () => {
      const data = await getUpcomingMovies((new Date()).toISOString());
      setMovies(data);
      setLoading(false)
    }
    loadingUpcomingMovies();
  }, [])

  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32 px-8">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tighter sm:text-4xl">Coming Soon</h2>
              <p className="max-w-[900px] text-gray-800 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Get a Sneak Peek at Upcoming Blockbusters
              </p>
            </div>
          </div>

          {loading && <CarouselSkeleton />}
          {
            !loading && movies.length > 0 &&
            <Carousel className="w-full my-4">
              <CarouselContent className="-ml-2 md:-ml-4">
                {movies.map((movie, index) =>
                  <CarouselItem key={index} className="pl-2 basis-1/1 md:basis-1/2 lg:basis-1/3 rounded-xl ">
                    <MovieCard key={movie.id} title={movie} isCarosouel={true} isVertical={false} />
                  </CarouselItem>
                )}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          }

          {!loading && movies.length === 0 && <p className="my-4 text-center">No upcoming movies. Stay Tuned</p>}

        </div>
      </section>
    </>
  )
}

export default UpcomingMovies