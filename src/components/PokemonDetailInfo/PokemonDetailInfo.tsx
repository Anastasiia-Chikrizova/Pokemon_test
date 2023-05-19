import {
    Button,
    Card, Col, Image, Row, Tag, Typography,
} from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import React, { useCallback } from 'react';
import { Pokemon } from 'shared/types/types';
import cls from './PokemonDetailInfo.module.scss';

interface PokemonDetailInfoProps {
    pokemon: Pokemon
    onDetailPokemonCLick: (pokemon: Pokemon)=> void
}
export interface Type {slot: number; type: { name: string }}
interface Stats {
    base_stat: number;
    effort: number;
    stat: {
        name: string;
        url: string;
    }
}
const { Title } = Typography;

const formatStatName = (statName: string) => {
    switch (statName) {
    case 'hp':
        return 'HP';
    case 'attack':
        return 'Attack';
    case 'defense':
        return 'Defense';
    case 'special-attack':
        return 'SP Attack';
    case 'special-defense':
        return 'SP Defense';
    case 'speed':
        return 'Speed';
    default:
        return '';
    }
};

export const PokemonDetailInfo = ({ pokemon, onDetailPokemonCLick } : PokemonDetailInfoProps) => {
    const {
        id, sprites, name, weight, moves, stats, types,
    } = pokemon;

    const formatPokemonId = useCallback(() => (id < 10 ? `#00${id}` : id >= 10 && id < 99 ? `#0${id}` : `#${id}`), [id]);
    const pokemonType = () => useCallback(() => types?.map(({ type }: Type) => type.name).join(' , '), [types]);

    return (
        <Card bordered={false} hoverable>
            <div className={cls.container}>
                <Button type="primary" shape="circle" icon={<CloseOutlined />} onClick={() => onDetailPokemonCLick(null)} />
            </div>
            <Image
                src={sprites?.front_default}
            />
            <Title level={5}>
                {name}
                {formatPokemonId()}
            </Title>
            <Row>
                <Col span={12}>Type</Col>
                <Col span={12}>{pokemonType()}</Col>
            </Row>
            {stats?.map(({ stat, base_stat }: Stats) => (
                <Row key={stat?.name}>
                    <Col span={12}>{formatStatName(stat?.name)}</Col>
                    <Col span={12}>{base_stat}</Col>
                </Row>
            ))}
            <Row>
                <Col span={12}>Weight</Col>
                <Col span={12}>{weight}</Col>
            </Row>
            <Row>
                <Col span={12}>Total moves</Col>
                <Col span={12}>{moves?.length}</Col>
            </Row>

            {/* </div> */}

        </Card>

    );
};
