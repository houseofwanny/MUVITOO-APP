import { iMovie } from "../types"
import { Link } from "react-router-dom";
import  { HeartIcon } from "@heroicons/react/24/solid"
import {supabase} from "../supabase";
import {useAuth} from "../contexts/Auth";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";

interface Props {
    movie: iMovie,
    isFavourite?: boolean
}

function classNames(...classes: Array<string>) {
    return classes.filter(Boolean).join(' ')
}

const MovieCard = ({ movie, isFavourite = false }: Props) => {

    const { user, signOut } = useAuth()
    const [favourite, setFavourite] = useState(isFavourite)

    const addToFavourites = async (movie: iMovie) => {
        if(!favourite) {
            await supabase.from('favourites').insert({
                movie: movie,
                user_id: user?.id
            }).then(() => {
                    toast("Movie added successfully", {
                        type: "success"
                    })
                    setFavourite(true)
                },
                () => {
                    toast("Something Went Wrong", {
                        type: "error"
                    })
                })
        } else {
            toast("Already in favourites", {
                type: "info"
            })
        }
    }

    useEffect(() => {
        const checkIfMovieIsFavourite = async () => {
            if(!isFavourite) {
                const {data, error} = await supabase.from('favourites')
                    .select()
                    .eq('movie->id', movie.id)
                if(data){
                    if(data[0]){
                        setFavourite(true)
                    }
                }
            }
        }
        checkIfMovieIsFavourite().then()

    }, [])

    return (
        <>
            <div className='relative border z-[1] border-slate-700 rounded-lg lg:min-h-[24rem] overflow-hidden brightness-90 hover:brightness-110 shadow-card transition-all ease-in duration-300 cursor-pointer hover:-translate-y-0.5'>
                <Link to={'/movie-details/' + movie.id}>
                    <img src={'http://image.tmdb.org/t/p/w500/' + movie.poster_path} className="object-cover w-full h-full"  alt={''}/>
                </Link>
                <button onClick={() => addToFavourites(movie)} className={'absolute top-2 right-2 z-[2] active:scale-95 transition-all'}>
                    <HeartIcon className={classNames(favourite ? 'fill-red-500 hover:fill-red-700' : 'fill-white', 'w-8')} />
                </button>
            </div>
        </>
    )
}


export default MovieCard
