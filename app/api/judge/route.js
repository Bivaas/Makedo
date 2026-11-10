export async function POST(request) {

    const { ingredients, recipes } = await request.json();

    const res = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {

        method: "POST",
        headers: {

            Authorization: `Bearer ${process.env.NV_API_KEY}`,
            "Content-type": "application/json",
        },

        body: JSON.stringify ({ 

            model: "nvidia/nemotron-3.5-lightning-30b-a3b",

            message: [{ role: "user", content: `There are only these ingredients: ${ingredients}. Here are recipes with what each is missing: ${recipes}. Pick around 5 recipes that can still taste good without missing items. For each, clearly tell the recipe name when it works and if it doesn't then say honestly that nothing can be made out of those ingredients. Write the response in plain text only.`}],

            max_tokens: 4000,
        }),
    });

    const data = await res.json();

    return Response.json ({ answer: data.choices[0].message.content });
}