import { signUp } from '@/libs/authCredentials';
import { isRedirectError } from 'next/dist/client/components/redirect';

export default function SignUp() {
  // const signUpAction = async (formData: FormData) => {
  //   'use server';

  //   try {
  //     await signUp(formData);
  //   } catch (error) {
  //     if (isRedirectError(error)) { throw error; }
  //   }
  // };

  const signUpAction = async (formData: FormData) => {
    'use server';

    try {
      await signUp(formData);
    } catch (error) {
      if (isRedirectError(error)) {
        throw error;
      }

      console.log(error);
    }
  };

  return (
    // <form
    //   action={async (formData) => {
    //     'use server'

    //     try {
    //       await signUp(formData);
    //     } catch (error) {
    //       if (isRedirectError(error)) { throw error; }

    //       console.log(error);
    //     }
    //   }}
    // >
    <form action={signUpAction}>
      <label>
        Email
        <input name="email" type="email" />
      </label>

      <label>
        Password
        <input name="password" type="password" />
      </label>
      <button>Sign Up</button>
    </form>
  );
}
