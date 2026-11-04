"use client"

import { useState } from "react";

export default function SearchForm() {

    const [ingredients, setIngredients] = useState("");
    const [recipes, setRecipes] = useState({});

    async function handleSubmit(event) {

        event.preventDefault();
        const res = await fetch(`/api/search?ingredients=${ingredients}`);
        const data = await res.json();
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
                    <li key={recipe.id}>{recipe.title}</li>
                ))}
            </ul>

        </form>
    );
}