import { BrowserRouter, Route, Routes} from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import LabelBottomNavigation from "./components/MainNav";
import Movies from "./Pages/Movies/Movies";
import Series from "./Pages/Series/Series";
import Trending from "./Pages/Trending/Trending";
import Search from "./Pages/Search/Search";
import { Container } from "@mui/material";


function App() {
  return (
    <BrowserRouter >

      <Header />

      <div className="app">
        <Container>
          <Routes>
            <Route path="/" element={<Trending/>} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/series" element={<Series />} />
            <Route path="/search" element={<Search />} />      
          </Routes>
        </Container>
      </div>

      <LabelBottomNavigation />
 
    </BrowserRouter>

  );
}

export default App;
