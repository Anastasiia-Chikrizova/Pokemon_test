import axios from 'axios';

export const instance = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/pokemon',
});

export async function getPokemons(nextUrl?: string) {
    const { data } = await instance.get(nextUrl ?? '/?limit=12');
    const promises = data?.results?.map(
        async ({ name }: { name: string }) => (await instance.get(`${name}`)).data,
    );
    const pokemonList = await Promise.all(promises);
    return {
        pokemonList,
        next: data.next,
    };
}
