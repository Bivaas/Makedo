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

    return <button onClick={handleClick}>save to favorites</button>
}