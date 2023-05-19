import {
    Card, Image, Tag, Typography,
} from 'antd';

import { Pokemon } from 'shared/types/types';

interface PokemonItemProps {
    pokemon?: Pokemon;
}

const { Title } = Typography;

export const PokemonItem = ({ pokemon } : PokemonItemProps) => (
    <Card bordered={false} hoverable>
        <Image
            src={pokemon.sprites.front_default}
        />
        <Title level={5}>
            {pokemon.name}
        </Title>
        {
            pokemon.types.map((type) => (
                <Tag key={type.slot} bordered={false}>
                    {type.type.name}
                </Tag>
            ))
        }
    </Card>
);
