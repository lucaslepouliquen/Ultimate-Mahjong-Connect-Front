# Mahjong Connect - Angular Frontend 🎴

This is an **Angular web application** for Mahjong Connect. It serves as the **front-end interface**, while the game logic and tile-matching rules are handled by a **.NET backend**.

## 🛠️ Tech Stack
- **Frontend:** Angular, TypeScript
- **Backend:** .NET API (**not included in this repository**)
- **Styling:** CSS

## 🎮 Features
- 🀄 **Displays a Mahjong Connect board** dynamically
- 🔄 **Communicates with the .NET API** to handle tile connections
- 🖱️ **Interactive gameplay**: Click tiles to select and match them
- 🎨 **Responsive UI** for different screen sizes

---

## 🚀 Installation

### 1️⃣ Clone the repository
```sh
git clone https://github.com/YourGitHubUsername/mahjong-connect.git
cd mahjong-connect
```

### 2️⃣ Install dependencies
```sh
npm install
```

### 3️⃣ Run the development server
```sh
ng serve
```
The application will be available at **[http://localhost:4200](http://localhost:4200)**.

---

## 🔗 Backend API
This frontend connects to a **.NET backend** that provides the game logic.

- The API should be running at `http://localhost:5000`
- Endpoints used:
  - `GET /api/game/board` → Retrieves the Mahjong board
  - `POST /api/game/select` → Selects a tile and checks for a match

---

## 📌 To-Do List
- [ ] Improve UI animations for tile removal
- [ ] Add a timer and score tracking
- [ ] Implement better error handling

---

## 📄 License
MIT License

