"use client"

import { useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import SwapButton from "./SwapButton";


export default function SearchForm() {

    const [dish, setDish] = useState("");

    const [ingredients, setIngredients] = useState("");
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);

    async function handleSubmit(event) {

        event.preventDefault();
        setLoading(true);

        const res = await fetch(`/api/search?ingredients=${ingredients}&dish=${dish}`);
        const data = await res.json();
        setLoading(false);

        // toast err
        if (!res.ok) {

            toast.error(data.message);
            return;
        } 

        setRecipes(data.results);
        setSearched(true);
    }

    return (

        <form onSubmit={handleSubmit}>

            {/* dish name */}
            <input value={dish} onChange={( event ) =>

                setDish(event.target.value)}
                    placeholder="dish you wanna make (optional)"
                    className="block w-72 border rounded px-3 py-2 mb-2" />

            {/* ingredients */}
            <input value={ingredients} onChange={(event) =>

                setIngredients(event.target.value)}
                placeholder="ingredients you have"
                className="w-72 border rounded px-3 py-2" />

            <button type="submit" className="ml-2 border rounded px-4 py-2" >Search</button>

            {loading && <p className="mt-4">Searching...</p>}

            {searched && !loading && recipes.length === 0 && <p className="mt-5">no recipes found... try different ingredients </p>}

            <ul className="mt-8 space-y-6">
                {recipes.map((recipe) => (
                    
                        <li key={recipe.id} className="border-b pb-6">

                            <Link href={`/recipe/${recipe.id}`} className="text-lg">{recipe.title}</Link>

                            {/* missing ingredients */}
                            <p className="mt-1 text-sm">you have {recipe.usedIngredientCount} but you're missing {recipe.missedIngredientCount}</p>

                            <p className="text-sm">missing: {recipe.missedIngredients.map((item) => item.name).join(", ")}</p>

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