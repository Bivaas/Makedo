export async function GET(request) {

    const ingredients = request.nextUrl.searchParams.get("ingredients");
    const dish = request.nextUrl.searchParams.get("dish");
    const diet = request.nextUrl.searchParams.get("diet");
    const avoid = request.nextUrl.searchParams.get("avoid");

    const res = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {

        method: "POST",

        headers: {

            Authorization:  `Bearer ${process.env.NV_API_KEY}`,
            "Content-Type": "application/json",            
        },

        body: JSON.stringify({

            model: "nvidia/nemotron-3.5-lightning-30b-a3b",

            messages: [{role:"user", content: `write one simple home recipe using mostly these ingredients: ${ingredients}. Dish wanted: ${dish}. Diet: ${diet}. Never use: ${avoid}. Start with the recipe name, cooking time, ingredients and amount in clear 5-10 numbered steps. Keep it short, write in plain text WITHOUT any markdown !!`}],
            
            max_tokens: 15000,
            chat_template_kwargs: { enable_thinking: false },
        }),
    });

    const data = await res.json();

    return Response.json({recipe: data.choices[0].message.content});
}