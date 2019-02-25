import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup } from 'react-testing-library'
import Blog from './Blog'

afterEach(cleanup)

test('renders content', () => {
  const blog = {
    title: 'moro tämä on testi',
    author: 'sakke tuominen',
    likes: '1'
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'moro tämä on testi',
    'sakke tuominen',
    '1'
  )
})