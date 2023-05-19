import {
    Button, Layout, Space, Typography, Select, SelectProps,
} from 'antd';
import { PokemonsList } from 'components/PokemonsList';
import {
    useCallback, useEffect, useMemo, useState,
} from 'react';
import { getPokemons } from 'shared/services/pokemons';
import { Pokemon } from 'shared/types/types';
import { Type } from 'components/PokemonDetailInfo/PokemonDetailInfo';
import cls from './PokemonPage.module.scss';

const { Header, Content } = Layout;
const { Title } = Typography;
const PokemonPage = () => {
    const [pokemonsList, setPokemonsList] = useState<Pokemon[] | []>([]);
    const [filteretList, setFilteretList] = useState<Pokemon[] | []>([]);
    const [nextUrl, setNextUrl] = useState(null);

    const getPokemonsList = useCallback(async () => {
        try {
            const data = await getPokemons(nextUrl);
            const nextLink = data.next.split('/').slice(-1).join();
            setPokemonsList((p) => [...p, ...data.pokemonList]);
            setNextUrl(nextLink);
        } catch (e) {
            console.log(e);
        }
    }, [nextUrl, pokemonsList]);

    useEffect(() => {
        getPokemonsList();
    }, []);

    const onLoadMoreClick = () => getPokemonsList();

    const types = useMemo(() => pokemonsList.flatMap((el) => el.types.map((el) => el.type.name)), [pokemonsList]);
    const options = [...new Set(types)].map((type) => ({
        label: type,
        value: type,
    }));

    const handleChange = (value: string[]) => value.forEach((selectedType) => {
        const d = pokemonsList.filter((el: Pokemon) => {
            const selectResult = el?.types?.filter(({ type }: Type) => type?.name === selectedType);
            if (selectResult?.length > 0) {
                return el;
            }
        });
        setFilteretList(d);
    });

    const onClearSelect = () => setFilteretList(pokemonsList);

    return (
        <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
            <Layout>
                <Header className={cls.header}><Title level={3}>Pokedex</Title></Header>
                <Content className={cls.content}>
                    <Select
                        mode="multiple"
                        allowClear
                        style={{ width: '30%' }}
                        placeholder="Select pokemon type"
                        defaultValue={[]}
                        onChange={handleChange}
                        options={options}
                        onClear={onClearSelect}
                    />
                    <PokemonsList pokemons={filteretList.length > 0 ? filteretList : pokemonsList} />
                    <Button type="primary" onClick={onLoadMoreClick}>Load More</Button>
                </Content>
            </Layout>
        </Space>
    );
};

export default PokemonPage;
