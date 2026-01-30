import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { colorsByType } from "./styles/colors";
import { typography } from "./styles/typography";
import type { Pokemon } from "./types/pokemon";

export default function Index() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    //fetch pokemons from api
    fetchPokemons();
  }, []);

  async function fetchPokemons() {
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=10",
      );
      const data = await response.json();

      const detailedPokemons = await Promise.all(
        data.results.map(async (pokemon: any) => {
          const res = await fetch(pokemon.url);
          const details = await res.json();
          return {
            name: pokemon.name,
            image: details.sprites.front_default,
            imageBack: details.sprites.back_default,
            height: details.height,
            weight: details.weight,
            abilities: details.abilities,
            types: details.types,
          };
        }),
      );

      setPokemons(detailedPokemons);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{
        gap: 16,
        padding: 16,
      }}
    >
      {pokemons.map((pokemon) => (
        <Link
          key={pokemon.name}
          href={{
            pathname: "/details",
            params: { name: pokemon.name },
          }}
          style={{
            // @ts-ignore
            backgroundColor: colorsByType[pokemon.types[0].type.name] + 60,
            padding: 20,
            borderRadius: 20,
          }}
        >
          <View>
            <Text style={typography.name}>{pokemon.name}</Text>
            <Text style={typography.type}>{pokemon.types[0].type.name}</Text>
            <View style={{ flexDirection: "row" }}>
              <Image
                source={{ uri: pokemon.image }}
                style={{ width: 150, height: 150 }}
              />
              <Image
                source={{ uri: pokemon.imageBack }}
                style={{ width: 150, height: 150 }}
              />
            </View>
            {/*  <Text>{pokemon.height}</Text>
            <Text>{pokemon.weight}</Text> */}

            {/* <Text>
            Abilities:{" "}
            {pokemon.abilities
              .map((ability) => ability.ability.name)
              .join(", ")}
          </Text> */}
          </View>
        </Link>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  name: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "capitalize",
  },
  type: {
    fontSize: 20,
    fontWeight: "bold",
    color: "grey",
    textAlign: "center",
    textTransform: "capitalize",
  },
});
