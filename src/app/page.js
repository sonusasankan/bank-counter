import ClientHome from '../components/ClientHome';

async function getData() {
  const res = await fetch(`http://localhost:3000/data.json`);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export default async function Home() {
  const initialData = await getData();
  return <ClientHome initialData={initialData.data} />;
}