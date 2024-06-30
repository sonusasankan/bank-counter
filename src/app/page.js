import ClientHome from '../components/ClientHome';
import { promises as fs } from 'fs';

async function getData() {
  const res = await fs.readFile(`public/data.json`);
  return JSON.parse(res);
}

export default async function Home() {
  const initialData = await getData();
  return <ClientHome initialData={initialData.data} />;
}