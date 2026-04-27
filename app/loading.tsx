export default function Loading() {
   const skeletonCards = [];
   for (let i = 0; i < 12; i++) {
      skeletonCards.push(<SkeletonCard key={i} />);
   }

   return (
      <ol className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 justify-items-center gap-2">
         {skeletonCards}
      </ol>
   );
}

function SkeletonCard() {
   return (
      <li className="w-[180px] border border-black rounded-xl shadow-md p-4 hover:scale-105 transition-transform cursor-pointer bg-white flex flex-col justify-center items-center animate-pulse">
         <div className="w-[130px] h-[12px] bg-gray-200"></div>
         <div className="w-[96px] h-[96px] m-2 bg-gray-200"></div>
         <div className="w-[130px] h-[12px] m-2 bg-gray-200"></div>
         <div className="w-[40px] h-[40px] m-2 bg-gray-200"></div>
      </li>
   );
}
