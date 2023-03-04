import { iMovie } from "../types"

interface Props {
    movie: iMovie
}

const MovieCardSkeleton = () => {
    return (
        <>
            <div className='border border-slate-700 rounded-lg h-64 w-full bg-slate-600/50 animate-pulse shadow-card cursor-pointer'></div>
        </>
    )
}


export default MovieCardSkeleton
