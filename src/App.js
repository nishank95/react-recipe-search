import React, { Component } from 'react';
import Form from './components/Form' 
import Recipes from './components/Recipes' 

import './App.css';

const API_KEY = "3bbea250b2197d11ba0efc976e1bb7eb";

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
