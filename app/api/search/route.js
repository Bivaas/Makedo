const SPOONACULAR_URL = "https://api.spoonacular.com/recipes/findByIngredients";

const RESULTS = 10;


export async function GET(request) {

    const ingredients = request.nextUrl.searchParams.get("ingredients");
    
    const url = `${SPOONACULAR_URL}?ingredients=${ingredients}&number=${RESULTS}&apiKey=${process.env.SPOONACULAR_API_KEY}`;

    const res = await fetch(url);

    const recipes = await res.json();

    return Response.json(recipes);
}