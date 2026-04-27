import { TYPE_COLORS } from "../utils/typeColors";

export default function TypenFilter({ selected, onSelected }) {
   let buttons = [];
   for (let type in TYPE_COLORS) {
      buttons.push(
         <button
            key={type + "-filter"}
            onClick={() => onSelected(type)}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            style={{border: selected.includes(type) ? '2px solid black' : 'none'}}
         >
            {type}
         </button>,
      );
   }

   return <div className="flex flex-row gap-1 flex-wrap">{buttons}</div>;
}