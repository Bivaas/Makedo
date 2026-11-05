"use client"

import { useState } from "react";
import toast from "react-hot-toast";


export default function SearchForm() {

    const [ingredients, setIngredients] = useState("");
    const [recipes, setRecipes] = useState([]);

    async function handleSubmit(event) {

        event.preventDefault();
        const res = await fetch(`/api/search?ingredients=${ingredients}`);
        const data = await res.json();

        // toast err
        if (!res.ok) {

            toast.error(data.message);
            return;
        } 

        setRecipes(data);
    }

    return (

        <form onSubmit={handleSubmit}>

            <input value={ingredients} onChange={(event) =>

                setIngredients(event.target.value)}
                placeholder="eggs, tomato, cheese" />

            <button type="submit">Search</button>

            <ul>
                {recipes.map((recipe) => (
                    
                        <li key={recipe.id}>

                            {recipe.title}
                            <P>you have {recipe.usedIngredientCount} but you're missing {recipe.missedIngredientCount}</P>

                            <p>missing: {recipe.missedIngredients.map((item) => item.name).join(", ")}</p>

                        </li>

                ))}
            </ul>

        </form>
    );
}