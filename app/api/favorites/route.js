import { MongoClient } from "mongodb";
import { auth } from "@clerk/nextjs/server";

const client = new MongoClient(process.env.MONGO_URI);


export async function POST(request) {

    const { userId } = await auth();

    if (!userId) {

        return Response.json({ message: "signin first!"}, { status: 401});
    }

    const { id, title } = await request.json();

    const collection = client.db("makedo").collection("favorites");

    const result = await collection.updateOne({ id, userId }, { $set: { title}}, { upsert: true});

    return Response.json({ added: result.upsertedCount === 1 });
}


export async function GET() { 

    const { userId } = await auth();

    const collection = client.db("makedo").collection("favorites");
    const favorites = await collection.find({ userId }).toArray();

    return Response.json(favorites);
}