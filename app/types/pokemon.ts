export interface Pokemon {
  name: string;
  image: string;
  imageBack: string;
  height: number;
  weight: number;
  types: PokemonType[];
  abilities: PokemonAbility[];
  stats?: PokemonStat[]; // optional so Index doesn’t have to include it
}

export interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
}

export interface PokemonType {
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonStat {
  base_stat: number;
  stat: { name: string };
}
