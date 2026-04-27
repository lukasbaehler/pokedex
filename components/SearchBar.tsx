export default function SearchBar({ filterValue, onFilterChange }) {
    return (
        <div className="flex justify-center p-4">
            <input className="bg-gray-200 p-1 rounded" onChange={(e) => {onFilterChange(e.target.value)}} value={filterValue} type="text" id='search-text' placeholder="Search..."/>
        </div>
    )
}