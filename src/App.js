import React, { useState, useEffect } from 'react';
import './components/css/App.css';
import { Movies } from './components/Movies';
import logo from '../src/components/img/dex-logo.png'
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const App = () => {

  // useState hook koji preko setMovies funkcije uzima sve podatke koje uzmemo sa APIs i storniramo u varijablu i te podatke koristimo u komponentama. if that makes sense
  const [movies, setMovies] = useState([]);
  const [titles, setTitles] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('titan');
  const [type, setType] = useState('');
  const [year, setYear] = useState('');

  // useEffect funkcija poziva se cim se stranica ucita i tako dobijamo odmah podatke sa APIs preko funkcije fetchMovies()

  useEffect(() => {
    fetchMovies();
  }, [query, type, year]); // stavljamo prazan array kao drugi parametar da se useEffect poziva samo jednom

  // funkcija koja uzima fetch podatke sa APIs
  // moramo da zovemo asinhronu funkciju koja uzima podatke sa APIs jer ne znamo kada ce da odgovori
  const fetchMovies = async ()=> {
    const response = await fetch (`http://www.omdbapi.com/?s=${query}&type=${type}&y=${year}&apikey=63eb523a&`);
    const data = await response.json();
    setMovies(data.Search);

    // pretraga po titlu filma iz prethodne pretrage | problem mogu samo po titlu da dobijem glumce, zanr, opis filma itd. | koristim vrednost unosa za pretragu po search metodi i taj input uzimam za pretragu za drugi reaquest koji iteracijom izlistam ponovo iste filmove ali po title metodi gde mogu da dobijem sve podatke o filmu. Problem koji moram da resim da mi sacuva u stirage sve ibjekte filmova kao jedan niz a ne za svaki objekat jedan niz tako da niz ima length 0. I prikaze u karticama na frontu samo podatke poslednjeg filma za svih deset filmoa koji se prikazu.
    let title = data.Search.map(item => item.Title);
    for(let i = 0; i < title.length; i++){
      const responseTitle = await fetch (`http://www.omdbapi.com/?t=${title[i]}&apikey=63eb523a&`);
      const dataTitle = await responseTitle.json();
      let storage = [];
      storage.push(dataTitle);
      setTitles(storage[0]);
      console.log(storage);
    }
  }

  // let arrTitles = new Array(10).fill(titles);
  // arrTitles.fill(titles);
  // console.log(arrTitles);
  // funkcija koja uzima vrednost koju upisemo u input polje
  const useSearch = e => {
    setSearch(e.target.value);
  }

  const runSearch = e => {
    e.preventDefault();
    setQuery(search);
  }

  const handleType = (event) => {
    setType(event.target.value);
  };

  const handleYear = (event) => {
    setYear(event.target.value);
  };

    let currentYear = new Date().getFullYear();
    const listYear = [];
    for (let index = currentYear; index >= 1920; index--){
      listYear.push(index);
    }
      

  return (
    <div>
      <header>
            <Container>
                <div className="logo">
                    <img src={logo} alt="logo"/>
                </div>
                <div className="login">
                    <Button variant="contained" disabled>Log in</Button>
                </div>
            </Container>                
      </header>

      <section className="land">
          <div className="main-text">
          <Container maxWidth="md">
              <Typography variant="h1" >Movies, TV Shows, and more.
              </Typography>
          </Container>
          </div>
          <div className="search-fields">
          <form onSubmit={runSearch} noValidate autoComplete="off">

            <FormControl variant="filled">
              <InputLabel id="type-simple-select-filled-label">Type</InputLabel>
              <Select
                labelId="type-simple-select-filled-label"
                id="type-simple-select-filled"
                value={type}
                onChange={handleType}
              >
                <MenuItem value='movie'>Movie</MenuItem>
                <MenuItem value='series'>Series</MenuItem>
                <MenuItem value='season'>Season</MenuItem>
              </Select>
            </FormControl>

            <TextField id="filled-basic" label="title" variant="filled" value={search} onChange={useSearch} />

            <FormControl variant="filled">
              <InputLabel id="year-simple-select-filled-label">Year</InputLabel>
              <Select
                labelId="year-simple-select-filled-label"
                id="year-simple-select-filled"
                value={year}
                onChange={handleYear}
              >
                {listYear.map(list => (
                  <MenuItem value={list}>{list}</MenuItem>
                ))}               
                
              </Select>
            </FormControl>
            <Button type="submit" variant="contained" color="primary">
              search
            </Button>
          </form>            
          </div> 
      </section>

      <section className="display-movies">        
        <div className="movies-grid" >
        <Container maxWidth="xl" className="movies-container">
        {movies.map(movie => (
            <Movies key={movie.imdbID} title={movie.Title} year={movie.Year} type={movie.Type} imdbID={movie.imdbID} poster={movie.Poster} rating={titles.Rated} genre={titles.Genre} plot={titles.Plot} actors={titles.Actors} />
            
        ))}
          </Container>
        </div>
      </section>
      
    </div>
  )
}

export default App
