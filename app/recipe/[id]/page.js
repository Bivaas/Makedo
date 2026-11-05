export const instant = false;

const RECIPE = "https://api.spoonacular.com/recipes";


export default async function RecipePage({ params }) {

    const { id } = await params;

    const res = await fetch(`${RECIPE}/${id}/information?apiKey=${process.env.SPOONACULAR_API_KEY}`);
    const recipe = await res.json();

    return (

        <main>

            <h1>{recipe.title}</h1>
            <p>ready in {recipe.readyInMinutes} minutes</p>
            <p>serves {recipe.servings}</p>

        </main>

    );
}