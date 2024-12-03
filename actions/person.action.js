import { client } from "@/sanity/lib/client";

export async function fetchFilteredPersons({
  query = "",
  currentPage = 1,
  column = "fullName",
  sort = "asc",
  person_type_id = [],
  born = "",
  died = "",
  pageSize = 12,
}) {
  // Build dynamic GROQ filters
  const filters = [
    `_type == "persons"`, // Sanity type for persons
    `status == "Publish"`, // Status filter
  ];

  // Full-text search logic
  if (query) {
    const queryTerms = query.split(" ");
    const searchFields = ["fullName", "slug", "bio", "description"];
    const queryFilter = queryTerms
      .map(
        (term) =>
          `(${searchFields
            .map((field) => `${field} match "*${term}*"`)
            .join(" || ")})`
      )
      .join(" && ");
    filters.push(queryFilter);
  }

  // Born and Died year filters
  if (born || died) {
    const currentYear = new Date().getFullYear();
    const yearRange = Array.from(
      { length: currentYear - 1900 + 1 },
      (_, index) => 1900 + index
    )
      .map((year) => `"${year}-${born}"`)
      .join(", ");
    if (born) filters.push(`dateTime(born) in [${yearRange}]`);
    if (died) filters.push(`dateTime(died) in [${yearRange}]`);
  }

  // Person type filter
  if (person_type_id.length) {
    filters.push(
      `count(personTypes[]->_ref[_ref in ${JSON.stringify(person_type_id)}]) > 0`
    );
  }

  // Combine filters
  const filterQuery = filters.join(" && ");

  // Sorting direction
  const sortOrder = sort === "asc" ? "" : " desc";

  // Pagination
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  // GROQ Query
  const qry = `
    *[${filterQuery}] | order(${column}${sortOrder})[${startIndex}...${endIndex}] {
      _id,
      fullName,
      slug,
      born,
      bio,
      died,
      image,
      personLinks,
      personTypes[] -> {
        _id, title
      }
    }
  `;

  // Fetch data using the GROQ query
  const persons = await client.fetch(qry);

  return persons;
}

export async function fetchFilteredPersonsCount({ query = "", person_type_id = [], born = "", died = "" }) {
  // Build dynamic GROQ filters
  const filters = [
    `_type == "persons"`, // Sanity type for persons
    `status == "Publish"`, // Status filter
  ];

  // Full-text search logic
  if (query) {
    const queryTerms = query.split(" ");
    const searchFields = ["fullName", "slug", "bio", "description"];
    const queryFilter = queryTerms
      .map(
        (term) =>
          `(${searchFields
            .map((field) => `${field} match "*${term}*"`)
            .join(" || ")})`
      )
      .join(" && ");
    filters.push(queryFilter);
  }
 
  // Born and Died year filters
  if (born || died) {
    const currentYear = new Date().getFullYear();
    const yearRange = Array.from(
      { length: currentYear - 1900 + 1 },
      (_, index) => 1900 + index
    )
      .map((year) => `"${year}-${born}"`)
      .join(", ");
    if (born) filters.push(`dateTime(born) in [${yearRange}]`);
    if (died) filters.push(`dateTime(died) in [${yearRange}]`);
  }

  // Person type filter
  if (person_type_id.length) {
    filters.push(
      // `personTypes[]._ref in ${JSON.stringify(person_type_id)}`
      `count(personTypes[]->_ref[_ref in ${JSON.stringify(person_type_id)}]) > 0`
    );
  }

  // Combine filters
  const filterQuery = filters.join(" && ");

  // GROQ Query for counting records
  const qry = `
    count(*[${filterQuery}])
  `;

  // Fetch count using the GROQ query
  const count = await client.fetch(qry);

  return count;
}

export async function fetchFilteredPersonsPagination({ query, currentPage, column, sort, person_type_id, born, died, page_size = 10 }) {
  return {
    persons: await fetchFilteredPersons({ query, currentPage, column, sort, person_type_id, born, died, page_size }),
    totalRecords: await fetchFilteredPersonsCount({ query, person_type_id, born, died })
  };
}