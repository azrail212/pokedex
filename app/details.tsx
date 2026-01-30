import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { colorsByType } from "./styles/colors";
import { typography } from "./styles/typography";
import type { Pokemon } from "./types/pokemon";

export default function Details() {
  const params = useLocalSearchParams();
  const nameParam = params.name;
  const name =
    typeof nameParam === "string"
      ? nameParam
      : Array.isArray(nameParam)
        ? nameParam[0]
        : undefined;

  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    //fetch pokemon details using params.name
    if (!name) return;
    fetchPokemonByName(name.toLowerCase());
  }, [name]);

  async function fetchPokemonByName(name: string) {
    try {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + name);
      const data = await response.json();

      const mapped: Pokemon = {
        name: data.name,
        image: data.sprites.front_default,
        imageBack: data.sprites.back_default,
        height: data.height,
        weight: data.weight,
        abilities: data.abilities,
        types: data.types,
        stats: data.stats,
      };

      setPokemon(mapped);
    } catch (e) {
      console.log(e);
    }
  }

  if (!pokemon) {
    return (
      <View style={{ padding: 16 }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const typeNames = pokemon.types.map((t) => t.type.name);
  const primaryType = typeNames[0];

  const bg = primaryType
    ? // @ts-ignore
      colorsByType[primaryType] + "33"
    : "#00000010";

  // pokeapi height is decimeters, weight is hectograms
  const heightM = (pokemon.height / 10).toFixed(1);
  const weightKg = (pokemon.weight / 10).toFixed(1);

  const prettyStatName = (s: string) => {
    if (s === "hp") return "HP";
    if (s === "attack") return "Attack";
    if (s === "defense") return "Defense";
    if (s === "special-attack") return "Sp. Atk";
    if (s === "special-defense") return "Sp. Def";
    if (s === "speed") return "Speed";
    return s;
  };

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <View style={[styles.card, { backgroundColor: bg }]}>
        <Text style={typography.name}>{pokemon.name}</Text>

        {/* Types */}
        <View style={styles.rowCenterWrap}>
          {typeNames.map((t) => (
            <View
              key={t}
              style={[
                styles.chip,
                {
                  // @ts-ignore
                  backgroundColor: (colorsByType[t] ?? "#111827") + "CC",
                },
              ]}
            >
              <Text style={styles.chipText}>{t}</Text>
            </View>
          ))}
        </View>

        {/* Images */}
        <View style={styles.imagesRow}>
          <Image source={{ uri: pokemon.image }} style={styles.sprite} />
          <Image source={{ uri: pokemon.imageBack }} style={styles.sprite} />
        </View>

        {/* Quick facts */}
        <View style={styles.section}>
          <Text style={typography.sectionTitle}>Quick facts</Text>

          <View style={styles.factsRow}>
            <View style={styles.factBox}>
              <Text style={styles.factLabel}>Height</Text>
              <Text style={styles.factValue}>{heightM} m</Text>
            </View>

            <View style={styles.factBox}>
              <Text style={styles.factLabel}>Weight</Text>
              <Text style={styles.factValue}>{weightKg} kg</Text>
            </View>
          </View>
        </View>

        {/* Abilities */}
        <View style={styles.section}>
          <Text style={typography.sectionTitle}>Abilities</Text>

          <View style={styles.rowWrap}>
            {pokemon.abilities.map((a) => (
              <View key={a.ability.name} style={styles.pill}>
                <Text style={styles.pillText}>{a.ability.name}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Stats */}
        <View style={styles.section}>
          <Text style={typography.sectionTitle}>Base stats</Text>

          <View style={{ gap: 10 }}>
            {pokemon.stats?.map((s) => {
              const value = s.base_stat;
              const pct = Math.min(value / 200, 1); // simple cap
              return (
                <View key={s.stat.name} style={{ gap: 6 }}>
                  <View style={styles.statHeader}>
                    <Text style={styles.statName}>
                      {prettyStatName(s.stat.name)}
                    </Text>
                    <Text style={styles.statValue}>{value}</Text>
                  </View>

                  <View style={styles.statTrack}>
                    <View
                      style={[styles.statFill, { width: `${pct * 100}%` }]}
                    />
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    gap: 16,
    padding: 16,
  },
  card: {
    padding: 20,
    borderRadius: 20,
    gap: 16,
  },
  rowCenterWrap: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 10,
  },
  rowWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  chipText: {
    color: "white",
    fontWeight: "700",
    textTransform: "capitalize",
  },

  imagesRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  sprite: {
    width: 160,
    height: 160,
  },

  section: {
    backgroundColor: "#FFFFFFB3",
    borderRadius: 16,
    padding: 14,
    gap: 12,
  },
  factsRow: {
    flexDirection: "row",
    gap: 12,
  },
  factBox: {
    flex: 1,
    backgroundColor: "#FFFFFFCC",
    borderRadius: 14,
    padding: 12,
    gap: 6,
  },
  factLabel: {
    color: "#6B7280",
    fontWeight: "700",
  },
  factValue: {
    fontSize: 18,
    fontWeight: "800",
  },

  pill: {
    backgroundColor: "#111827",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },
  pillText: {
    color: "white",
    fontWeight: "700",
    textTransform: "capitalize",
  },

  statHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statName: {
    fontWeight: "700",
    color: "#111827",
  },
  statValue: {
    fontWeight: "800",
    color: "#111827",
  },
  statTrack: {
    height: 10,
    backgroundColor: "#00000014",
    borderRadius: 999,
    overflow: "hidden",
  },
  statFill: {
    height: "100%",
    backgroundColor: "#111827",
    borderRadius: 999,
  },
});
