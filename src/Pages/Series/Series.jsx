import React, { useEffect, useState } from 'react'
import SingleCard from '../../components/SingleCard/SingleCard'
import PaginationRounded from '../../components/Pagination/Pagination';
import axios from 'axios';
import Genres from '../../components/Genres/Genres'
import useGenre from '../../hooks/useGenre';


const Movies = () => {
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);
  const [numOfPages, setnumOfPages] = useState();
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  const apiKey = import.meta.env.VITE_REACT_API_KEY;
  const genreforURL = useGenre(selectedGenres);


  const fetchMovies = async () => {
    const {data} = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
    );

    // console.log(data);

    setContent(data.results);
    setnumOfPages(data.total_pages);
  }

  useEffect(() => {
    window.scroll(0,0);
    fetchMovies();
    // eslint-disable-next-line
  }, [genreforURL, page]);


  return (
    <div>
      <span className='pageTitle'>TV Series</span>

      <Genres 
        type="tv"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
      />
      
      <div className='flex flex-wrap justify-around'>
        {content && 
        content.map((c) => (
          <SingleCard 
          key={c.id}
          id={c.id}
          poster={c.poster_path}
          title={c.title || c.name}
          date={c.first_air_date || c.release_date}
          media_type="tv"
          vote_average={c.vote_average}
          />
        )  
        )}
      </div>
      {numOfPages > 1 && 
        <PaginationRounded setPage={setPage} numOfPages={numOfPages}/>
      }
    </div>

  )
}

export default Movies