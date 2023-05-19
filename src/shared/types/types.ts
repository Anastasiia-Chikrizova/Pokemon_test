export type Pokemon = {
    id: number;
    name: string;
    types: [{slot: number, type: { name: string } }];
    weight: number;
    height: number;
    stats: [{ base_stat: number; stat: { name: string } }];
    sprites: {
        front_default: string | null;
    };
    moves: []
};
