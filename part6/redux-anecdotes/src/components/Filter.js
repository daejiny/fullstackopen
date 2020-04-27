import React from 'react'
import { connect } from 'react-redux'
import { filterFor } from '../reducers/filterReducer'

const Filter = (props) => {
  const filterAnecdotes = (text) => {
    const content = text
    props.filterFor(content)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>filter <input name='filter' onChange={(e) => filterAnecdotes(e.target.value)} /></div>
  )
}

const mapDispatchToProps = {
  filterFor,
}

const ConnectedFilter = connect(
  null,
  mapDispatchToProps
)(Filter)

export default ConnectedFilter