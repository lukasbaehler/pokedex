import { signInAction } from "../../actions/auth";

export default function Page() {
   return (
      <div className="flex justify-center p-2">
         <form className="flex flex-col gap-2" action={signInAction}>
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
               placeholder="Password"
               required={true}
            />
            <button
               className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
               type="submit"
            >
               Login
            </button>
         </form>
      </div>
   );
}
