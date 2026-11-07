import { MongoClient } from "mongodb";
import {auth} from "@clerk/nextjs/server";

const client = new MongoClient(process.env.MONGO_URI);


export async function GET() {

    const { userId } = await auth();

    const collection= client.db("makedo").collection("preferences");
    const preferences = await collection.findOne({ userId });

    return Response.json(preferences || {});
}


export async function POST(request) {

    const { userId } = await auth();
    const { diet, exclude, allergies } = await request.json();

    const collection = client.db("makedo").collection("preferences");

    await collection.updateOne({ userId }, { $set: { diet, exclude, allergies }}, { upsert: true });

    return Response.json({ saved: true });
}