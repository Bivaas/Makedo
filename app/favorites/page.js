"use client";

import { useState, useEffect } from "react";


export default function FavouritesPage() {

    const [favorites, setFavorites] = useState([]);

    useEffect(() => {

        fetch("/api/favorites")
            .then((res) => res.json())
            .then((data) => setFavorites(data));
    }, []);

    async function removeFavorite(id) {

        await fetch("/api/favorites", { method: "DELETE", body: JSON.stringify({ id }) });

        setFavorites(favorites.filter(( favorite ) => favorite.id !== id));
    }

    return (

        <main>

            <h1 className="text-3xl font-bold mb-6">Favourites:</h1>
            {favorites.length === 0 && <p>No favourites yet!</p>}

            <ul className="space-y-3">

                {favorites.map((favorite) => (
                    
                    <li key={favorite.id}>
                        <a href = {`/recipe/${favorite.id}`}  className="text-lg hover:underline">{favorite.title}</a>

                        <button onClick={() => removeFavorite(favorite.id)} className="ml-3 text-sm border rounded px-2">remove</button>
                    </li>
                ))}

            </ul>
        </main>
    );
}


export async function DELETE(request) {

    const { userId } = await auth();
    const { id } = await request.json();

    const collection = client.db("makedo").collection("favorites");
    await collection.deleteOne({ id, userId });

    return Response.json({ removed: true });
}