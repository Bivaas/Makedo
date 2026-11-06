"use client"

import { useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import SwapButton from "./SwapButton";


export default function SearchForm() {

    const [ingredients, setIngredients] = useState("");
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);

    async function handleSubmit(event) {

        event.preventDefault();
        setLoading(true);

        const res = await fetch(`/api/search?ingredients=${ingredients}`);
        const data = await res.json();
        setLoading(false);

        // toast err
        if (!res.ok) {

            toast.error(data.message);
            return;
        } 

        setRecipes(data);
        setSearched(true);
    }

    return (

        <form onSubmit={handleSubmit}>

            <input value={ingredients} onChange={(event) =>

                setIngredients(event.target.value)}
                placeholder="eggs, tomato, cheese" />

            <button type="submit">Search</button>

            {loading && <p>Searching...</p>}
            {searched && !loading && recipes.length === 0 && <p>no recipes found... try different ingredients </p>}

            <ul>
                {recipes.map((recipe) => (
                    
                        <li key={recipe.id}>

                            <Link href={`/recipe/${recipe.id}`}>{recipe.title}</Link>

                            {/* missing ingredients */}
                            <p>you have {recipe.usedIngredientCount} but you're missing {recipe.missedIngredientCount}</p>

                            <p>missing: {recipe.missedIngredients.map((item) => item.name).join(", ")}</p>

                            {/* swap btn */}
                            {recipe.missedIngredients.map((item, index) => (

                                <SwapButton key={index} ingredient={item.name} />
                            ))}

                        </li>

                ))}
            </ul>

        </form>
    );
}