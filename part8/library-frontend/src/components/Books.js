import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

var _ = require('lodash');


const Books = (props) => {
  const [books, setBooks] = useState(null)
  const [getBooks, { loading, data }] = useLazyQuery(ALL_BOOKS, { options: { fetchPolicy: 'cache-and-network' } })

  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  useEffect(() => {
    getBooks({ variables: { genre: genre } })

    if (data && data.allBooks) {
      setBooks(data.allBooks)
      if (!genres.length) setGenres(_.chain(books).flatMap('genres').uniq().value())
    }
  }, [getBooks, data, genre, books, genres])

  if (!props.show) {
    return null
  }

  if (loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>books</h2>
      <h3>filtering by {genre}</h3>
      {genres.map((g, i) => <button key={i} onClick={() => setGenre(g)}>{g}</button>)}
      <button onClick={() => setGenre('')}>All</button>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
            <th>
              genres
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
              <td>{a.genres.join(', ')}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books