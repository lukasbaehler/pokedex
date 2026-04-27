'use client';

import { createContext, useState } from "react";
import { CompareContextType } from "../types/types";

export const CompareContext = createContext<CompareContextType | null>(null);

export default function CompareProvider({ children }) {
   const [compare, setCompare] = useState<number[]>([]);

   function toggleCompare(id: number) {
      if (compare.length === 2) {
         setCompare([compare[1], id]);
         return;
      }
      if (compare.length === 1) {
         setCompare([compare[0], id]);
         return;
      }
      setCompare([id]);
      return;
   }

   function resetCompare() {
      setCompare([]);
   }

   return (
      <CompareContext.Provider value={{ compare, toggleCompare, resetCompare }}>
         {children}
      </CompareContext.Provider>
   );
}