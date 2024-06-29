import ClientHome from '../components/ClientHome';

async function getData() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || ''; // Use environment variable for base URL
  const res = await fetch(`${baseUrl}/data.json`);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export default async function Home() {
  const initialData = await getData();
  return <ClientHome initialData={initialData.data} />;
}