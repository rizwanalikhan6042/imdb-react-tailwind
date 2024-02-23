import React, { useState, useEffect } from 'react'
import Movies from './Movies';

function WatchList() {
  // State variables for storing favourites, genres, current genre, rating, and search string
  const [favourites, setfavourites] = useState([]);
  const [genres, setGenres] = useState([]);
  const [currGenre, setCurrGenre] = useState('All Genres');
  const [rating, setRating] = useState(0);
  const [searchstr, setSearchstr] = useState('')

  // Object containing genre IDs and their corresponding names
  let genreids = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Sci-Fi",
    10770: "TV",
    53: "Thriller",
    10752: "War",
  }


  useEffect(() => {
    // Fetch favourites from localStorage on component mount
    let moviefromLocalStorage = localStorage.getItem('imdb');
    moviefromLocalStorage = JSON.parse(moviefromLocalStorage);
    setfavourites(moviefromLocalStorage);
  }, [])

  useEffect(() => {
     // Generate unique genres from favourites for filtering
    let temp = favourites.map((movie) => genreids[movie.genre_ids[0]])
    temp = new Set(temp)
    setGenres(['All Genres', ...temp])

  })

  //genre filtering if genre is all genre , then all movies of favourite category will be shown , if not then filtered movies which is == to currMovie will be shown 
  let filteredArray = [];
  filteredArray = currGenre == 'All Genres' ? favourites : favourites.filter((movie) => genreids[movie.genre_ids[0]] == currGenre)
  
// Sorting favourites based on rating
  if (rating == -1) {
    filteredArray = filteredArray.sort(function (objA, objB) {
      return objB.vote_average - objA.vote_average;
    });
  }

  if (rating == 1) {
    filteredArray = filteredArray.sort(function (objA, objB) {
      return objA.vote_average - objB.vote_average;
    });
  }

  //   Will compare the movie ID,if movie ID is match with clicking movie ID ,then we will not return this movie iD in New array, and if it is not matching then we will return it,, 
  // In this way we can be deleted the clicked movie ID and hence movie
  //delete function 
  const del = (movie) => {
    let newArr = favourites.filter((m) => m.id != movie.id);
    setfavourites([...newArr])
    localStorage.setItem('imdb', JSON.stringify(newArr))
  }

 // Filter favourites based on search string
  filteredArray=filteredArray.filter((movie)=>{
    return movie.title.toLowerCase().includes(searchstr.toLowerCase())
  })

  return (
    <>
      <div className='mt-6 flex space-x-2 justify-center'>       {/* Genre buttons */}
        {genres.map((genre) => {
          return <button className={currGenre == genre ? 'm-2 text-lg p-1 px-2 bg-blue-400 text-white rounded-xl font-bold' :
            'm-2 text-lg p-1 px-2 bg-gray-400 hover:bg-blue-400 text-white rounded-xl font-bold'}
            onClick={() => {
              setCurrGenre(genre)
            }}


          >
            {genre}

          </button>
        })}
      </div>
      <div className='text-center '>                    {/* Search input */}
        <input type='text' className='border border-4 bg-gray-200 text-center p-1 m-2' placeholder='Search your Movies' 
        value={searchstr}
        onChange={(e)=>{
          setSearchstr(e.target.value)
        }}
        />
      </div>
       {/* Table of favourites */}
      <div class='overflow-hidden rounded-lg border border-gray-200 shadow-md m-5'>
        <table class='w-full border-collapse bg-white text-left text-sm text-gray-500'>
          <thead>
            <tr>
              <th class='px-6 py-4 font-medium text-gray-900'>Name</th>
              <th>
                <div className='flex'>
                  <img
                    src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-up-arrows-those-icons-lineal-those-icons-3.png" className='mr-1'
                    onClick={() => {
                      setRating(1)
                    }} />
                  <div>Ratings</div>
                  <img
                    src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-down-arrows-those-icons-lineal-those-icons-4.png" className='ml-1'
                    onClick={() => {
                      setRating(-1)
                    }} />

                </div>
              </th>
              <th>
                <div className='flex'>
                  <div>Popularity</div>


                </div>
              </th>
              <th>
                <div className='flex'>
                  <div>Genre</div>


                </div>
              </th>
            </tr>
          </thead>
          <tbody class='divide-y divide-gray-100 border-t border-gray-100'>
            {filteredArray.map((movie) => {
              return (




                <tr class='hover:bg-gray-500'>
                  <td>
                    <img class='h-[6rem] w-[10rem] object-fit' src={`https://image.tmdb.org/t/p/original/t/p/w500/${movie.poster_path}`} />
                    <div class="font-medium text-gray-700  text-sm">
                      {movie.title}
                    </div>


                  </td>
                  <td className='pl-6 py-4'>
                    {movie.vote_average}
                  </td>
                  <td className='pl-6 py-4'>
                    {movie.popularity}
                  </td>
                  <td className='py-4'>

                    {genreids[movie.genre_ids[0]]}
                  </td>
                  <td>
                    <button className='text-red-600' onClick={() => del(movie)}>
                      Delete
                    </button>

                  </td>
                </tr>
              );
            })}




          </tbody>
        </table>
      </div>
    </>
  )
}

export default WatchList

