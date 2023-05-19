import { Col, List, Row } from 'antd';
import { PokemonItem } from 'components/PokemonItem';
import { Pokemon } from 'shared/types/types';
import { PokemonDetailInfo } from 'components/PokemonDetailInfo/PokemonDetailInfo';
import { useCallback, useState } from 'react';
import cls from './PokemonsList.module.scss';

interface PokemonsListProps {
    pokemons: Pokemon[]
}

export const PokemonsList = ({ pokemons }: PokemonsListProps) => {
    const [pokemon, setPokemon] = useState<Pokemon>(null);

    const onDetailPokemonCLick = useCallback((pokemon:Pokemon) => setPokemon(pokemon), [pokemon]);

    return (
        <Row align="middle">
            <Col flex="1 1 200px">
                <List
                    grid={{
                        gutter: 16,
                        xs: 1,
                        sm: 2,
                        md: 3,
                        lg: 3,
                        xl: 3,
                        xxl: 4,
                    }}
                    dataSource={pokemons}
                    renderItem={(pokemon) => (
                        <List.Item onClick={() => onDetailPokemonCLick(pokemon)}>
                            <PokemonItem key={pokemon?.id} pokemon={pokemon} />
                        </List.Item>
                    )}
                />
            </Col>
            {pokemon
                && (
                    <Col flex="0 1 350px" style={{ margin: '10px' }}>
                        <PokemonDetailInfo pokemon={pokemon} onDetailPokemonCLick={onDetailPokemonCLick} />
                    </Col>
                )}
        </Row>

    );
};
