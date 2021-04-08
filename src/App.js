import React,{useEffect,useState} from 'react';
import './App.css';
import Recipe from './Recipe'

const App=()=>{
  
  const APP_ID='72ee1cab';
  const APP_KEY='4830e4372cd237358e9207509f25f91a';
  
  
  const [recipes,setRecipes]=useState([]);
  const [search,setSearch]=useState('');
  const [query,setQuery]=useState('chicken');
  

  
  useEffect(()=>{
    getRecipes();
  },[query]);

  const getRecipes=async ()=>{
    const response =await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data=await response.json();
    console.log(data);
    setRecipes(data.hits);
  };
  const updateSearch=e=>{
    setSearch(e.target.value);
  
  };
  const getSearch=e=>{
    e.preventDefault();
    setQuery(search);
    setSearch('');
  };
  
  
  
  return( 
  <div className='App'>
  <div className="headtitle">Search your Recipes</div>
  <form onSubmit={getSearch} className="search-form" >
    <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
    <button className="search-button" type="submit" >Search</button>

  </form>
  
  <div className="recipes">{
    recipes.map(recipe=>(
      <Recipe 
      key={recipe.recipe.calories}
      title={recipe.recipe.label} 
      image={recipe.recipe.image} 
      ingredients={recipe.recipe.ingredients}/>
    ))
  }
  </div>
  </div>
  );
};

export default App;