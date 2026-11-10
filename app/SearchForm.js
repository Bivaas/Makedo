"use client"

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import SwapButton from "./SwapButton";
import { useAuth } from "@clerk/nextjs";

const ALLERGIES = [

    "dairy", "egg", "gluten", "peanut", "tree nut", "seafood", "shellfish", "fish", "soy", "sesame", "wheat"
];


export default function SearchForm() {

    const [dish, setDish] = useState("");
    const [diet, setDiet] = useState("");
    const [exclude, setExclude] = useState("");
    const [allergies, setAllergies] = useState([]);
    const [showSwaps, setShowSwaps] = useState(true);
    
    const [ingredients, setIngredients] = useState("");
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);
    const { isSignedIn } = useAuth();
    
    const [aiRecipe, setAiRecipe] = useState("");
    const [aiLoading, setAiLoading] = useState(false);
    const [note, setNote] = useState("");
    const [onlyHave, setOnlyHave] = useState(false);
    const [allResults, setAllResults ] = useState(false);
    const [judgeLoading, setJudgeLoading] = useState(false);


    useEffect(() => {

        if (!isSignedIn) return;

        fetch("/api/preferences")
            .then((res) => res.json())
            .then((data) => {

                setDiet(data.diet || "");
                setExclude(data.eclude || "");
                setAllergies(data.allergies || []);
            });
    }, [isSignedIn]);

    async function savePreferences() {

        await fetch("/api/preferences", { method: "POST", body: JSON.stringify({ diet, exclude, allergies }) });

        toast.success("preferences saved!!");
    }

    function toggleAllergy(allergy) {

        setAllergies(allergies.includes(allergy) ? allergies.filter((item) => 
            item !== allergy) : [...allergies, allergy]);
    }
    
    async function askAI() {
        
        setAiLoading(true);
        const res = await fetch(`/api/ai-recipe?ingredients=${ingredients}&dish=${dish}&diet=${diet}&avoid=${[exclude, ...allergies].join(",")}`);

        const data = await res.json();
        setAiLoading(false);
        setAiRecipe(data.recipe);
    }

    // AI judge ingredients
    async function askJudge() {

        setJudgeLoading(true);

        const list = allResults.map((recipe) => 
            `${recipe.title} (missing: ${recipe.missedIngredients.map((item) => item.name)
                .join(", ")})`).join("; ");

        const res = await fetch("/api/judge", { method: "POST", body: JSON.stringify ({ ingredients, recipes: list })});

        const data = await res.json();

        setJudgeLoading(false);
        setJudge(data.answer);
    }


    async function handleSubmit(event) {

        event.preventDefault();
        setLoading(true);
        setAiRecipe("")

        let search = { ingredients, dish, diet, exclude, allergies };

        if (note) {

            const noteRes = await fetch(`/api/note?note=${note}&ingredients=${ingredients}&dish=${dish}&diet=${diet}&exclude=${exclude}&allergies=${allergies.join(".")}`);

            search = await noteRes.json();

            setIngredients(search.ingredients);
            setDish(search.dish);
            setDiet(search.diet);
            setExclude(search.exclude);
            setAllergies(search.allergies);
        }

        const res = await fetch(`/api/search?ingredients=${search.ingredients}&dish=${search.dish}&diet=${search.diet}&exclude=${search.exclude}&allergies=${search.allergies.join(",")}&onlyHave=${onlyHave}`);

        const data = await res.json();
        setLoading(false);

        // toast err
        if (!res.ok) {

            toast.error(data.message);
            return;
        } 

        setAllResults(data.results);
        setJudge("");
        setRecipes(onlyHave ? data.results.filter((recipe) => recipe.missedIngredientCount === 0) : data.results);

        setSearched(true);
    }

    return (

        <form onSubmit={handleSubmit}>

            {/* filters */}
            <div className="border rounded p-4 mb-6">

            <p className="mb-3 font-semibold">filters</p>
            

            {/* dish name */}
            <input value={dish} onChange={( event ) =>

                setDish(event.target.value)}
                    placeholder="dish you wanna make (optional)"
                    className="block w-72 border rounded px-3 py-2 mb-2" />

            {/* dietary restriction */}
            <select value={diet} onChange={(event) => setDiet(event.target.value)} className = "block border rounded px-3 py-2 mb-2">

                <option value="">any diet</option>
                <option value="vegetarian">vegetarian</option>
                <option value="vegan">vegan</option>

            </select>

            {/* cant have food */}
            <input value={exclude} onChange={(event) =>

                setExclude(event.target.value)}
                placeholder ="can't have ingredients in dish"
                className ="block w-72 border rounded px-3 py-2 mb-2"
                />

            {/* allergy checkbox */}
            <div className="mb-4 flex flex-wrap gap-3 text-sm">

                    {ALLERGIES.map((allergy) => (
                        <label key={allergy}>

                            <input type="checkbox" checked={allergies.includes(allergy)} onChange={() => toggleAllergy(allergy)} className="mr-1" />

                            {allergy}

                        </label>
                    ))}

            </div>

             {/* swap toggle */}
            <label className="block text-sm py-5">

                <input type="checkbox" checked={showSwaps} onChange={() => setShowSwaps(!showSwaps)} className="mr-1" />
                swap suggestions

            </label> 

            {/* only what I have */}
            <label className="block mb-2 text-sm">

                <input type="checkbox" checked={onlyHave} onChange={() => setOnlyHave(!onlyHave)} className="mr-1"/> 
                only what I have

            </label>



            {/* save preferences */}
            {isSignedIn && <button type="button" onClick={savePreferences} className="mb-4 text-sm border rounded px-3 py-1 cursor-pointer">save preferences</button>}

            {/* AI note */}
            <textarea value={note} onChange={(event) => setNote(event.target.value)} rows={2} placeholder="optional note for AI" className="block w-full border rounded px-3 py-2 mb-1" />
            
            <p className="mb-4 text-xs">This note does adds few seconds of delay</p>

            </div>

            {/* ingredients */}
            <input value={ingredients} onChange={(event) =>

                setIngredients(event.target.value)}
                placeholder="ingredients you have"
                className="w-72 border rounded px-3 py-2" />

            <button type="submit" className="ml-2 border rounded px-4 py-2 bg-[#e0afa0]">Search</button>

            {loading && <p className="mt-4">Searching...</p>}

            {searched && !loading && recipes.length === 0 && <p className="mt-5">no recipes found ... try with different ingredients </p>}

            {onlyHave && searched && !loading && recipes.length === 0 && (

                <div className="mt-4">

                    <button type="button" onClick={askJudge} className="border rounded px-4 py-2 bg=[#e0afa0]">ask AI if any still works</button>

                    {judgeLoading && <p className="mt-2 text-sm">AI is checking something ...</p>}

                    <p className="mt-4 whitespace-pre-line">{judge}</p>

                </div>
            )}


            {/* AI */}
            {searched && !!loading && recipe.length === 0 && (

                <div className="mt-4">

                    <button type="button" onClick={askAI} className="border rounded px-4 py-2 bg-[#e0afa0]">ask AI</button>

                    {aiLoading && <p className="mt-2 text-sm">Ai is cooking something ....</p>}

                    <p className="mt-4 whitespace-pre-line">{aiRecipe}</p>
                </div>
            )}

            <ul className="mt-8 space-y-6">
                {recipes.map((recipe) => (
                    
                        <li key={recipe.id} className="border-b pb-6">

                            <Link href={`/recipe/${recipe.id}`} className="text-lg">{recipe.title}</Link>

                            {/* missing ingredients */}
                            <p className="mt-1 text-sm">you have {recipe.usedIngredientCount} but you're missing {recipe.missedIngredientCount}</p>

                            <p className="text-sm">missing: {recipe.missedIngredients.map((item) => item.name).join(", ")}</p>

                            {/* swap btn */}
                            {showSwaps && recipe.missedIngredients.map((item, index) => (

                                <SwapButton key={index} ingredient={item.name} avoid={[exclude, ...allergies].join(", ")}  />
                            ))}

                        </li>

                ))}
            </ul>

        </form>
    );
}