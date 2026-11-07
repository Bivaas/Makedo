"use client";

import { useState } from "react";
import toast from "react-hot-toast";


export default function SwapButton ({ ingredient }) {

    const [swaps, setSwaps ] = useState("");
    const [loading, setLoading] = useState(false);
    
    async function handleClick() {

        setLoading(true);
        const res = await fetch(`/api/swaps?ingredient=${ingredient}&avoid=${avoid}`);
        setLoading(false);

        if (!res.ok) {

            toast.error("something isn't right!");
            return;
        }

        const data = await res.json();
        setSwaps(data.swaps);
    }

    return (

        <div>

            <button type="button" onClick={handleClick} className="mt-3 text-sm border rounded px-3 py-1 cursor-pointer" >swap {ingredient}</button>

            {loading && <p className="mt-2 text-sm" >thinking.....</p>}

            <p className="mt-2 text-sm whitespace-pre-line">{swaps}</p>

        </div>
    );
}