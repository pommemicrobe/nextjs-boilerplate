import { signOut } from '@/libs/auth';

export default function SignOut() {
  return (
    <form
      action={async () => {
        'use server';

        await signOut();
      }}
    >
      <button>Sign Out</button>
    </form>
  );
}
