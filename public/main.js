const BASE_URL = 'http://localhost:3000';

async function refreshTeam() {
    let response = await fetch(`${BASE_URL}/get_team`);
    if (response.ok) {
        let team = await response.json();
        let table = document.getElementById('team').getElementsByTagName('tbody')[0];
        table.innerHTML = ''; // Clear the table
        team.forEach(pokemon => {
            let row = table.insertRow();
            row.insertCell(0).textContent = pokemon.nickname;
            row.insertCell(1).textContent = pokemon.type;
            row.insertCell(2).textContent = pokemon.level;
            row.insertCell(3).textContent = pokemon.status;
            let actions = row.insertCell(4);
            actions.innerHTML = `<button onclick="editPokemon('${pokemon.nickname}')">Edit</button>
                                 <button onclick="deletePokemon('${pokemon.nickname}')">Delete</button>`;
        });
    } else {
        console.error('Error fetching team:', response.statusText);
    }
}

async function refreshBadges() {
    let response = await fetch(`${BASE_URL}/get_badges`);
    if (response.ok) {
        let badges = await response.json();
        let ul = document.getElementById('badges');
        ul.innerHTML = ''; // Clear the list
        badges.forEach(badge => {
            let li = document.createElement('li');
            li.innerHTML = `${badge} <button onclick="editBadge('${badge}')">Edit</button>
                            <button onclick="deleteBadge('${badge}')">Delete</button>`;
            ul.appendChild(li);
        });
    } else {
        console.error('Error fetching badges:', response.statusText);
    }
}

async function addPokemon() {
    let nickname = document.getElementById('nickname').value;
    let type = document.getElementById('type').value;
    let level = document.getElementById('level').value;
    let status = document.getElementById('status').value;

    let newPokemon = { nickname, type, level, status };

    let response = await fetch(`${BASE_URL}/add_pokemon`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPokemon),
    });

    if (response.ok) {
        refreshTeam();
    } else {
        console.error('Error adding Pokemon:', response.statusText);
    }
}

async function deletePokemon(nickname) {
    let response = await fetch(`${BASE_URL}/delete_pokemon`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nickname }),
    });

    if (response.ok) {
        refreshTeam();
    } else {
        console.error('Error deleting Pokemon:', response.statusText);
    }
}

async function editPokemon(oldNickname) {
    let newNickname = prompt("Enter the new nickname:", oldNickname);
    let newType = prompt("Enter the new type:");
    let newLevel = prompt("Enter the new level:");
    let newStatus = prompt("Enter the new status (Alive/Fainted):");

    let response = await fetch(`${BASE_URL}/edit_pokemon`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ oldNickname, newNickname, newType, newLevel, newStatus }),
    });

    if (response.ok) {
        refreshTeam();
    } else {
        console.error('Error editing Pokemon:', response.statusText);
    }
}


async function addBadge() {
    let badge = document.getElementById('badge').value;

    let response = await fetch(`${BASE_URL}/add_badge`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ badge }),
    });

    if (response.ok) {
        refreshBadges();
    } else {
        console.error('Error adding badge:', response.statusText);
    }
}

async function deleteBadge(badge) {
    let response = await fetch(`${BASE_URL}/delete_badge`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ badge }),
    });

    if (response.ok) {
        refreshBadges();
    } else {
        console.error('Error deleting badge:', response.statusText);
    }
}

async function editBadge(oldBadge) {
    let newBadge = prompt("Enter the new badge name:", oldBadge);

    let response = await fetch(`${BASE_URL}/edit_badge`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ oldBadge, newBadge }),
    });

    if (response.ok) {
        refreshBadges();
    } else {
        console.error('Error editing badge:', response.statusText);
    }
}
