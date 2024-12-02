import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function calculateAge(birthdate) {
  const today = new Date();
  const age = today.getFullYear() - birthdate.getFullYear() - (
    today.getMonth() < birthdate.getMonth() ||
    (today.getMonth() === birthdate.getMonth() && today.getDate() < birthdate.getDate())
  );
  return age;
}

export const convertRunTime = (n) => `${Math.floor(n / 60)}h ${n % 60}m`;

export const setPersonSortingOption = (slug) => {

  if (slug === 'z-a') {
    return {
      column: 'fullName',
      sort: 'desc',
    }
  } else if (slug === 'a-z') {
    return {
      column: 'fullName',
      sort: 'asc',
    }
  } else if (slug === 'youngest') {
    return {
      column: 'born',
      sort: 'desc',
    }
  } else if (slug === 'oldest') {
    return {
      column: 'born',
      sort: 'asc',
    }
  } else {
    return {
      column: 'fullName',
      sort: 'asc',
    }
  }
}

export const setTitleSortingOption = (slug) => {

  if (slug === 'z-a') {
    return {
      column: 'title',
      sort: 'desc',
    }
  } else if (slug === 'a-z') {
    return {
      column: 'title',
      sort: 'asc',
    }
  } else if (slug === 'youngest') {
    return {
      column: 'releaseDate',
      sort: 'desc',
    }
  } else if (slug === 'oldest') {
    return {
      column: 'releaseDate',
      sort: 'asc',
    }
  } else {
    return {
      column: 'releaseDate',
      sort: 'asc',
    }
  }
}
