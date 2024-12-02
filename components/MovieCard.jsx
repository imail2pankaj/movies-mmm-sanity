// import { getImageURL } from '@/lib/functions'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from './ui/badge'
import { MotionDiv } from "./MotionDiv";
import { urlFor } from '@/lib/image-builder';

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const MovieCard = ({ title, index = 1, isCarosouel = false, isVertical = true }) => {

  const titles = title.genres ? title.genres.map(type => `Popular ${type} ${title.title} Movie`) : title.title;

  return (
    <Link aria-label={titles} href={`/movies/${title.slug.current}`} className="group relative rounded-xl overflow-hidden" prefetch={false}>
      <MotionDiv
        variants={variants}
        initial="hidden"
        animate="visible"
        transition={{
          delay: index * 0.2,
          ease: "easeInOut",
          duration: 0.5,
        }}
        viewport={{ amount: 0 }}
      >
        <Image
          src={urlFor(title.image.asset._ref).width(500).url()}
          width={500}
          height={450}
          alt={titles}
          loading='lazy'
          priority={false}
          className={`h-[300px] object-cover ${!isCarosouel && "group-hover:scale-105 transition-transform duration-300"}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/100 to-transparent group-hover:from-gray-900/60 transition-colors duration-300" />
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-gray-900 to-transparent">
          <h3 className="text-lg font-semibold text-white">{title.title}</h3>
          {title.genres && title.genres.map(type => <Badge key={`${type}`} className="me-1 text-xs">{type}</Badge>)}
          {title?.details && <p className='text-white mt-2 text-sm'>{title?.details.substr(0, 80)}...</p>}
        </div>
      </MotionDiv>
    </Link >
  )
}

export default MovieCard