import { BASE_URL } from '@/lib/constants'
// import { getImageURL } from '@/lib/functions'

const MovieJSONLD = ({ record }) => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Movie',
    name: record.title,
    url: `${BASE_URL}titles/${record.slug}`,
    // image: getImageURL("titles", record.image),
    // thumbnailUrl: getImageURL("titles", record.image),
    description: record.description,
    dateCreated: record.created_at,
    datePublished: record.created_at,
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
