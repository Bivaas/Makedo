const SPOONACULAR_URL = "https://api.spoonacular.com/recipes/findByIngredients";

const RESULTS = 10;
const RANKING = 2


export async function GET(request) {

    const ingredients = request.nextUrl.searchParams.get("ingredients");
    
    const url = `${SPOONACULAR_url}?ingredients=${ingredients}&number=${RESULTS}&ranking=${RANKING}$apiKey=${process.env.SPOONACULAR_API_KEY}`;

    const res = await fetch(url);

    const recipes = await res.json();

    return Response.json(recipes, { status: res.status});
}