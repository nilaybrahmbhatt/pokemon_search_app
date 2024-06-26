export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const offset = searchParams.get("offset") || 0;

  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=40&offset=${offset}`
  );
  const data = await response.json();

  const pokemons = await Promise.all(
    data.results.map(async (pokemon) => {
      const response = await fetch(pokemon.url);
      return response.json();
    })
  );

  return new Response(JSON.stringify({ pokemons }), { status: 200 });
}
