import Favourites from "../../Favourites";

export const instant = false;

const RECIPE = "https://api.spoonacular.com/recipes";


export default async function RecipePage({ params }) {

    const { id } = await params;

    const res = await fetch(`${RECIPE}/${id}/information?apiKey=${process.env.SPOONACULAR_API_KEY}`);
    const recipe = await res.json();

    return (

        <main>

            <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>

            <img src={recipe.image} alt={recipe.title} className="w-full rounded mb-4"/>

            <p>ready in {recipe.readyInMinutes} minutes</p>
            <p>serves {recipe.servings}</p>

            <Favourites id={recipe.id} title={recipe.title} />

            {/* ingredients */}
            <h2 className="text-xl mt-8 mb-4 font-semibold">Ingredients</h2>

            <ol className="list-decimal pl-6 space-y-1">

                {recipe.extendedIngredients.map((ingredient, index) => (

                    <li key= {index}>{ingredient.original}</li>
                ))}

            </ol>

            {/* steps */}
            <h2 className="text-xl mt-7 mb-4 font-semibold">Steps:</h2>

            <ol className="list-decimal pl-6 space-y-1">

                {recipe.analyzedInstructions.flatMap((group) => group.steps).map((step, index) => (

                    <li key={index}>{step.step}</li>
                ))}

            </ol>

        </main>

    );
}