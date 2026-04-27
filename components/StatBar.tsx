export default function StatBar({ name, value }) {
    return (
        <li className="m-1">
            <span>{name}</span>
            <div className="h-2 rounded-full bg-gray-200 w-2xs">
                <div className="h-2 rounded-full bg-green-500 transition-all" style={{ width: `${(value/255)*100}%` }}>
                </div>
            </div>
        </li>
    )
}