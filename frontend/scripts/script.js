document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('/api/items');
    const items = await response.json();
    const itemsList = document.getElementById('items-list');

    items.forEach(item => {
        const div = document.createElement('div');
        div.className = 'item';
        div.innerHTML = `
            <h2>${item.name}</h2>
            <p>Preis: ${item.price} Gold</p>
            <p>Mana: ${item.mana}</p>
        `;
        itemsList.appendChild(div);
    });
});
