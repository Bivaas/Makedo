"use client";

import { useState } from "react";
import toast from "react-hot-toast";


export default function SwapButton({ ingredient}) {

    const [swaps, setSwaps ] = useState("");
    const [loading, setLoading] = useState(false);
    
    async function handleClick() {

        setLoading(true);
        const res = await fetch(`/api/swaps?ingredient=${ingredient}`);
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

            <button type="button" onClick={handleClick}>swap {ingredient}</button>
            {loading && <p>thinking.....</p>}
            <p>{swaps}</p>

        </div>
    );
}