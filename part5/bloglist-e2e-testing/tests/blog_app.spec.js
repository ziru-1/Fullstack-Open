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
