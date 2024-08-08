import { isRedirectError } from 'next/dist/client/components/redirect';

import { signIn } from '@/libs/auth';

export default function SignIn() {
  return (
    <>
      {/* <form
        action={async (formData) => {
          'use server';

          console.log('Server side');

          try {
            await signIn('credentials', formData);
          } catch (error) {
            if (isRedirectError(error)) { throw error; }
            
            console.log('other error');
          }
        }}
      >
        <label>
          Email
          <input name="email" type="email" />
        </label>

        <label>
          Password
          <input name="password" type="password" />
        </label>
        <button>Sign In</button>
      </form> */}

      <form
        action={async () => {
          'use server';

          console.log('Server side Auth0');

          try {
            await signIn('auth0');
          } catch (error) {
            if (isRedirectError(error)) {
              throw error;
            }

            console.log('other error');
          }
        }}
      >
        <button>Sign In with Auth0</button>
      </form>

      <hr />

      <form
        action={async formData => {
          'use server';
          await signIn('resend', formData);
        }}
      >
        <input type="text" name="email" placeholder="Email" />
        <button type="submit">Signin with Resend</button>
      </form>
    </>
  );
}
