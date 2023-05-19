import { RouteProps } from 'react-router-dom';
import { PokemonPage } from 'pages/PokemonPage';
import { NotFoundPage } from 'pages/NotFoundPage';

export enum AppRoutes {
    POKEMONS = 'pokemons',
    NOT_FOUND = 'not_found'
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.POKEMONS]: '/',
    [AppRoutes.NOT_FOUND]: '*',
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.POKEMONS]: {
        path: RoutePath.pokemons,
        element: <PokemonPage />,
    },
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <PokemonPage />,
    },
};
