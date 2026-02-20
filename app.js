let editingIndex = -1; // Para saber se estamos editando um contato

// Função para atualizar a lista de contatos na interface
function updateContactList() {
    const contacts = getContacts(); // Pega os contatos do localStorage
    const contactsContainer = document.getElementById('contacts').getElementsByTagName('tbody')[0];
    const contactCount = document.getElementById('contact-count');

    contactsContainer.innerHTML = ''; // Limpa a lista antes de atualizar
    contacts.forEach((contact, index) => {
        const contactRow = document.createElement('tr');
        contactRow.innerHTML = `
            <td>${contact.name}</td>
            <td>${contact.email}</td>
            <td>${contact.phone}</td>
            <td>
                <button class="edit" onclick="editContact(${index})">Alterar</button>
                <button class="delete" onclick="deleteContact(${index})">Excluir</button>
            </td>
        `;
        contactsContainer.appendChild(contactRow); // Adiciona a linha à tabela
    });

    contactCount.textContent = contacts.length; // Atualiza a contagem de contatos
}

// Função para adicionar ou editar um contato
function addContact() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    if (name && email && phone) {
        const newContact = { name, email, phone };
        const contacts = getContacts();

        if (editingIndex === -1) {
            contacts.push(newContact); // Se não estiver editando, adiciona um novo contato
        } else {
            contacts[editingIndex] = newContact; // Atualiza o contato existente
            editingIndex = -1; // Reseta o índice de edição
        }

        localStorage.setItem('contacts', JSON.stringify(contacts)); // Salva no localStorage
        clearForm(); // Limpa os campos de input
        updateContactList(); // Atualiza a lista de contatos na tela
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}

// Função para recuperar os contatos do localStorage
function getContacts() {
    const contacts = localStorage.getItem('contacts');
    return contacts ? JSON.parse(contacts) : [];
}

// Função para filtrar os contatos com base no nome
function filterContacts() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const contacts = getContacts();
    const filteredContacts = contacts.filter(contact => contact.name.toLowerCase().includes(searchTerm));

    const contactsContainer = document.getElementById('contacts').getElementsByTagName('tbody')[0];
    contactsContainer.innerHTML = '';
    filteredContacts.forEach(contact => {
        const contactRow = document.createElement('tr');
        contactRow.innerHTML = `
            <td>${contact.name}</td>
            <td>${contact.email}</td>
            <td>${contact.phone}</td>
            <td>
                <button class="edit">Alterar</button>
                <button class="delete">Excluir</button>
            </td>
        `;
        contactsContainer.appendChild(contactRow);
    });

    document.getElementById('contact-count').textContent = filteredContacts.length;
}

// Função para editar um contato
function editContact(index) {
    const contacts = getContacts();
    const contact = contacts[index];

    document.getElementById('name').value = contact.name;
    document.getElementById('email').value = contact.email;
    document.getElementById('phone').value = contact.phone;

    editingIndex = index; // Marca que estamos editando um contato
}

// Função para excluir um contato
function deleteContact(index) {
    const contacts = getContacts();
    contacts.splice(index, 1); // Remove o contato da lista
    localStorage.setItem('contacts', JSON.stringify(contacts)); // Atualiza o localStorage
    updateContactList(); // Atualiza a lista de contatos na tela
}

// Função para limpar o formulário
function clearForm() {
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
}

// Função para inicializar a lista de contatos quando a página for carregada
window.onload = function() {
    updateContactList(); // Atualiza a lista de contatos ao carregar a página
};