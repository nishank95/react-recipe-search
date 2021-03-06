import React, { Component } from 'react';
import Form from './components/Form' 
import Recipes from './components/Recipes' 

import './App.css';

// Get your api key https://www.food2fork.com/about/api from by signing up and replace your key here!
const API_KEY = "";

class App extends Component {
  state = {
    recipes: []
  }

  getRecipe = async (e) => {
      const recipeName = e.target.elements.recipe_name.value;
      e.preventDefault();
      const api_call = await fetch(`https://cors-anywhere.herokuapp.com/https://www.food2fork.com/api/search?key=${API_KEY}&q=${recipeName}&count=10`);
      const data = await api_call.json(); 
      this.setState({
        recipes: data.recipes
      });
      console.log(this.state.recipes);
    }
  
  //To display the data fetched and stored earlier in local storage   
  componentDidMount = () =>{
    const json = localStorage.getItem("recipes");
    const recipes = JSON.parse(json);
    this.setState({
      recipes
    });
  }

  //To store the data locally once it updates the component
  componentDidUpdate = () =>{
    const recipes =JSON.stringify(this.state.recipes);
    localStorage.setItem("recipes", recipes); 
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2 className="App-title">Recipe-Search</h2>
        </header>
        <Form getRecipe={this.getRecipe}/>
        <Recipes recipes={this.state.recipes}/>
      </div>
    );
  }
}

export default App;
