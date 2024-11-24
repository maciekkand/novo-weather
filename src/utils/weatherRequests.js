export async function fetchCoords(location) {
  const resp = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(location)}&count=1`
  )

  if (!resp.ok) {
    throw new Error('Failed to fetch the location')
  }

  const data = await resp.json()
  const result = data.results?.[0]

  if (!result) {
    throw new Error('Location unknown')
  }

  return {
    lat: result.latitude,
    lon: result.longitude
  }
}

export async function fetchWeather(coords) {
  const resp = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current=temperature_2m,apparent_temperature,windspeed_10m,visibility`
  )

  if (!resp.ok) {
    throw new Error('Failed to fetch weather information')
  }

  const data = await resp.json()

  return {
    temperature: data.current.temperature_2m,
    apparent_temperature: data.current.apparent_temperature,
    windspeed: data.current.windspeed_10m,
    visibility: data.current.visibility
  }
}
