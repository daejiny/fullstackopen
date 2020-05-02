import React, { useState } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'
import Select from 'react-select'

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

const EDIT_AUTHOR = gql`
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

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)

  const [name, setName] = useState('')
  const [year, setYear] = useState('')

  const [changeYear] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors

  const handleSubmit = (event) => {
    event.preventDefault()

    changeYear({ variables: { name, year: Number(year) } })

    setName('')
    setYear('')
  }

  const options = authors.map(author => ({
    value: author.name,
    label: author.name
  }))

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <form onSubmit={handleSubmit}>
        name: <Select value={name} onChange={(e) => setName(e.value)} options={options} /><br />
        year: <input value={year} onChange={(e) => setYear(e.target.value)} /><br />
        <button type='submit'>changeyear</button>
      </form>
    </div>
  )
}

export default Authors
