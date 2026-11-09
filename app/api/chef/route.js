export async function POST(request) {

    const { question, title, ingredients, steps } = await request.json();

    const res = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {

        method: "POST",

        headers: {
            Authorization: `Bearer ${process.env.NV_API_KEY}`,
            "Content-type": "application/json",
        },

        body: JSON.stringify ({

            model: "nvidia/nemotron-3.5-lightning-30b-a3b",

            messages: [{ role: "user", content: `You are a very friendly home chef. Recipe: ${title}, ingredients: ${ingredients}, steps: ${steps}. Your question is: ${question}. Answer in plain text.`}],

            max_tokens: 4000,
        }),
    });

    const data = await res.json();

    return Response.json ({ answer: data.choices[0].message.content });
}