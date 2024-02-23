import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Pagination from './Pagination'

function Movies() {
    const [movies, setMovies] = useState([]);
    const [pageNum, setPageNum] = useState(1);
    const [watchList, setWatchList] = useState([]);
    const [hovered,sethovered]=useState('')

    // Function to handle pagination for next page
    const onNext = () => {
        setPageNum(pageNum + 1)
    }

     // Function to handle pagination for previous page
    const onPrev = () => {
        if (pageNum > 1) {
            setPageNum(pageNum - 1)
        }
    }

    // Function to add a movie to the watchlist
    const addToWatchList = (movie) => {
        const newWatchList = [...watchList, movie]
        setWatchList(newWatchList);
        localStorage.setItem('imdb',JSON.stringify(newWatchList))
    }
    
     // Function to remove a movie from the watchlist
    const removeFromWatchList = (movie) => {
        const filteredWatchlist = watchList.filter((m) => {
            return (m.id=movie.id);                             // Remove the movie with the same ID from the watchlist
        })
        setWatchList(filteredWatchlist);
        localStorage.setItem('imdb',JSON.stringify(filteredWatchlist));

    }
    console.log(movies)
    console.log(watchList)
    // Function to show add/remove buttons when hovering over a movie
    const showButton = (id) => {
    sethovered(id)
    }

    // Function to hide add/remove buttons when not hovering over a movie
    const hideButton = (id) => {
    sethovered('')
    }

    // Fetch movie data from the API when pageNum changes
    useEffect(() => {
        (function () {
            axios
                .get(`https://api.themoviedb.org/3/trending/movie/day?api_key=087bb2e39658183885be68567df65b93&page=${pageNum}`)
                .then((res) => {
                    setMovies(res.data.results)
                })
        })()

    }, [pageNum])
    // console.log(movies)

    return (
        <div>
            <div className='text-2xl mb-8 font-bold  text-center'>              {/* Heading */}
                Trending Movies
            </div>
            <div className='flex flex-wrap'>
                     {/* Map through movies and render each movie */}
                {movies.map((movie) => {
                    return <div
                        //below code onMouseOver & onMouseLeave purpose => Whenever you hover on any movie, then only add and remove button will show, else it will not show ,, this is beneficial for good looking
                        // Don't take these small small things lightly , because in the company interview this type of small things come in picture, they ask these small task
                        onMouseOver={() => showButton(movie.id)}
                        onMouseLeave={() => hideButton()}


                        key={movie.id} className='w-[191px] h-[35vh] bg-center bg-cover rounded-xl m-4 md:h[40vh] md:w[200px] hover:scale-110 duration-300 relative flex items-end'
                        style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/t/p/w500/${movie.poster_path})`, }}>

                        <div className='text-2xl p-2 bg-gray-900 rounded-2xl absolute right-2 top-2'
                        style={{display:hovered==movie.id ? 'block' : 'none'}}
                        >
                            {/* When you click on this movie, add watch list function will execute which is defined above , 
                            so basically and movie.id is the argument of that function */}

                            {watchList.includes(movie) == false ? (
                                <div onClick={() => addToWatchList(movie)}>😍</div>
                            ) : (
                                <div onClick={() => removeFromWatchList(movie)}>
                                    ❌
                                </div>
                            )

                            }



                        </div>

                        <div className='text-white font-bold text-center w-full bg-gray-900 bg-opacity-60'>
                            {movie.title}
                        </div>

                    </div>


                })}


            </div>
            <Pagination onPrevProp={onPrev} onNextProp={onNext} pageNumProp={pageNum} />            {/* Pagination */}
        </div>
    )
}

export default Movies
