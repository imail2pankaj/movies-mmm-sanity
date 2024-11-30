import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Skeleton } from "@/components/ui/skeleton"

const CarouselSkeleton = () => {
  return (
    <Carousel className="w-full my-4">
      <CarouselContent className="-ml-1 md:-ml-4">
        {[0, 1, 2].map((index) =>
          <CarouselItem key={index} className="pr-1 basis-1/1 md:basis-1/2 lg:basis-1/3 rounded-xl ">
            <div className="flex flex-col space-y-3">
              <Skeleton className="h-[330px] w-[300px] md:w-full rounded-xl border-white" >
              </Skeleton>
            </div>
          </CarouselItem>
        )}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

export default CarouselSkeleton