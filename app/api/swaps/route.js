export async function GET(request) {

    const ingredient = request.nextUrl.searchParams.get("ingredient");

    const res = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {

        method: "POST",
        headers: {

            Authorization: `Bearer ${process.env.NV_API_KEY}`,
            "Content-Type": "application/json",
        },

        body: JSON.stringify({

            model: "nvidia/nemotron-3.5-lightning-30b-a3b",
            messages: [{ role: "user", content: `suggest 2 common cooking substitutes and steps for ${ingredient} in very short`}],
            max_tokens: 1000,
        }),
    } );

    const data = await res.json();

    return Response.json ({ swaps: data.choices[0].message.content });
}