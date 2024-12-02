export const BASE_URL= process.env.NEXT_PUBLIC_BASE_URL;

export const personSortingOptions = [
  { slug: "a-z", name: "A-Z" },
  { slug: "z-a", name: "Z-A" },
  // { slug: "most-popular", name: "Most Popular" },
  // { slug: "least-popular", name: "Least Popular" },
  { slug: "youngest", name: "Youngest" },
  { slug: "oldest", name: "Oldest" }
]

export const titleSortingOptions = [
  { slug: "a-z", name: "A-Z" },
  { slug: "z-a", name: "Z-A" },
  // { slug: "most-popular", name: "Most Popular" },
  // { slug: "least-popular", name: "Least Popular" },
  { slug: "youngest", name: "Newest" },
  { slug: "oldest", name: "Oldest" }
]