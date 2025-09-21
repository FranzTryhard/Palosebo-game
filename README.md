# Racing Game with Leaderboard

A simple 2-player racing game built with **Laravel (PHP/MySQL)**, **HTML**, **CSS**, and **JavaScript**.  
Players can enter their names, race against each other, and the fastest finish times are saved to a **leaderboard**.

---

## 🚀 Features
- Player name input before each race  
- Real-time 2-player racing  
- Countdown timer and time tracking  
- Leaderboard that stores fastest players  
- Restart game or change players without reloading  
- Responsive and simple UI  

---

## 🛠️ Tech Stack
- **Backend:** Laravel, MySQL  
- **Frontend:** HTML, CSS, JavaScript  
- **Tools:** Composer, NPM  

---

## ⚡ Installation & Setup

Clone the repository and navigate into the project folder:

```bash
git clone <your-repo-url>
cd <your-project-folder>

# Install dependencies:

composer install
npm install

#Create your .env file:

cp .env.example .env

#Generate application key:

php artisan key:generate

#Run database migrations:

php artisan migrate

#Start the development server:

php artisan serve

# Notes

Make sure your database is running (MySQL).

Update your .env file with correct DB_DATABASE, DB_USERNAME, and DB_PASSWORD.

If you want sample data, you can add and run seeders.

#DEVELOPED BY SURBAN FRANCIS, ROCA KERVIE, PARAHINOG JESSIE, MAGDADARO PAULKIE, SAYSON CARLA JENN