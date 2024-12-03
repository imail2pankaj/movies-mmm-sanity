"use server"

import { slugify } from "@/lib/utils";
import { client } from "@/sanity/lib/client";

const buildQuery = ({ query, type, release_year, genre_id }) => {
  return `
    *[_type == "titles" && status == "Publish"
      ${query ? `&& title match "${query}*"` : ""}
      ${type ? `&& type == "${type}"` : ""}
      ${release_year ? `&& year == ${release_year}` : ""} 
      ${genre_id?.length? `&& genres[] match ${JSON.stringify(genre_id)}`: ""
      }
    ]`;
};

export async function fetchFilteredRecords({ query, type, released_year, currentPage, column, sort, genre_id, page_size = 12 }) {
  const recordsQuery = `
    ${buildQuery({ query, type, released_year, genre_id })}
    | order(${column} ${sort}) [${(currentPage - 1) * page_size}...${
    currentPage * page_size
  }] {
      _id,
      title,
      type,
      details,
      createdAt,
      status,
      slug,
      image,
      genres[]
    }
  `;

  return await client.fetch(recordsQuery);
}


export async function fetchFilteredRecordsCount({ query, type, released_year, genre_id }) {
  const countQuery = `
    count(${buildQuery({ query, type, released_year, genre_id })})
  `;
  return await client.fetch(countQuery);
}


export async function fetchFilteredRecordsPagination({ query, type, released_year, currentPage, column, sort, genre_id, page_size = 12 }) {
  const records = await fetchFilteredRecords({ query, type, released_year, currentPage, column, sort, genre_id, page_size });
  const totalRecords = await fetchFilteredRecordsCount({ query, type, released_year, genre_id });

  return { records, totalRecords };
}


export async function getRecord(id) {
  const recordQuery = `
    *[_type == "titles" && _id == "${id}"][0] {
      _id,
      title,
      type,
      details,
      _createdAt,
      status,
      slug,
      image,
      genres[],
      personsInPersonTypeInTitles[] {
        persons-> {
          _id,
          fullName,
          image,
          slug
        },
        as_role,
        credit
      }
    }
  `;
  const record = await client.fetch(recordQuery);

  return {
    ...record,
    // writer_id: record.personsInPersonTypeInTitles
    //   .filter(({ as_role }) => as_role === "Writer")
    //   .map(({ persons }) => ({
    //     value: persons._id,
    //     label: persons.fullName,
    //   })),
    // director_id: record.personsInPersonTypeInTitles
    //   .filter(({ as_role }) => as_role === "Director")
    //   .map(({ persons }) => ({
    //     value: persons._id,
    //     label: persons.fullName,
    //   })),
  };
}


export async function getRecordBySlug(slug) {
  const recordQuery = `
    *[_type == "titles" && slug.current == "${slug}"][0] {
      _id,
      title,
      type,
      details,
      createdAt,
      status,
      story,
      slug,
      image,
      genres,
      personsInPersonTypeInTitles[] {
        persons-> {
          _id,
          fullName,
          image,
          slug
        },
        as_role,
        credit
      }
    }
  `;
  const record = await client.fetch(recordQuery);
console.log(record)
  const casts = record?.personsInPersonTypeInTitles?.filter(({ as_role }) => as_role === "Stars" || as_role === "Cast");

  return {
    ...record,
    casts: casts?.sort((a, b) => a.credit - b.credit).map(({ persons, as_role }) => ({
      value: persons._id,
      label: persons.fullName,
      image: persons.image,
      slug: persons.slug,
      as_role,
    })),
    writer_id: record?.personsInPersonTypeInTitles
      ?.filter(({ as_role }) => as_role === "Writer")
      ?.map(({ persons }) => ({
        value: persons._id,
        label: persons.fullName,
      })),
    director_id: record?.personsInPersonTypeInTitles
      ?.filter(({ as_role }) => as_role === "Director")
      ?.map(({ persons }) => ({
        value: persons._id,
        label: persons.fullName,
      })),
  };
}


export async function fetchSitemapMovies() {
  const sitemapQuery = `
    *[_type == "titles" && status == "Publish"] | order(_createdAt asc) [0...1000] {
      _id,
      slug,
      title,
      _createdAt
    }
  `;
  return await client.fetch(sitemapQuery);
}
