const API_URL = "http://127.0.0.1:8000/pets";

const petForm = document.getElementById("pet-form");
const petIdInput = document.getElementById("pet-id");
const petNameInput = document.getElementById("pet-name");
const petSpeciesInput = document.getElementById("pet-species");
const petAgeInput = document.getElementById("pet-age");
const btnSubmit = document.getElementById("btn-submit");
const btnText = document.getElementById("btn-text");
const petsList = document.getElementById("pets-list");
const counterBadge = document.getElementById("counter-badge");

// 1. READ: Obtener registros al iniciar
async function loadPets() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Error en servidor");
        const data = await response.json();
        renderPets(data);
    } catch (error) {
        console.error(error);
        petsList.innerHTML = '<p class="empty-list" style="color:#e74c3c;">No se pudo conectar con el servidor backend.</p>';
    }
}

function renderPets(pets) {
    // Actualizar el contador flotante de tu Stitch
    counterBadge.textContent = `${pets.length} Registro${pets.length !== 1 ? 's' : ''}`;

    if (!pets || pets.length === 0) {
        petsList.innerHTML = '<p class="empty-list">No hay mascotas registradas actualmente.</p>';
        return;
    }
    petsList.innerHTML = "";
    pets.forEach(pet => {
        const div = document.createElement("div");
        div.className = "pet-item";
        div.innerHTML = `
            <div>
                <strong>${pet.name}</strong> — <span>${pet.species} (${pet.age} años)</span>
            </div>
            <div>
                <button class="btn-edit" onclick="editMode(${pet.id}, '${pet.name}', '${pet.species}', ${pet.age})">Editar</button>
                <button class="btn-delete" onclick="deletePet(${pet.id})">Borrar</button>
            </div>
        `;
        petsList.appendChild(div);
    });
}

// 2. CREATE / UPDATE: Registrar o Modificar
petForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = petIdInput.value;
    const data = {
        name: petNameInput.value,
        species: petSpeciesInput.value,
        age: parseInt(petAgeInput.value)
    };

    try {
        let response;
        if (id) {
            response = await fetch(`${API_URL}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });
        } else {
            response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });
        }

        if (!response.ok) throw new Error("Error en la operación");
        
        resetForm();
        loadPets();
    } catch (error) {
        alert("Error al procesar los datos de la mascota.");
    }
});

function editMode(id, name, species, age) {
    petIdInput.value = id;
    petNameInput.value = name;
    petSpeciesInput.value = species;
    petAgeInput.value = age;
    btnText.textContent = "Actualizar Mascota";
    btnSubmit.style.backgroundColor = "#fa8231";
}

function resetForm() {
    petIdInput.value = "";
    petForm.reset();
    btnText.textContent = "Registrar Mascota";
    btnSubmit.style.backgroundColor = "#0d6e4b";
}

// 3. DELETE: Eliminar
async function deletePet(id) {
    if (confirm("¿Seguro que quieres eliminar este registro?")) {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: "DELETE"
            });
            if (!response.ok) throw new Error("Error");
            loadPets();
        } catch (error) {
            alert("No se pudo eliminar.");
        }
    }
}

document.addEventListener("DOMContentLoaded", loadPets);
