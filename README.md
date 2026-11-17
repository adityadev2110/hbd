# Birthday Surprise — V5-inspired premium edition

This is your updated birthday surprise website. It keeps the original React + Vite project and adds a redesigned pastel lock screen, bunting, a custom teddy illustration, polished keypad interactions, floating decorations and a more animated welcome screen.

## Password

The website password is **211107**. It is set in `src/config/password.js`.

## Run the website

1. Install Node.js (LTS) if it is not already installed: https://nodejs.org/
2. Open this `birthday` folder in VS Code.
3. Open Terminal → New Terminal.
4. Run `npm install` and wait for it to finish.
5. Run `npm run dev`.
6. Open the local address shown in the terminal (usually http://localhost:5173).

## Personalize it

Open `src/data/birthdayContent.js` to change the name, birthday message, photo captions, memories, wishes and final message.

Put your own photos inside `public/images/` and update the matching `src` values in `birthdayContent.js`, for example `/images/photo1.jpg`.

For background music, add an MP3 file at `public/music/song.mp3`. Music starts only after the visitor presses Play.

## Build for publishing

Run `npm run build`. The production website is created in the `dist` folder. You can deploy it to Cloudflare Pages or Vercel.

Note: this password is a front-end surprise gate, not secure authentication. Do not use it to protect confidential files or private information.
