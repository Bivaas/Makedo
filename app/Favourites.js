"use client";

import toast from "react-hot-toast";


export default function Favourites({ id, title }) {

    function handleClick() {

        const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

        if (favorites.some((favorite) => favorite.id === id)) {

            toast("I'm already your favorite");
            return;
        }

        favorites.push({ id, title });
        localStorage.setItem("favorites", JSON.stringify(favorites));

        toast.success("saved to favorites!");
    }

    return <button onClick={handleClick} className="mt-4 border rounded px-4 py-2 font-sm" >save to favorites</button>
}