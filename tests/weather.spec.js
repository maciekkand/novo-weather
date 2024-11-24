import { test, expect } from '@playwright/test'

const SELECTORS = {
  locationInput: '[data-e2e=location-input]',
  searchButton: '[data-e2e=search-button]',
  weatherTable: '[data-e2e=weather-table]',
  errorMsg: '[data-e2e=error-message]',

  temperature: '[data-e2e=weather-temperature]',
  apparent_temperature: '[data-e2e=weather-apparent-temperature]',
  windspeed: '[data-e2e=weather-windspeed]',
  visibility: '[data-e2e=weather-visibility]',
  parameter: '[data-e2e=weather-parameter]'
}

test.beforeEach(async ({ page }) => {
  await page.goto('/')
})

test('1. Show weather table and location name with proper case', async ({ page }) => {
  await page.locator(SELECTORS.locationInput).fill('warszawa')
  await page.locator(SELECTORS.searchButton).click()

  const weatherTable = await page.locator(SELECTORS.weatherTable)

  await expect(weatherTable).toBeVisible()
  await expect(page.getByText('Warszawa')).toBeVisible()
})

test('2. Show error for incorrect location and do not show weather table', async ({ page }) => {
  await page.locator(SELECTORS.locationInput).fill('qwertyuiop')
  await page.locator(SELECTORS.searchButton).click()

  const weatherTable = await page.locator(SELECTORS.weatherTable)
  await expect(weatherTable).not.toBeVisible()

  const errorMsg = await page.locator(SELECTORS.errorMsg)
  await expect(errorMsg).toBeVisible()
})

test('3. Show all weather table parameters', async ({ page }) => {
  await page.locator(SELECTORS.locationInput).fill('lublin')
  await page.locator(SELECTORS.searchButton).click()

  const weatherTable = await page.locator(SELECTORS.weatherTable)
  await expect(weatherTable).toBeVisible()

  const temperatureCell = page.locator(SELECTORS.temperature).filter({ has: page.locator(SELECTORS.parameter) })
  await expect(temperatureCell).not.toBeEmpty()

  const apparentTemperatureCell = page.locator(SELECTORS.apparent_temperature).filter({ has: page.locator(SELECTORS.parameter) })
  await expect(apparentTemperatureCell).not.toBeEmpty()

  const windspeedCell = page.locator(SELECTORS.windspeed).filter({ has: page.locator(SELECTORS.parameter) })
  await expect(windspeedCell).not.toBeEmpty()

  const visibilityCell = page.locator(SELECTORS.visibility).filter({ has: page.locator(SELECTORS.parameter) })
  await expect(visibilityCell).not.toBeEmpty()

  await expect(page.getByText('Temperature')).toBeVisible()
  await expect(page.getByText('Apparent Temp.')).toBeVisible()
  await expect(page.getByText('Wind Speed')).toBeVisible()
  await expect(page.getByText('Visibility')).toBeVisible()
})
