"use client";

import { useState } from "react";


export default function AskChef ({ title, ingredients, steps }) {

    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);


    async function handleAsk() {

        setLoading(true);

        const res = await fetch("/api/chef", { method: "POST", body: JSON.stringify ({ question, title, ingredients, steps }) });
        const data = await res.json();

        setLoading(false);
        setAnswer(data.answer);
    }

    return (

        <div className="mt-8">

            <h2 className="text-xl font-xl mb-2">ask the chef</h2>

            <textarea value={question} onChange={(event) => setQuestion(event.target.value)} rows={2} placeholder="ask any question to a professional chef" className="black w-full border rounded px-3 py-2 mb-2" />

                <button type="button" onClick={handleAsk} className="border rounded px-4 py-2 bg-[#e0aafa0] cursor-pointer">ask</button>

                {loading && <p className="mt-2 text-sm">your personal chef is thinking .... </p>}
            
            <p className="mt-4 whitespace-pre-line">{answer}</p>

        </div>
    );
}