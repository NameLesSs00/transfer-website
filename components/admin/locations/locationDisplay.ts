export function formatCoordinate(value: number) {
  return Number.isFinite(value) ? value.toFixed(6) : "0.000000";
}

export function buildGoogleMapsUrl(latitude: number, longitude: number) {
  return `https://www.google.com/maps?q=${encodeURIComponent(`${latitude},${longitude}`)}`;
}
