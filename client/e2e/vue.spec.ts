import { test, expect } from '@playwright/test'

let email: string
const password = 'Test@1234'

test.describe('Task Manager - Auth and CRUD Flow', () => {

  test.beforeAll(async ({ browser }) => {
    const randomSuffix = Math.floor(Math.random() * 100000)
    email = `playwright_user_${randomSuffix}@example.com`

    const page = await browser.newPage()
    await page.goto('/signup')

    await page.fill('input[type="email"]', email)
    await page.fill('input[type="password"]', password)
    await page.fill('input[placeholder="Confirm Password"]', password)

    await page.click('button:has-text("Sign Up")')
    await page.waitForSelector('text=Task Manager')

    // Explicit logout after signup
    await page.click('button:has-text("Logout")')
    await page.waitForURL('**/login')

    await page.close()
  })

  test.beforeEach(async ({ page }) => {
    await page.goto('/login')
    await page.fill('input[type="email"]', email)
    await page.fill('input[type="password"]', password)
    await page.click('button:has-text("Login")')
    await page.waitForSelector('text=Task Manager')
  })

  // CRUD Tests Below (same as before)
  test('Create new task', async ({ page }) => {
    await page.click('text=Add Task')
    await page.fill('input[placeholder="Title"]', 'Playwright Test Task')
    await page.fill('textarea', 'Task created during E2E')
    await page.click('button:has-text("Add Task")')
    await expect(page.locator('text=Playwright Test Task')).toBeVisible()
  })

  //todo: we can add rest of the E2E tests for all the CRUD operations.
})
