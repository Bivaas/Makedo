"use client";

import { useState, useEffect } from "react";


export default function FavouritesPage() {

    const [favorites, setFavorites] = useState([]);

    useEffect(() => {

        setFavorites(JSON.parse(localStorage.getItem("favorites") || "[]"));
    }, []);

    return (

        <main>

            <h1>Favourites:</h1>
            {favorites.length === 0 && <p>No favourites yet!</p>}

            <ul>

                {favorites.map((favorite) => (
                    
                    <li key={favorite.id}>
                        <a href = {`/recipe/${favorite.id}`}>{favorite.title}</a>
                    </li>
                ))}

            </ul>
        </main>
    );
}