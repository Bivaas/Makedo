export async function GET(request) {

    const note = request.nextURl.searchParams.get("note");
    const ingredient = request.nextUrl.searchParams.get("ingredients");
    const dish = request.nextUrl.searchParams.get("dish");
    const diet = request.nextUrl.searchParams.get("diet");
    const exclude = request.nextUrl.searchParams.get("exclude");
    const allergies = request.nextUrl.searchParams.get("allergies");

    const res = await fetch("https://integrate.api.nvidia.com.v1/chat/completions", {

        method: "POST",
        headers: {

            Authorization: `Bearer ${process.env.NV_API_KEY}`,
            "Content-type": "application/json",
        },

        body: JSON.stringify ({

            model: "nvidia/nemotron-3.5-lightning-30b-a3b",

            messages: [{ role: "user", content: `you turn a cooking note into recipe search filters. Current filters are: ingredients "${ingredients}", dish "${dish}", diet "${diet}", can't have "${exclude}", allergies "${allergies}" and note: "${note}". Update the filters using the provided note. You should reply with JSON like {"ingredients":"egg, cheese","dish":"pizza","diet":"","exclude":"mushroom","allergies":["dairy"]}` }],

            max_tokens: 4000,
    }),
});

const data = await res.json();
const text = data.choices[0].messsage.content;
const json = text.slice(text.indexOf("{"), text.lastIndexOf("}") + 1);

return Response.json(JSON.parse(json));

}