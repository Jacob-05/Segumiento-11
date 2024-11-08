class Agente {
    constructor(nombre, rol, habilidades, imagen) {
        this.nombre = nombre;
        this.rol = rol;
        this.habilidades = habilidades;
        this.imagen = imagen;
    }
}

async function getAgents() {
    try {
        const response = await fetch('https://valorant-api.com/v1/agents');
        const data = await response.json();
        const agentes = data.data.map(agente => {
            return new Agente(
                agente.displayName,
                agente.role ? agente.role.displayName : 'Desconocido',
                agente.abilities.map(habilidad => habilidad.displayName).filter(h => h), // Filtra posibles nulos
                agente.displayIcon
            );
        });
        renderAgents(agentes);
        addSearchFunctionality(agentes);
    } catch (error) {
        console.error('Error al obtener los datos de los agentes:', error);
    }
}

function renderAgents(agentes) {
    const container = document.getElementById('agents-container');
    container.innerHTML = ''; // Limpia el contenido previo

    agentes.forEach(agente => {
        const agenteDiv = document.createElement('div');
        agenteDiv.classList.add('agente');

        agenteDiv.innerHTML = `
            <img src="${agente.imagen}" alt="${agente.nombre}">
            <h2>${agente.nombre}</h2>
            <p>Rol: ${agente.rol}</p>
            <ul>
                ${agente.habilidades.map(habilidad => `<li>${habilidad}</li>`).join('')}
            </ul>
        `;

        container.appendChild(agenteDiv);
    });
}

function addSearchFunctionality(agentes) {
    const searchBar = document.getElementById('search-bar');

    searchBar.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredAgents = agentes.filter(agente => 
            agente.nombre.toLowerCase().includes(searchTerm)
        );
        renderAgents(filteredAgents);
    });
}

window.onload = getAgents;