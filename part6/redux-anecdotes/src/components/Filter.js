import React from 'react'
import { useDispatch } from 'react-redux'
import { filterFor } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()

  const filterAnecdotes = (text) => {
    const content = text
    dispatch(filterFor(content))
  }
  const style = {
    marginBottom: 10
  }
  
  return (
    <div style={style}>filter <input name='filter' onChange={(e) => filterAnecdotes(e.target.value)} /></div>
  )
}

export default Filter