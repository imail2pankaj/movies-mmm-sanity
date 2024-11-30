import { defineQuery } from "next-sanity";

// export const HOME_POPULAR_PERSONS = defineQuery(`
//   *[_type =="persons" ] 
// `)


export const HOME_POPULAR_PERSONS = defineQuery(`
  *[_type =="persons" ] {
    _id,
    fullName,
    slug,
    bio,
    image,
    personTypes -> {
      _id, name
    }
  } 
`)