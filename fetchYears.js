import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'h8ta33uq',
  dataset: 'production',
  apiVersion: '2023-01-01',
  useCdn: false
});

export async function fetchYears() {
  const dates = await client.fetch(
    `*[_type == "events"] | order(date_time desc) {
        date_time
    }`
  );

  const years = dates.map(date => date.date_time.split("-")[0])

  return [...new Set(years)].sort((a, b) => b - a);
}
