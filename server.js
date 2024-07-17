const express = require('express');
const path = require('path');
const cors = require('cors'); // Import cors
const app = express();

app.use(cors()); // Enable CORS
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let team = [];
let badges = [];

// Routes
app.get('/get_team', (req, res) => res.json(team));
app.get('/get_badges', (req, res) => res.json(badges));

app.post('/add_pokemon', (req, res) => {
    team.push(req.body);
    res.json({ success: true });
});

app.post('/add_badge', (req, res) => {
    badges.push(req.body.badge);
    res.json({ success: true });
});

app.delete('/delete_pokemon', (req, res) => {
    const index = team.findIndex(p => p.nickname === req.body.nickname);
    if (index !== -1) team.splice(index, 1);
    res.json({ success: index !== -1 });
});

app.put('/edit_pokemon', (req, res) => {
    const { oldNickname, newNickname, newType, newLevel, newStatus } = req.body;
    const pokemon = team.find(p => p.nickname === oldNickname);

    if (pokemon) {
        pokemon.nickname = newNickname || pokemon.nickname;
        pokemon.type = newType || pokemon.type;
        pokemon.level = newLevel || pokemon.level;
        pokemon.status = newStatus || pokemon.status;
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

app.delete('/delete_badge', (req, res) => {
    const index = badges.indexOf(req.body.badge);
    if (index !== -1) badges.splice(index, 1);
    res.json({ success: index !== -1 });
});

app.put('/edit_badge', (req, res) => {
    const index = badges.indexOf(req.body.oldBadge);
    if (index !== -1) badges[index] = req.body.newBadge;
    res.json({ success: index !== -1 });
});

// Serve index.html for any unknown routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
