import { BASE_URL } from '@/lib/constants'
import { urlFor } from '@/lib/image-builder'

const MovieJSONLD = ({ record }) => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Movie',
    name: record.title,
    url: `${BASE_URL}titles/${record.slug}`,
    image: urlFor(record.image.asset._ref).width(500).url(),
    thumbnailUrl: urlFor
    (record.image.asset._ref).width(500).url(),
    description: record.description,
    dateCreated: record.createdAt,
    datePublished: record.createdAt,
    keywords: (record.genres.map(x => `${record} Best ${x} Movie`)).join(", "),
    genre: (record.genres.map(x => `${x}`)).join(", "),
    director: {
      "@type": "Person",
      name: (record?.director_id?.map(x => x.label))?.join()
    },
    actor: record?.casts?.map(x => ({
      "@type": "Person",
      "name": x.label
    }))
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export default MovieJSONLD
