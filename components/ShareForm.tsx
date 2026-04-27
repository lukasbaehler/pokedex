'use client';

import { useForm } from "react-hook-form";
import { buildShareUrl } from "../utils/buildShareUrl";
import { useFavorites } from "../hooks/useFavourites";
import { useState } from "react";

export default function ShareForm() {
   const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
   } = useForm();
   const watchDescription = watch("description");
   const { favorites } = useFavorites();
   const [collectionUrl, setCollectionUrl] = useState("");

   function onSubmit(data) {
      const url = buildShareUrl(
         data.collectionName,
         data.description,
         favorites,
      );
      setCollectionUrl(url);
   }

   function handelCopyClick() {
      async function writeClipboardText(text) {
         try {
            await navigator.clipboard.writeText(text);
         } catch (error) {
            console.error(error.message);
         }
      }

      writeClipboardText(collectionUrl);
   }

   return (
      <div className='flex flex-col items-center '>
         <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="collectionName">Collection Name</label>
            <input
               {...register("collectionName", {
                  required: "The collection needs a name.",
                  maxLength: {
                     value: 30,
                     message: "Collection name is too long.",
                  },
                  minLength: {
                     value: 3,
                     message: "Collection name must be longer than 3 letters.",
                  },
               })}
               id="collectionName"
               type="text"
               placeholder="Name"
            />
            <p>{errors.collectionName?.message.toString()}</p>
            <label htmlFor="description">Description</label>
            <textarea
               {...register("description", {
                  maxLength: {
                     value: 100,
                     message:
                        "The description can not be longer than 100 letters.",
                  },
               })}
               id="description"
               maxLength={100}
               placeholder="Collection Description"
            />
            <p>{errors.description?.message.toString()}</p>
            <p>{100 - watchDescription?.length}</p>

            <input type="submit" value="Share" className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors" />
         </form>
         {collectionUrl !== "" ? (
            <div className="flex gap-2 items-center mt-2">
               <a className="text-blue-600 underline active:text-blue-400" href={collectionUrl}>link to collection</a>
               <button onClick={handelCopyClick} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">Copy Link</button>
            </div>
         ) : (
            ""
         )}
      </div>
   );
}
