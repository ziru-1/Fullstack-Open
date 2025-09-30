import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('BlogForm updates parent state and calls form submit ', async () => {
  const handleAddBlog = vi.fn()
  const userEv = userEvent.setup()

  render(<BlogForm handleAddBlog={handleAddBlog} />)

  const titleInput = screen.getByPlaceholderText('title')
  const authorInput = screen.getByPlaceholderText('author')
  const urlInput = screen.getByPlaceholderText('url')
  const addBlogButton = screen.getByText('Add blog')

  await userEv.type(titleInput, 'The Blog')
  await userEv.type(authorInput, 'Bo L. Og')
  await userEv.type(urlInput, 'www.blog.com')
  await userEv.click(addBlogButton)

  expect(handleAddBlog.mock.calls).toHaveLength(1)
  expect(handleAddBlog.mock.calls[0][0].title).toBe('The Blog')
  expect(handleAddBlog.mock.calls[0][0].author).toBe('Bo L. Og')
  expect(handleAddBlog.mock.calls[0][0].url).toBe('www.blog.com')
})
