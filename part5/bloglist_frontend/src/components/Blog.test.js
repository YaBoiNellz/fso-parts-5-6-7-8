import React from 'react'
import '@testing-library/jest-dom/'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders content, shows the title and author of the blog', () => {
    const user = {
        username: 'root',
        password: 'root'
    }
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'someone',
        user: user
    }

    render(<Blog blog={blog} user={user} />)

    const element = screen.queryByText('Component testing is done with react-testing-library')
    expect(element).toBeDefined()

    const element2 = screen.queryByText('someone')
    expect(element2).toBeDefined()
})

test('clicking the button shows the url and likes', async () => {
    const user1 = {
        username: 'root',
        password: 'root'
    }
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'someone',
        url: 'abc.com',
        likes: 2,
        user: user1
    }

    render(<Blog blog={blog} user={user1}/>)

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const element = screen.queryByText('abc.com')
    expect(element).toBeDefined()

    const element2 = screen.queryByText('2')
    expect(element2).toBeDefined()
})

test('clicking the like button twice calls the event handler twice', async () => {
    const user1 = {
        username: 'root',
        password: 'root'
    }
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'someone',
        url: 'abc.com',
        likes: 2,
        user: user1
    }

    const mockHandler = jest.fn()

    render(<Blog blog={blog} user={user1} incrementLikes={mockHandler}/>)

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const button2 = screen.getByText('like')
    await user.click(button2)
    await user.click(button2)

    const element = screen.queryByText('4')
    expect(element).toBeDefined()
})