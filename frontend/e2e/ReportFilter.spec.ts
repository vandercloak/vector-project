import { test, expect } from '@playwright/test'

test('can filter reports and verify John Smith has Tachycardia', async ({ page }) => {
  // Navigate to the page with the filter component
  await page.goto('/')

  // Type in the filter
  await page.fill('input[placeholder="Search by patient name..."]', 'John Smith')

  // Validate filtered results using the table structure
  // Either check specific patient names in the table:
  await expect(page.locator('tbody tr td:first-child')).toContainText('John Smith')

  // Or check the presence/absence of table rows based on filter
  await expect(page.locator('tbody tr')).toHaveCount(1)

  // Validate John Smith has Tachycardia
  // First get the row containing John Smith
  const johnSmithRow = page.locator('tbody tr', {
    has: page.locator('td:first-child', { hasText: 'John Smith' }),
  })

  // Verify the row has the tachycardia badge
  await expect(johnSmithRow.locator('text=⚠️ Tachycardia')).toBeVisible()

  // Additional verification - row should have the warning background
  await expect(johnSmithRow).toHaveClass(/bg-red-50/)

  // Test clearing the filter
  await page.click('button >> svg')
  await expect(page.locator('input')).toHaveValue('')
})
