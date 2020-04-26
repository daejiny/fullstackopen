import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import BlogForm from './BlogForm'


const blog = {
  title: 'Animal Crossing during Quaranting',
  author: 'Wa Luigi',
  url: 'http://sixtyninefourtwenty.com',
  likes: 10,
  user: {
    username: 'daejiny',
    name: 'Dae Jin'
  }
}

const user = {
  username: 'daejiny'
}

test('renders content', () => {
  let component = render(
    <Blog blog={blog} user={user} />
  )

  expect(component.container).toHaveTextContent(
    blog.title
  )

  const div = component.container.querySelector('.togglableContent')
  expect(div).toHaveStyle('display: none')
})

test('hides blog info', () => {
  let component = render(
    <Blog blog={blog} user={user} />
  )

  const div = component.container.querySelector('.togglableContent')
  expect(div).toHaveStyle('display: none')
})


test('shows blog info after click', () => {
  let component = render(
    <Blog blog={blog} user={user} />
  )

  const button = component.getByText('show')
  fireEvent.click(button)

  const div = component.container.querySelector('.togglableContent')
  expect(div).not.toHaveStyle('display: none')
})

test('like handler called twice', () => {
  const handleLike = jest.fn()

  let component = render(
    <Blog blog={blog} user={user} handleLike={handleLike} />
  )

  const button = component.getByText('like')

  fireEvent.click(button)
  fireEvent.click(button)

  expect(handleLike.mock.calls).toHaveLength(2)
})

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const handleAdd = jest.fn()

  const component = render(
    <BlogForm handleAdd={handleAdd} />
  )

  const author = component.container.querySelector('#author')
  const title = component.container.querySelector('#title')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(author, {
    target: { value: 'tonee hawke' }
  })
  fireEvent.change(title, {
    target: { value: 'saktebordt' }
  })
  fireEvent.change(url, {
    target: { value: 'www.lmao.com' }
  })
  fireEvent.submit(form)

  expect(handleAdd.mock.calls[0][0].author).toBe('tonee hawke')
  expect(handleAdd.mock.calls[0][0].title).toBe('saktebordt')
  expect(handleAdd.mock.calls[0][0].url).toBe('www.lmao.com')
})