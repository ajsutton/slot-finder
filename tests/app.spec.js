import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
})

test('converts slots to UTC, local time, and Unix timestamps, and back', async ({ page }) => {
  const slots = page.getByLabel('Slot', { exact: true })
  await slots.first().fill('32')
  await expect(page.getByLabel('Unix Timestamp', { exact: true })).toHaveValue('1606824407')
  await expect(page.getByLabel('Time (UTC)', { exact: true })).toHaveValue('2020-12-01 12:06:47 +00:00')
  await expect(page.getByLabel('Time (Local)', { exact: true })).toHaveValue('2020-12-01 22:06:47 +10:00')
  await page.getByLabel('Time', { exact: true }).fill('2020-12-01 12:06:47 +00:00')
  await expect(slots.nth(1)).toHaveValue('32')
  await page.getByLabel('Time', { exact: true }).fill('2020-12-01 12:06:58 +00:00')
  await expect(slots.nth(1)).toHaveValue('32')
})

test('switches every network and applies its genesis and slot duration', async ({ page }) => {
  await page.getByLabel('Slot', { exact: true }).first().fill('1')
  const cases = [
    ['Hoodi', '1742213412'],
    ['Sepolia', '1655733612'],
    ['Holesky', '1695902412'],
    ['Goerli', '1616508012'],
    ['Gnosis', '1638993345'],
    ['Chiado', '1665396305'],
    ['MainNet', '1606824035'],
  ]
  for (const [network, timestamp] of cases) {
    await page.locator('.v-select .v-field').click()
    await page.getByRole('option', { name: network, exact: true }).click()
    await expect(page.getByLabel('Unix Timestamp', { exact: true })).toHaveValue(timestamp)
  }
})

test('lists only epochs on the selected UTC date and filters accumulator boundaries', async ({ page }) => {
  await page.getByRole('tab', { name: 'Upgrade Scheduler' }).click()
  const date = await page.getByLabel('Upgrade Date', { exact: true }).inputValue()
  expect(date).toBe(new Date().toISOString().slice(0, 10))
  const rows = page.locator('tbody tr')
  await expect(rows).toHaveCount(225)
  const values = await rows.evaluateAll(rows => rows.map(row => [...row.cells].map(cell => cell.textContent)))
  for (const [epoch, slot, timestamp, utc, moscow, la, ny, brisbane, local] of values) {
    expect(Number(slot)).toBe(Number(epoch) * 32)
    expect(Number(timestamp)).toBe(1606824023 + Number(slot) * 12)
    expect(utc.startsWith(`${date} `)).toBe(true)
    expect(moscow).toBeTruthy()
    expect(la).toBeTruthy()
    expect(ny).toBeTruthy()
    expect(brisbane).toBe(local)
  }
  // Verify a known instant in every displayed timezone, independent of Day.js.
  const timestamp = Number(values[0][2]) * 1000
  for (const [index, zone] of [[3, 'UTC'], [4, 'Europe/Moscow'], [5, 'America/Los_Angeles'], [6, 'America/New_York'], [7, 'Australia/Brisbane']]) {
    const formatted = new Intl.DateTimeFormat('sv-SE', {
      timeZone: zone, year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23',
    }).format(timestamp)
    expect(values[0][index]).toBe(formatted)
  }
  await page.getByRole('checkbox', { name: 'Show only accumulator boundaries' }).check()
  const expected = values.filter(row => Number(row[1]) % 8192 === 0)
  await expect(rows).toHaveCount(expected.length || 1)
  if (expected.length) {
    expect(await rows.locator('td:nth-child(2)').allTextContents()).toEqual(expected.map(row => row[1]))
  } else {
    await expect(rows).toContainText(`No accumulator boundary on ${date} (UTC)`)
  }
})

test('date picker changes the UTC day without shifting to the previous date', async ({ page }) => {
  await page.getByRole('tab', { name: 'Upgrade Scheduler' }).click()
  const date = await page.getByLabel('Upgrade Date', { exact: true }).inputValue()
  const targetDay = date.endsWith('15') ? '16' : '15'
  const selectedDate = `${date.slice(0, 8)}${targetDay}`
  await page.getByLabel('Upgrade Date', { exact: true }).click()
  await page.getByRole('button', { name: new RegExp(`\\b${targetDay}, \\d{4}$`) }).click()
  await expect(page.getByLabel('Upgrade Date', { exact: true })).toHaveValue(selectedDate)
  await expect(page.locator('tbody tr')).toHaveCount(225)
  for (const value of await page.locator('tbody tr td:nth-child(4)').allTextContents()) {
    expect(value.startsWith(`${selectedDate} `)).toBe(true)
  }
  await page.getByRole('tab', { name: 'Slots', exact: true }).click()
  await expect(page.getByRole('heading', { name: 'Slot to Time' })).toBeVisible()
})

test('loads production assets without runtime errors or unresolved Vue components', async ({ page }) => {
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  page.on('console', message => {
    if (message.type() === 'error' || message.text().includes('[Vue warn]')) errors.push(message.text())
  })
  await page.reload()
  await expect(page.getByRole('heading', { name: 'Slot Finder', exact: true })).toBeVisible()
  await page.getByRole('tab', { name: 'Upgrade Scheduler' }).click()
  await expect(page.locator('tbody tr').first()).toBeVisible()
  await page.getByLabel('Upgrade Date', { exact: true }).click()
  await expect(page.getByRole('button', { name: /\b15, \d{4}$/ })).toBeVisible()
  expect(errors).toEqual([])
})
