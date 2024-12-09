import { urlFor } from "@/lib/image-builder";
import { client } from "@/sanity/lib/client";

export const getPopularPersons = async (personTypes) => {


  try {

    const personsQuery = `
  *[_type =="persons" && status == "Publish" && count(personTypes[]->title[title in $personTypes]) > 0] | order(fullName asc) [0...4] {
    _id,
    fullName,
    slug,
    image,
    bio,
    personTypes[] -> {
      _id, title
    }
  } 
`;

    const params = { personTypes };
    return await client.fetch(personsQuery, params)
  } catch (error) {
    console.log(error)
    return error
  }
}

export async function getPersonBySlug(slug) {
  try {

    const personsQuery = `
      *[_type =="persons" && status == "Publish" && slug['current'] == $slugs][0] {
        _id,
        fullName,
        slug,
        image,
        year,
        bio,
        description,
        gender,
        bron,
        birthName,
        birthPlace,
        height,
        died,
        releaseDate,
        personTypes[] -> {
          _id, title
        }
      } 
    `;

    const params = { slugs:slug };
    const person = await client.fetch(personsQuery, params)

    return {
      ...person,
      person_type_id: person?.personTypes?.map(ptype => ({
        label: ptype.title,
        value: ptype._id,
      }))
    }
  } catch (error) {
    console.log(error)
    return error
  }

}

export async function getUpcomingMovies(date) {

  const query = `
      *[_type =="titles" && status == "Publish" && releaseDate >= "${date}" ] | order(_createdAt desc) [0...10] {
        _id,
        title,
        slug,
        image,
        details,
        genres
      } 
  `;
  return await client.fetch(query)
}

export const getPersonTypes = async () => {
  try {
    const query = `*[_type =="personTypes" ] | order(title asc)`;

    return await client.fetch(query)
  } catch (error) {
    return error
  }
}


export async function getPopularMovies() {

  const query = `
    *[_type =="titles" && status == "Publish" ] | order(release_date desc) [0...4] {
      _id,
      title,
      slug,
      image,
      details,
      genres
    } 
  `;
  return await client.fetch(query)
}

export async function getNavbarSearch(data) {

  const personsQuery = `
    *[_type =="persons" && status == "Publish" && fullName match "*${data}*" ] | order(fullName asc) [0...5] {
      _id,
      fullName,
      slug,
      image
    } 
  `;
  const persons = await client.fetch(personsQuery)

  const titlesQuery = `
    *[_type =="titles" && status == "Publish" && title match "*${data}*" ] | order(release_date desc) [0...5] {
      _id,
      title,
      slug,
      image
    } 
  `;
  const titles = await client.fetch(titlesQuery)

  return [
    ...persons.map(p => (
      {
        name: p.fullName,
        slug: `/peoples/${p.slug.current}`,
        image: urlFor(p.image.asset._ref).width(500).url()
      }
    )),
    ...titles.map(p => (
      {
        name: p.title,
        slug: `/movies/${p.slug.current}`,
        image: urlFor(p.image.asset._ref).width(500).url()
      }
    ))
  ]
}

export async function fetchPersonsBirthdayToday(month, day) {
  const query = `
    *[_type == "persons" && status == "Publish" && dateTime(born).month == $month && dateTime(born).day == $day] {
      _id,
      fullName,
      slug,
      born,
      died,
      image
    }
  `;

  const params = { month, day };

  try {
    return await client.fetch(query, params);
  } catch (error) {
    console.error("Sanity query failed:", error);
  }
}
