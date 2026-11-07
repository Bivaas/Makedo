
export async function GET(request) {

    const ingredients = request.nextUrl.searchParams.get("ingredients");
    const dish = request.nextUrl.searchParams.get("dish");
    const diet = request.nextUrl.searchParams.get("diet");
    const exclude = request.nextUrl.searchParams.get("exclude");
    
    const url = `https://api.spoonacular.com/recipes/findByIngredients?query=${dish}&includeIngredients=${ingredients}&diet=${diet}&excludeIngredients=${exclude}&fillIngredients=true&sort=${SORT}&number=10&apiKey=${process.env.SPOONACULAR_API_KEY}`;

    const res = await fetch(url);

    const recipes = await res.json();

    return Response.json(recipes, { status: res.status});
}