import {supabase} from "../supabase";
import React, {useEffect, useState} from "react";
import {useAuth} from "../contexts/Auth";
import MovieCardSkeletonContainer from "../components/MovieCardSkeletonContainer";
import Header from "../components/Header";
import MovieCard from "../components/MovieCard";
import {iMovie} from "../types";

interface iFavourite {
        id: number,
        created_at: string,
        user_id: string,
        movie: iMovie
    }

export default function Favourites() {
    const { user, signOut } = useAuth()
    const [error, setError ] = useState<string | null>(null)
    const [data, setData ] = useState<iFavourite[]>([])
    useEffect(() => {
        const getCarts = async () => {
            const {data, error} = await supabase.from('favourites').select('*')
            if(error){setError(error.message)}
            else setData(data ?? [])
            console.log(data)
        }
        getCarts().then()

    }, [])
    if (error) return <h1>Something went wrong!</h1>
    if (!data) return <MovieCardSkeletonContainer />
    return (
        <>
            <Header />
            <div className='container mx-auto py-10'>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-10'>
                    {data.map((favourite) => (
                        <MovieCard key={favourite.id} movie={favourite.movie} isFavourite={true} />
                    ))}
                </div>
            </div>
        </>
    );
}