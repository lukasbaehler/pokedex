"use client";

import { CompareContext } from "../context/CompareContext";
import { useContext } from "react";

export function CompareButton({ id }) {
   const { toggleCompare } = useContext(CompareContext);
   return (
      <button
         onClick={() => toggleCompare(id)}
         className=" px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
      >
         Add To Compare
      </button>
   );
}

export function ResetCompareButton() {
   const { resetCompare } = useContext(CompareContext);
   return (
      <button
         onClick={resetCompare}
         className="text-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
      >
         Reset Compare
      </button>
   );
}
