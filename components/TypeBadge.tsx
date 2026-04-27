import { TYPE_COLORS } from "../utils/typeColors"

export default function TypeBadge({ type }) {
    return <span style={{backgroundColor: TYPE_COLORS[type]}} className='rounded-xs m-0.5 p-0.5' >{type}</span>
}