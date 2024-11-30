import { BASE_URL } from '@/lib/constants'
import { getImageURL } from '@/lib/functions'

const PersonJSONLD = ({record}) => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: record.full_name,
    url: `${BASE_URL}peoples/${record.slug}`,
    image: getImageURL("persons", record.image),
    description: record.bio,
    alternateName: record.nick_names,
    birthDate: record.born,
    birthPlace: record.birth_place,
    height: record.height,
    deathDate: record.died ? record.died : "",
    deathPlace: record.death_place ? record.death_place : "",
    gender: record.gender,
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export default PersonJSONLD
