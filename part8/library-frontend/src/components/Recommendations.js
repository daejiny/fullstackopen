import React, { useState, useEffect } from 'react'
import { useLazyQuery, useQuery } from '@apollo/client'

import { ALL_BOOKS, FAV_GENRE } from '../queries'


const Recommendations = (props) => {
  const result = useQuery(FAV_GENRE)
  const [books, setBooks] = useState(null)
  const [getBooks, { loading, data }] = useLazyQuery(ALL_BOOKS, { options: { fetchPolicy: 'cache-and-network' } })

  const [genre, setGenre] = useState('')

  useEffect(() => {
    if (result.data) setGenre(result.data.me.favoriteGenre)
    getBooks({ variables: { genre: genre } })

    if (data && data.allBooks) {
      setBooks(data.allBooks)
    }
  }, [getBooks, data, genre, books, result])

  if (!props.show) {
    return null
  }

  if (loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>recommendations</h2>
      <h3>books in your favorite genre {genre}</h3>
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

export default Recommendations