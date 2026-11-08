"use client";

import toast from "react-hot-toast";


export default function Favourites({ id, title }) {

    async function handleClick() {

        const res = await fetch("/api/favorites", { method: "POST", body: JSON.stringify({ id, title }) });

        const data = await res.json();

        toast(data.added ? "saved to favorites !!" : "I'm already your favorite");
    }

    return <button onClick={handleClick} className="mt-4 border rounded px-4 py-2 font-sm bg-[#e0afa0]" >save to favorites</button>
}