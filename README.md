# 🍽️ Mealify – Local Recipe Manager App

**Mealify** is a simple recipe management app built with **bare React Native** (not Expo-managed). It uses **Realm** for local data storage, allowing users to save, update, and manage recipes directly on their device. While it doesn't fetch data from external APIs, it is not an offline-first app — it depends on user input or preloaded content.

> 📌 This project was developed as an **assignment for Dev Innovation Limited**.

---

## 🚀 Features

- 📦 **Realm Database** for fast and persistent local storage
- 🧭 **React Navigation** for smooth screen transitions
- 🎨 **NativeWind CSS** for utility-first styling
- 🛠️ **TypeScript** for type-safe development
- ⚡ **No external API calls** — all data is user-managed
- 📂 **Release build available** in `release app` folder for direct installation

---

## 📱 Tech Stack

| Layer         | Tool/Library            |
|---------------|-------------------------|
| UI            | React Native + NativeWind |
| Navigation    | React Navigation        |
| State & DB    | Realm                   |
| Language      | TypeScript              |

---

## 📦 Installation

```bash
git clone https://github.com/your-username/mealify.git
cd mealify
npm install
npm run android