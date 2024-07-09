import React, { useEffect, useState } from 'react'
import axios from "axios";
import SingleCard from '../../components/SingleCard/SingleCard'
import PaginationRounded from '../../components/Pagination/Pagination';

const Trending = () => {
  const apiKey = import.meta.env.VITE_REACT_API_KEY;
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);

  const fetchTrending = async () => {
    const {data} = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}&page=${page}`)

    // console.log(data);
    setContent(data.results);
  }

  useEffect(() => {
    window.scroll(0,0);
    fetchTrending();
  }, [page])


  return (
    <div>
      <span 
      className='pageTitle'
      >Trending Today</span> 
      <div className='flex flex-wrap justify-around'>
        {content && 
        content.map((c) => 
          <SingleCard
          key={c.id}
          id={c.id}
          poster={c.poster_path}
          title={c.title || c.name}
          date={c.first_air_date || c.release_date}
          media_type={c.media_type}
          vote_average={c.vote_average}
          />
          // console.log(c);
        )}
      </div>
      <PaginationRounded setPage={setPage} />
    </div>
  )
}

export default Trending