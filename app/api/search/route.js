export async function GET(request) {

    const ingredients = request.nextUrl.searchParams.get("ingrediennts");
    return Response.json ({ message: "search route works!", ingredients });
}