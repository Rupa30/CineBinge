import { Chip } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";


const Genres = ({
    selectedGenres,
    setSelectedGenres,
    genres,
    setGenres,
    type,
    setPage,
}) => {

    const handleAdd = (genre) => {
        setSelectedGenres([...selectedGenres, genre]);
        setGenres(genres.filter((g) => g.id !== genre.id));
        setPage(1);
    }

    const handleRemove = (genre) => {
        setSelectedGenres(
            selectedGenres.filter((selected) => selected.id !== genre.id)
        );
        setGenres([...genres, genre]);
        setPage(1);
    }

    const apiKey = import.meta.env.VITE_REACT_API_KEY;

    const fetchGenres = async () => {
        const {data} = await axios.get(
            `https://api.themoviedb.org/3/genre/${type}/list?api_key=${apiKey}&language=en-US`
        );
        setGenres(data.genres);
    }

    useEffect(() => {
        fetchGenres();

        // cleanup method
        return() => {
            setGenres([]); 
        }
        // eslint-disable-next-line
    }, [])

    return (
        <div className="py-2 m-2">

            {selectedGenres.map((genre) => (
                <Chip 
                key={genre.id}
                label={genre.name}
                size="small"
                color="primary"
                clickable
                onDelete={() => handleRemove(genre)}
                />
            ))}

            {genres.map((genre) => (
                <Chip 
                key={genre.id}
                label={genre.name}
                size="small"
                style={{margin: 4,  backgroundColor: '#ffffff', color: '#000' }}
                clickable
                onClick={() => handleAdd(genre)}
                />
            ))}
        </div>
    )
}


export default Genres