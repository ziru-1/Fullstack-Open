import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

let handleLikeUpdate

beforeEach(() => {
  const blog = {
    title: 'Title',
    author: 'D Molt',
    url: 'h.com',
    likes: 0,
    user: {
      username: 'bob',
    },
  }

  const user = {
    username: 'bob',
  }

  handleLikeUpdate = vi.fn()

  render(<Blog blog={blog} user={user} handleLikeUpdate={handleLikeUpdate}/>)
})

test('renders blog title but not author, url and likes', () => {
  const title = screen.getByText('Title', { exact: false })
  const author = screen.queryByText('D Molt', { exact: false })
  const url = screen.queryByText('h.com', { exact: false })
  const likes = screen.queryByText('0', { exact: false })

  expect(title).toBeDefined()
  expect(author).toBeNull()
  expect(url).toBeNull()
  expect(likes).toBeNull()
})

test('renders author, url and likes after view button click', async () => {
  const userEv = userEvent.setup()
  const button = screen.getByText('view')
  await userEv.click(button)

  const author = screen.queryByText('D Molt', { exact: false })
  const url = screen.queryByText('h.com', { exact: false })
  const likes = screen.queryByText('0', { exact: false })

  expect(author).toBeDefined()
  expect(url).toBeDefined()
  expect(likes).toBeDefined()
})

test('click like button twice works', async () => {
  const userEv = userEvent.setup()
  const viewButton = screen.getByText('view')
  await userEv.click(viewButton)

  const likeButton = screen.getByText('like')
  await userEv.click(likeButton)
  await userEv.click(likeButton)

  expect(handleLikeUpdate.mock.calls).toHaveLength(2)
})
