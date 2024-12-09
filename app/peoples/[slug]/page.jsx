import { getPersonBySlug } from '@/actions/common.action'
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { parseDate, queryParseDate } from '@/lib/utils';
import { ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Accordion } from '@/components/ui/accordion';
import dynamic from 'next/dynamic';
import { urlFor } from '@/lib/image-builder';

const PeopleAndPeopleTypeMovies = dynamic(() => import('../_component/PeopleAndPeopleTypeMovies'), {
  loading: () => <p></p>,
})

const PersonJSONLD = dynamic(() => import('@/components/PersonJSONLD'), {
  loading: () => <p></p>,
})


export async function generateMetadata({ params }, parent) {

  const slug = params.slug

  // fetch data
  const person = await getPersonBySlug(slug);

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []
  const title = person?.person_type_id?.map(x => `Popular ${x.label} ${person.fullName}`)
  return {
    title: title?.join(" | "),
    openGraph: {
      title: title?.join(" | "),
      description: person.description,
      images: [urlFor(person.image.asset._ref).width(500).url(), ...previousImages],
    },
  }
}

const PersonalDetail = async ({ params: { slug } }) => {

  const person = await getPersonBySlug(slug);
console.log(person)
  return (
    <>
      <PersonJSONLD record={person} />
      <section className="bg-gray-900 text-white py-6 md:py-8 lg:py-10">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6  break-all">
            <div className="w-48 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full overflow-hidden border-4 border-gray-800 dark:border-gray-700">
              <Image
                src={urlFor(person.image.asset._ref).width(500).url()}
                alt={person.person_type_id.map(x => `Popular ${x.label} ${person.fullName}, Best ${x.label} ${person.fullName}`).join(" | ")}
                width={192}
                height={192}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold">{person.fullName}</h1>
              <p className="text-gray-300 mt-2 text-sm md:text-md lg:text-xl">
                {person.bio}
              </p>
              <div className="flex items-center gap-2 mt-4">
                {person.person_type_id.map(x => <Link key={x.value} href={`/peoples?type=${x.value}`}><Badge className="me-1 text-xs">{x.label}</Badge></Link>)}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-6 md:py-8 lg:py-10">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8">About {person.fullName}</h2>
          <div className="grid grid-cols-1 gap-8">
            <div>
              <p className="text-gray-500 dark:text-gray-400"
                dangerouslySetInnerHTML={{
                  __html: person.description.replaceAll('\n', '<br/>'),
                }}
              />
            </div>
          </div>
        </div>
      </section>
      <section className="pb-6 md:pb-8 lg:pb-10">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold">Personal Information</h3>
          <p className="mb-8 text-gray-500 dark:text-gray-400">{person.fullName}&apos;s Height, {person.fullName}&apos;s Age, {person.fullName}&apos;s Other names, {person.fullName}&apos;s Birthday </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {person.nick_names?.trim() && <Card>
              <CardHeader>
                <CardTitle>Other Names</CardTitle>
                <CardDescription>{person.nick_names}</CardDescription>
              </CardHeader>
            </Card>}
            <Card>
              <CardHeader>
                <CardTitle>Born</CardTitle>
                <CardDescription><Link aria-label={`${person.fullName} age, ${person.fullName} birth place`} href={`/peoples?born=${queryParseDate(person.born)}`}>{parseDate(person.born)}</Link> | {person.birthPlace}</CardDescription>
              </CardHeader>
            </Card>
            {person.birth_name?.trim() && <Card>
              <CardHeader>
                <CardTitle>Birth Name</CardTitle>
                <CardDescription>{person.birth_name}</CardDescription>
              </CardHeader>
            </Card>}
            {person.died && <Card>
              <CardHeader>
                <CardTitle>Died</CardTitle>
                <CardDescription><Link href={`/peoples?died=${queryParseDate(person.died)}`}>{parseDate(person.died)}</Link> | {person.death_place}</CardDescription>
              </CardHeader>
            </Card>}
            {person.height?.trim() && <Card>
              <CardHeader>
                <CardTitle>Height</CardTitle>
                <CardDescription>{person.height}</CardDescription>
              </CardHeader>
            </Card>}
          </div>
        </div>
      </section>
      {person.personLinks?.length > 0 && <section className="pb-6 md:pb-8 lg:pb-10">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold">External Links</h3>
          <p className="mb-8 text-gray-500 dark:text-gray-400">All social media links and External links for {person.fullName} </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {person.person_links.map((link) => (
              <Card key={link.id}>
                <CardHeader>
                  <CardTitle>
                    <Link
                      aria-label={`${person.fullName} social media, ${person.fullName} ${link.title}`}
                      className='flex justify-between items-center'
                      target='_blank'
                      href={link.link}
                      rel='noreferrer'
                    >
                      {link.title} <ExternalLink />
                    </Link>
                  </CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>}
      {/* <section className="py-6 md:py-8 lg:py-10">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8">{person.fullName} Movies/Shows</h2>
          <div className="grid grid-cols-1 gap-8">
            {person.person_type_id.map(x =>
              <Accordion type="single" collapsible className="w-full" key={x.value}>
                <PeopleAndPeopleTypeMovies personType={x} personId={Number(person.id)} fullName={person.fullName} />
              </Accordion>
            )}
          </div>
        </div>
      </section> */}

    </>
  )
}


export default PersonalDetail