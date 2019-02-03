import React, { Component } from 'react';
import { Link } from "react-router-dom";

// Get your api key https://www.food2fork.com/about/api from by signing up and replace your key here!
const API_KEY = "";

class Recipe extends Component{    
    
    state={
        activeRecipe: []
    }

    componentDidMount = async () => {
        //Fetch the recipe id from the props 
        const r_id = this.props.location.state.recipe;
        //Fetch the data about recipe from the id got from props
        const req = await fetch(`https://cors-anywhere.herokuapp.com/https://www.food2fork.com/api/get?key=${API_KEY}&rId=${r_id}`);
        const res = await req.json();   
        //Set state of Recipe component with the json data about recipe 
        this.setState({
          activeRecipe: res.recipe
        });
        //console.log(this.state.activeRecipe);  
    }

    render(){
        const recipe = this.state.activeRecipe;
        return(
            <div className="container">
                {
                    ( this.state.activeRecipe.length !==0 )     //Loads the JSX when data is set in the state
                    &&
                    <div className="active-recipe">
                        <img src={recipe.image_url} alt={recipe.title} className="active-recipe__img"/>
                        <h3 className="active-recipe__title">{ recipe.title }</h3>
                        <h4 className="active-recipe__publisher">
                            Publisher: <span>{ recipe.publisher }</span>
                        </h4>
                        <p className="active-recipe__website">
                            Website: <span>
                                <a href={recipe.publisher_url}>
                                    { recipe.publisher_url }
                                </a></span>
                        </p>
                        <button className="active-recipe__button">
                            <Link to="/">Go Home</Link>
                        </button>
                    </div>


                }
            </div>
            );
    }
}

export default Recipe;