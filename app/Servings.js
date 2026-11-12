"use client";

import { useState } from "react";


export default function Servings({ servings, ingredients }) {

    const [people, setPeople] = useState(servings);

    return (

        <div>

            <h2 className = "text-xl font-semibold mt-8 mb-2">Ingredients</h2>

            <p className="mb-3 text-gray-600">

                serves

                <button type="button" onClick={() => setPeople(Math.max(1, people - 1))}
                    className="mx-2 border rounded px-2 cursor-pointer">-</button>

                {people}

                <button type="button" onClick={() => setPeople(people + 1)} className="mx-2 border rounded px-2 cursor-pointer">+</button>
            </p>

            <ol className="list-decimal pl-6 space-y-1">
                
                {ingredients.map(( ingredient, index) => (

                    <li key={index}>{ingredient.amount ? `${Math.round(ingredient.amount * people / servings * 100) / 100} ${ingredient.unit} ${ingredient.name}` : ingredient.original} </li>

                ))}

            </ol> 

        </div>
    )
}