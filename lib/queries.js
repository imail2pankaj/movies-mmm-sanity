import { defineQuery } from "next-sanity"; 

export const HOME_POPULAR_PERSONS = defineQuery(`
  *[_type =="persons" && status == "Publish" ] | order(_createdAt desc) [0...4] {
    _id,
    fullName,
    slug,
    bio,
    image,
    personTypes[] -> {
      _id, title
    }
  } 
`)