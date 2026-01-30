# 🧩 Pokédex (React Native + Expo Router)

A simple, clean **Pokédex app** built with **React Native**, **Expo**, and the **PokéAPI**.  
Browse Pokémon, tap one to see detailed stats, types, abilities, and more.

This project focuses on **clear structure**, **good TypeScript habits**, and **scalable styling** — without over-engineering.

---

## ✨ Features

- 📜 Pokémon list fetched from PokéAPI
- 🔍 Pokémon details screen (name, types, sprites, height, weight, abilities, stats)
- 🎨 Type-based color theming
- 📱 Mobile-first UI
- 🧠 Clean separation of:
  - screens
  - shared types
  - shared styles

---

## 🛠 Tech Stack

- React Native
- Expo
- Expo Router
- TypeScript
- PokéAPI (https://pokeapi.co)

---

## 📂 Project Structure

app/
index.tsx # Pokémon list screen
details.tsx # Pokémon details screen

types/
pokemon.ts # Shared Pokémon interfaces

styles/
colors.ts # Pokémon type colors
typography.ts # Shared text styles

---

## 🚀 Getting Started

### 1️⃣ Clone the repo

```bash
git clone https://github.com/your-username/pokedex.git
cd pokedex


### 2️⃣ Install dependencies
npm install


or

yarn

### 3️⃣ Start the app
npx expo start

Then open it in:

Expo Go (mobile)

Android emulator

iOS simulator

Web

## 🔌 API Used

All Pokémon data comes from:

PokéAPI
https://pokeapi.co/api/v2/pokemon

No authentication required.

## 🎨 Styling Approach

Uses React Native StyleSheet

Shared styles live in app/styles

Screen-specific styles stay inside screens

Pokémon types are mapped to colors via colorsByType

Example:

colorsByType.fire // "#EE8130"

## 🧠 Design Decisions

No global state — local state is enough

No UI libraries — focuses on core React Native

Simple abstractions only when needed

Expo Router for file-based navigation

🧪 Future Improvements

🔎 Search Pokémon by name

⭐ Favorites

🌙 Dark mode

🎭 Reusable components (TypeChip, StatBar)

📊 More Pokémon data (moves, evolution chains)

## 📸 Screenshots


## 📜 License

MIT License
Feel free to use, modify, and learn from this project.

## 🙌 Acknowledgements

PokéAPI for the incredible free API

Pokémon © Nintendo / Game Freak
```
