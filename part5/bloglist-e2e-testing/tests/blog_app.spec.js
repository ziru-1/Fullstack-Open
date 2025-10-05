const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginUser, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/test/reset')
    await request.post('/api/users', {
      data: {
        username: 'admin',
        name: 'admin',
        password: 'admin123',
      },
    })

    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('Log in to application')).toBeVisible()
    await expect(page.getByLabel('username:')).toBeVisible()
    await expect(page.getByLabel('password:')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginUser(page, 'admin', 'admin123')

      await expect(page.getByText('admin has logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginUser(page, 'admin', 'wrong')

      await expect(page.getByText('admin has logged in')).not.toBeVisible()
    })
  })

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await loginUser(page, 'admin', 'admin123')
    })

    test('user can create a blog', async ({ page }) => {
      await createBlog(page, 'New blog', 'New Author', 'new-blog.com')

      await expect(page.getByText('Title: New blog')).toBeVisible()
      await expect(page.getByText('a new blog: New blog by New')).toBeVisible()
      await expect(page.getByText('a new blog: New blog by New')).toHaveCSS(
        'color',
        'rgb(0, 128, 0)'
      )
    })

    describe('and there is at least one blog', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, 'New blog', 'New Author', 'new-blog.com')
      })

      test('a blog can be liked', async ({ page }) => {
        await page.getByRole('button', { name: 'view' }).click()
        await page.getByRole('button', { name: 'like' }).click()

        await expect(page.getByText('Likes: 1')).toBeVisible()
      })

      test('user who added blog can delete blog', async ({ page }) => {
        await page.getByRole('button', { name: 'view' }).click()
        page.on('dialog', (dialog) => dialog.accept())
        await page.getByRole('button', { name: 'remove' }).click()

        await expect(page.getByText('Title: New blog')).not.toBeVisible()
        await expect(page.getByText('New blog has been deleted')).toBeVisible()
        await expect(page.getByText('New blog has been deleted')).toHaveCSS(
          'color',
          'rgb(0, 128, 0)'
        )
      })

      test('other user cant see remove button', async ({ page, request }) => {
        await request.post('/api/users', {
          data: {
            username: 'newuser',
            name: 'New User',
            password: 'newuser123',
          },
        })

        await page.getByRole('button', { name: 'logout' }).click()

        await loginUser(page, 'newuser', 'newuser123')

        await page.getByRole('button', { name: 'view' }).click()
        expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
      })
    })
  })
})

test('shows mocked blogs with different like counts', async ({
  page,
  request,
}) => {
  await request.post('/api/test/reset')
  await request.post('/api/users', {
    data: {
      username: 'admin',
      name: 'admin',
      password: 'admin123',
    },
  })

  const mockBlogs = [
    {
      title: 'blogAAA',
      author: 'asd',
      url: 'asd',
      likes: 0,
      user: {
        username: 'admin',
        name: 'admin',
        id: '68e25e50a7ff3c5e8fdce8f5',
      },
      id: '68e25f29a7ff3c5e8fdce902',
    },
    {
      title: 'blogBBB',
      author: 'dd',
      url: 'ddd',
      likes: 3,
      user: {
        username: 'admin',
        name: 'admin',
        id: '68e25e50a7ff3c5e8fdce8f5',
      },
      id: '68e25f2da7ff3c5e8fdce907',
    },
    {
      title: 'blogCCC',
      author: 'fff',
      url: 'fff',
      likes: 9,
      user: {
        username: 'admin',
        name: 'admin',
        id: '68e25e50a7ff3c5e8fdce8f5',
      },
      id: '68e25f30a7ff3c5e8fdce90c',
    },
  ]

  await page.route('/api/blogs', async (route) => {
    console.log('Intercepting /api/blogs')
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(mockBlogs),
    })
  })

  await page.goto('/')
  await loginUser(page, 'admin', 'admin123')

  await page.waitForSelector('div[style*="border"]')

  const blogs = page.locator('div[style*="border"]')
  const count = await blogs.count()

  const likesArray = []

  for (let i = 0; i < count; i++) {
    const blog = blogs.nth(i)
    const viewButton = blog.getByRole('button', { name: 'view' })
    await viewButton.click()

    const likesText = await blog.textContent()
    const match = likesText.match(/Likes:\s*(\d+)/)
    likesArray.push(match ? Number(match[1]) : 0)
  }

  for (let i = 0; i < likesArray.length - 1; i++) {
    expect(likesArray[i]).toBeGreaterThanOrEqual(likesArray[i + 1])
  }
})
