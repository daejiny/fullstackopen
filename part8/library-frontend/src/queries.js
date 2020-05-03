import { gql } from '@apollo/client'

export const ALL_BOOKS = gql`
query allBooks($genre: String) {
  allBooks(genre: $genre) {
    title
    author {
      name
      born
      id
    }
    id
    published
    genres
  }
}
`

export const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    born
    id
    bookCount
  }
}
`

export const FAV_GENRE = gql`
query {
  me {
    favoriteGenre
  }
}
`


export const EDIT_AUTHOR = gql`
mutation changeYear($name: String!, $year: Int!) {
  editAuthor (
    name: $name,
    setBornTo: $year
  ) {
    name
    born
    id
    bookCount
  }
}
`

export const CREATE_BOOK = gql`
mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
  addBook (
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    title
    author
    {
      name
      born
      id
    }
    published
    id
    genres
  }
}
`