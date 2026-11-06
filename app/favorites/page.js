"use client";

import { useState, useEffect } from "react";


export default function FavouritesPage() {

    const [favorites, setFavorites] = useState([]);

    useEffect(() => {

        fetch("/api/favorites")
            .then((res) => res.json())
            .then((data) => setFavorites(data));
    })

    return (

        <main>

            <h1 className="text-3xl font-bold mb-6">Favourites:</h1>
            {favorites.length === 0 && <p>No favourites yet!</p>}

            <ul className="space-y-3">

                {favorites.map((favorite) => (
                    
                    <li key={favorite.id}>
                        <a href = {`/recipe/${favorite.id}`}  className="text-lg hover:underline">{favorite.title}</a>
                    </li>
                ))}

            </ul>
        </main>
    );
}