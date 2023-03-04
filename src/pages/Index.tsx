import React, { useState } from 'react'
import useSWR from 'swr'
import MovieCard from '../components/MovieCard';
import MovieCardSkeleton from '../components/MovieCardSkeleton';
import MovieCardSkeletonContainer from '../components/MovieCardSkeletonContainer';
import { iMovie } from '../types';
import Login from './Login';
import {useAuth} from "../contexts/Auth";
import Header from "../components/Header";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Home = () => {
    const { user, signOut } = useAuth()
    const { data, error } = 
    useSWR(`https://api.themoviedb.org/3/trending/all/day?api_key=${import.meta.env.VITE_APP_IMDB_KEY}`, fetcher) as unknown as { data: { results: iMovie[]}, error: boolean }
    if (error) return <h1>Something went wrong!</h1>
    if (!data) return <MovieCardSkeletonContainer />
    return (
        <>
            <Header />
            <div className='container mx-auto py-10'>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-10'>
                    {data.results.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            </div>
        </>
    );
}

export default Home
