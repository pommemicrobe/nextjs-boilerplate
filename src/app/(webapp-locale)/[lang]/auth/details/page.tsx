import { auth } from '@/lib/auth';

export default async function Details() {
  const session = await auth();

  console.log('session: ', session);

  return <div></div>;
}
