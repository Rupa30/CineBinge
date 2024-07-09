import { Button, createTheme, Tab, Tabs, TextField, ThemeProvider } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import SingleCard from '../../components/SingleCard/SingleCard'
import PaginationRounded from '../../components/Pagination/Pagination';


const Search = () => {
  const [type, setType] = useState(0)
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setnumOfPages] = useState();

  const darkTheme = createTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#fff",
      },
    },
  })

  const apiKey = import.meta.env.VITE_REACT_API_KEY;

  const fetchSearch = async () => {
    try {
      const {data} = await axios.get(
        `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${apiKey}&language=en-US&query=${searchText}&page=${page}&include_adult=false`
      );
      setContent(data.results);
      setnumOfPages(data.total_pages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.scroll(0,0);
    fetchSearch();
    // eslint-disable-next-line
  }, [type, page]);


  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <div className='flex my-4'>
          <TextField 
          style={{ flex: 1 }}
          label="Search"
          variant='filled'
          onChange={(e) => setSearchText(e.target.value)}
          />

          <Button
          onClick={fetchSearch}
          variant='contained'
          style={{ marginLeft: 10 }}
          >
            <SearchIcon fontSize="large" />
          </Button>
        </div>

        <Tabs
        value={type}
        indicatorColor='primary'
        textColor='primary'
        onChange={(event, newValue) => {
          setType(newValue);
          setPage(1);
        }}
        style={{ paddingBottom: 5 }}
        aria-label='disabled tabs example'
        >
          <Tab 
          className='w-2/4'
          label="Search Movies"/>
          <Tab 
          className='w-2/4'
          label="Search TV Series"/>
        </Tabs>
      </ThemeProvider>

      <div className="flex flex-wrap justify-around">
        {content &&
          content.map((c) => (
            <SingleCard
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={type ? "tv" : "movie"}
              vote_average={c.vote_average}
            />
          ))}
        {searchText &&
          !content &&
          (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
      </div>

      {numOfPages > 1 && (
        <PaginationRounded setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  )
}

export default Search
