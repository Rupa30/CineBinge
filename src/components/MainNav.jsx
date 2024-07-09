import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import MovieIcon from '@mui/icons-material/Movie';
import TvIcon from '@mui/icons-material/Tv';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LabelBottomNavigation() {
  const [value, setValue] = React.useState('trending');
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (value === 'trending') navigate("/");
    else if (value === 'movies') navigate("/movies");
    else if (value === 'tv Series') navigate("/series");
    else if (value === 'search') navigate("/search");
  }, [value, navigate]);

  return (
    <BottomNavigation sx={{ width: "100%", position: "fixed", bottom: 0, background: "#2d313a", zIndex: 100 }} value={value} onChange={handleChange}>

      <BottomNavigationAction
        style={{ color: "white" }}
        label="Trending"
        value="trending"
        icon={<WhatshotIcon />}
      />
      <BottomNavigationAction
        style={{ color: "white" }}
        label="Movies"
        value="movies"
        icon={<MovieIcon />}
      />
      <BottomNavigationAction
        style={{ color: "white" }}
        label="TV Series"
        value="tv Series"
        icon={<TvIcon />}
      />
      <BottomNavigationAction
        style={{ color: "white" }}
        label="Search"
        value="search"
        icon={<SearchIcon />}
      />

    </BottomNavigation>
  );
}
