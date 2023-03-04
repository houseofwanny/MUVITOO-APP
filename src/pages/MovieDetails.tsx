import { useParams } from "react-router-dom";
import useSWR from "swr";
import Header from "../components/Header";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const MovieDetails = () => {
    const { movieId } = useParams();

    const { data, error } =
        useSWR(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${import.meta.env.VITE_APP_IMDB_KEY}&language=en-US`, fetcher)

    if (error) return <h1>Something went wrong!</h1>
    if (!data) return <p>Is loading</p>
    return (
        <>
            <Header />
            <div className="container">
                <div className="grid md:grid-cols-2 gap-5 py-10 text-white">
                    <div className="max-w-md mx-auto rounded-xl overflow-hidden">
                        <img src={'http://image.tmdb.org/t/p/original/' + data.poster_path} className="object-cover w-full h-full" />
                    </div>
                    <div>
                        <div className="space-y-5">
                             <p className="text-2xl font-bold tracking-tight">Overview</p>
                             <p>{ data.overview }</p>
                        </div>
                       
                        {/* <p className="text-white">{JSON.stringify(data)}</p> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default MovieDetails
