import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> calls onSubmit', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  const input = screen.getByPlaceholderText('write title here')
  const input2 = screen.getByPlaceholderText('write url here')
  const input3 = screen.getByPlaceholderText('write author here')
  const sendButton = screen.getByText('create')

  await user.type(input, 'testing a form...')
  await user.type(input2, 'input.com')
  await user.type(input3, 'root')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('testing a form...')
  expect(createBlog.mock.calls[0][0].url).toBe('input.com')
  expect(createBlog.mock.calls[0][0].author).toBe('root')
})