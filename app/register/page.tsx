// Create a server component that uses a from  with the singin action for the better-auth authenetication
import { signUpAction } from "../../actions/auth";

export default function Page() {

   return (
      <div>
         <h1>Sign Up</h1>
         <form action={signUpAction}>
            <input
               type="text"
               name="name"
               id="name"
               placeholder="Name"
               required={true}
            />
            <input
              type="email"
              name="email"
              id="email"
               placeholder="E-Mail"
               required={true}
            />
            <input
               type="password"
               name="password"
               id="password"
               minLength={8}
               placeholder="Password"
               required={true}
            />
            <button type="submit">Sign Up</button>
         </form>
      </div>
   );
}
