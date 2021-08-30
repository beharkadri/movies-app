import React from "react";
import {Link} from "react-router-dom";
import Movie from "../Components/Movie";

//https://api.themoviedb.org/3/movie/550?api_key=35cddba5c531993d3f797e9220d0c569
const FEATURED_API = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=35cddba5c531993d3f797e9220d0c569"
const SEARCH_API = "https://api.themoviedb.org/3/search/movie?&api_key=35cddba5c531993d3f797e9220d0c569&query=";
const MOVIE = "https://api.themoviedb.org/3/movie/top_rated?api_key=35cddba5c531993d3f797e9220d0c569";
function HomePage() {
   const [movies, setMovies] = React.useState([]);
   const [searchTerm, setSearchTerm] = React.useState('');
   const [moreMovies, setMoreMovies] = React.useState([]);

   React.useEffect(()=>{
     fetch(FEATURED_API)
     .then(res => res.json())
     .then(data => setMovies(data.results));
     fetch(MOVIE)
     .then(res => res.json())
     .then(data => setMoreMovies(data.results));
   },[]);

    function changeHandler(event){
      const newSearchTerm = event.target.value;
      setSearchTerm(newSearchTerm);
    }

    function handleOnSubmit(event){
      event.preventDefault();
      if(searchTerm){
        fetch(SEARCH_API + searchTerm)
          .then(res => res.json())
          .then(data => setMovies(data.results));
        setSearchTerm("");   
      }
       
    }

    function loadMore(){
      setMovies([...movies, ...moreMovies]);
    }

   return <>
        <header>
            <Link to='/'><h1>Movies</h1></Link>
            <form onSubmit={handleOnSubmit}>
              <input onChange={changeHandler} className="search" type="search" placeholder="Search..." value={searchTerm}/>
            </form>
        </header>
        <div className="movie-container">
          {movies.length > 0 && movies.map(movie => <Movie key = {movie.id} {...movie}/>)}
        </div>
        <button onClick={loadMore}>Load more</button>
     </>
}

export default HomePage;

