# Makedo

A recipe finder for when we open our fridge, see the available ingredients but don't know what to cook. You can type whatever raw ingredients you have, choose filters like vegetarian or vegan, allergies and ingredients you dont like to have. You will be shown 10 recipes (ranked first by most ingredients you have) and for missing ingredients, you have swap button where a very special AI will suggest the swap (alternative) for missing ingredient.

You can also type a dish name you would want to make (like pizza) and if you like it, you could save it to favourites and your filter preference if you're signed in.

## Features

- search for top 10 possible recipes with available ingredients
- dish name search for things we want to make
- filters for diet and allergies
- cant have option in recipe
- AI additional note (filter)
- ask the chef for recipe related question
- sign in with google acc and save favourite / preference

## How it works

I used spoonacular's complexSearch API with current filters and the recipe page fetches all information. All AI related features like swaps, note, ask the chef uses Nvidia nemotron-3-30b-a3b model at 4000 tokens. Clerk is also used (in development mode) for storing user favorite and preferences. 

## Limitationss

The main limitation is using an API (free) for getting the recipes. Spoonacular free plan includes only 50 points per day which can be ~25 searches a day or lower depending on what filters are used. The AI features also adds few seconds or minutes of delay and AI answers or allergy filter may not be completely accurate for some individuals. 

## Used

Toast: https://react-hot-toast.com/
clerk: https://clerk.com/
Recipes: https://spoonacular.com/food-api
Database: https://www.mongodb.com/atlas
Color palette: https://coolors.co/palettes/popular/simple
AI: https://build.nvidia.com/

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.


## Use of AI

I used AI during initial planning of the project to find spoonacular API, finding right AI model for this project (high parameter vs faster) and to check if models has been retired or not. I have also used AI for debugging, fixing error and getting project feedback on improvements.