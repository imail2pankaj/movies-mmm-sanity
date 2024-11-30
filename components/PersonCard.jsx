// import { getImageURL } from '@/lib/functions'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from './ui/badge'
import { MotionDiv } from "./MotionDiv";

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const PersonCard = ({ person, index = 1 }) => {
  return (
    <Link area-label={`${person.full_name} age, ${person.full_name} movies, ${person.full_name} height, `} href={`/peoples/${person.slug}`} className="group relative rounded-xl overflow-hidden" prefetch={false}>
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
        {/* <Image
          src={getImageURL("persons", person.image)}
          width={500}
          height={450}
          alt={person.person_types_in_persons ? person.person_types_in_persons.map(type => `Popular ${type.person_types.title} ${person.full_name}`) : person.full_name}
          loading='lazy'
          priority={false}
          className="aspect-[3/4] md:aspect-[2/3] object-cover group-hover:scale-105 transition-transform duration-300"
        /> */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/100 to-transparent group-hover:from-gray-900/60 transition-colors duration-300" />
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-gray-900 to-transparent">
          <h3 className="text-lg font-semibold text-white">{person.full_name}</h3>
          {person.person_types_in_persons && person.person_types_in_persons.map(type => <Badge key={`${type.person_id}-${type.person_type_id}`} className="me-1 text-xs">{type.person_types.title}</Badge>)}
          <p className='text-white mt-2 text-sm'>{person?.bio?.substr(0, 60)}...</p>
        </div>
      </MotionDiv>
    </Link >
  )
}

export default PersonCard