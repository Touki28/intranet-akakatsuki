// ========================================
// TIER LIST COLLABORATIVE AKAKATSUKI
// ========================================

let tiers = [];
let items = [];
let draggedElement = null;

// Éléments DOM
const tierList = document.getElementById('tierList');
const unrankedItems = document.getElementById('unrankedItems');
const addTierModal = document.getElementById('addTierModal');
const addItemModal = document.getElementById('addItemModal');

// ========== CHARGEMENT INITIAL ========== //
async function loadData() {
	try {
		// Charger les tiers
		const tiersResult = await window.storage.get('akakatsuki-tiers', true);
		if (tiersResult) {
			tiers = JSON.parse(tiersResult.value);
		} else {
			// Tiers par défaut
			tiers = [
				{ id: 'tier-s', name: 'S', color: '#ff4757' },
				{ id: 'tier-a', name: 'A', color: '#ffa502' },
				{ id: 'tier-b', name: 'B', color: '#ffd700' },
				{ id: 'tier-c', name: 'C', color: '#2ed573' },
				{ id: 'tier-d', name: 'D', color: '#5352ed' }
			];
			await saveTiers();
		}
		
		// Charger les items
		const itemsResult = await window.storage.get('akakatsuki-items', true);
		if (itemsResult) {
			items = JSON.parse(itemsResult.value);
		}
		
		renderTierList();
		renderUnrankedItems();
	} catch (error) {
		console.error('Erreur chargement:', error);
	}
}

// ========== SAUVEGARDE ========== //
async function saveTiers() {
	try {
		await window.storage.set('akakatsuki-tiers', JSON.stringify(tiers), true);
	} catch (error) {
		console.error('Erreur sauvegarde tiers:', error);
	}
}

async function saveItems() {
	try {
		await window.storage.set('akakatsuki-items', JSON.stringify(items), true);
	} catch (error) {
		console.error('Erreur sauvegarde items:', error);
	}
}

// ========== RENDU ========== //
function renderTierList() {
	tierList.innerHTML = '';
	
	tiers.forEach((tier, index) => {
		const tierRow = document.createElement('div');
		tierRow.className = 'tier-row';
		tierRow.dataset.tierId = tier.id;
		
		const tierLabel = document.createElement('div');
		tierLabel.className = 'tier-label';
		tierLabel.style.background = tier.color;
		tierLabel.textContent = tier.name;
		tierLabel.draggable = true;
		tierLabel.addEventListener('dragstart', handleTierDragStart);
		tierLabel.addEventListener('dragend', handleTierDragEnd);
		
		const tierItems = document.createElement('div');
		tierItems.className = 'tier-items';
		tierItems.dataset.tier = tier.id;
		
		// Ajouter les items de ce tier
		items
			.filter(item => item.tier === tier.id)
			.forEach(item => {
				tierItems.appendChild(createItemElement(item));
			});
		
		// Actions
		const actions = document.createElement('div');
		actions.className = 'tier-actions';
		
		const editBtn = document.createElement('button');
		editBtn.className = 'tier-action-btn';
		editBtn.innerHTML = '✏️';
		editBtn.title = 'Modifier';
		editBtn.onclick = () => editTier(tier.id);
		
		const deleteBtn = document.createElement('button');
		deleteBtn.className = 'tier-action-btn';
		deleteBtn.innerHTML = '🗑️';
		deleteBtn.title = 'Supprimer';
		deleteBtn.onclick = () => deleteTier(tier.id);
		
		const upBtn = document.createElement('button');
		upBtn.className = 'tier-action-btn';
		upBtn.innerHTML = '⬆️';
		upBtn.title = 'Monter';
		upBtn.onclick = () => moveTier(index, -1);
		
		const downBtn = document.createElement('button');
		downBtn.className = 'tier-action-btn';
		downBtn.innerHTML = '⬇️';
		downBtn.title = 'Descendre';
		downBtn.onclick = () => moveTier(index, 1);
		
		if (index > 0) actions.appendChild(upBtn);
		if (index < tiers.length - 1) actions.appendChild(downBtn);
		actions.appendChild(editBtn);
		actions.appendChild(deleteBtn);
		
		// Drag & Drop
		tierItems.addEventListener('dragover', handleDragOver);
		tierItems.addEventListener('drop', handleDrop);
		tierItems.addEventListener('dragenter', handleDragEnter);
		tierItems.addEventListener('dragleave', handleDragLeave);
		
		tierRow.appendChild(tierLabel);
		tierRow.appendChild(tierItems);
		tierRow.appendChild(actions);
		tierList.appendChild(tierRow);
	});
}

function renderUnrankedItems() {
	unrankedItems.innerHTML = '';
	
	items
		.filter(item => !item.tier || item.tier === 'unranked')
		.forEach(item => {
			unrankedItems.appendChild(createItemElement(item));
		});
	
	// Drag & Drop
	unrankedItems.addEventListener('dragover', handleDragOver);
	unrankedItems.addEventListener('drop', handleDrop);
	unrankedItems.addEventListener('dragenter', handleDragEnter);
	unrankedItems.addEventListener('dragleave', handleDragLeave);
}

function createItemElement(item) {
	const div = document.createElement('div');
	div.className = 'tier-item';
	div.draggable = true;
	div.dataset.itemId = item.id;
	
	const img = document.createElement('img');
	img.src = item.image;
	img.alt = item.name;
	
	const name = document.createElement('div');
	name.className = 'item-name';
	name.textContent = item.name;
	
	const deleteBtn = document.createElement('button');
	deleteBtn.className = 'delete-item';
	deleteBtn.innerHTML = '✕';
	deleteBtn.onclick = (e) => {
		e.stopPropagation();
		deleteItem(item.id);
	};
	
	div.appendChild(img);
	div.appendChild(name);
	div.appendChild(deleteBtn);
	
	// Drag events
	div.addEventListener('dragstart', handleItemDragStart);
	div.addEventListener('dragend', handleItemDragEnd);
	
	return div;
}

// ========== DRAG & DROP ========== //
function handleItemDragStart(e) {
	draggedElement = e.target;
	e.target.classList.add('dragging');
	e.dataTransfer.effectAllowed = 'move';
}

function handleItemDragEnd(e) {
	e.target.classList.remove('dragging');
	document.querySelectorAll('.drag-over').forEach(el => el.classList.remove('drag-over'));
}

function handleTierDragStart(e) {
	draggedElement = e.target.closest('.tier-row');
	e.dataTransfer.effectAllowed = 'move';
}

function handleTierDragEnd(e) {
	draggedElement = null;
}

function handleDragOver(e) {
	e.preventDefault();
	e.dataTransfer.dropEffect = 'move';
}

function handleDragEnter(e) {
	if (e.target.classList.contains('tier-items') || e.target.classList.contains('items-container')) {
		e.target.classList.add('drag-over');
	}
}

function handleDragLeave(e) {
	if (e.target.classList.contains('tier-items') || e.target.classList.contains('items-container')) {
		e.target.classList.remove('drag-over');
	}
}

function handleDrop(e) {
	e.preventDefault();
	const target = e.target.classList.contains('tier-items') || e.target.classList.contains('items-container') 
		? e.target 
		: e.target.closest('.tier-items, .items-container');
	
	if (!target || !draggedElement) return;
	
	if (draggedElement.classList.contains('tier-item')) {
		const itemId = draggedElement.dataset.itemId;
		const newTier = target.dataset.tier;
		
		const item = items.find(i => i.id === itemId);
		if (item) {
			item.tier = newTier;
			saveItems();
			renderTierList();
			renderUnrankedItems();
		}
	}
	
	target.classList.remove('drag-over');
}

// ========== GESTION TIERS ========== //
document.getElementById('addTierBtn').addEventListener('click', () => {
	document.getElementById('tierName').value = '';
	document.getElementById('tierColor').value = '#f44336';
	addTierModal.classList.add('active');
});

document.getElementById('closeTierModal').addEventListener('click', () => {
	addTierModal.classList.remove('active');
});

document.getElementById('saveTierBtn').addEventListener('click', async () => {
	const name = document.getElementById('tierName').value.trim();
	const color = document.getElementById('tierColor').value;
	
	if (!name) {
		alert('Veuillez entrer un nom');
		return;
	}
	
	const newTier = {
		id: 'tier-' + Date.now(),
		name: name,
		color: color
	};
	
	tiers.push(newTier);
	await saveTiers();
	renderTierList();
	addTierModal.classList.remove('active');
});

async function editTier(tierId) {
	const tier = tiers.find(t => t.id === tierId);
	if (!tier) return;
	
	const newName = prompt('Nouveau nom:', tier.name);
	if (newName && newName.trim()) {
		tier.name = newName.trim();
		await saveTiers();
		renderTierList();
	}
}

async function deleteTier(tierId) {
	if (!confirm('Supprimer ce tier ? Les éléments seront déplacés vers "À classer"')) return;
	
	// Déplacer les items vers unranked
	items.forEach(item => {
		if (item.tier === tierId) item.tier = 'unranked';
	});
	
	tiers = tiers.filter(t => t.id !== tierId);
	await saveTiers();
	await saveItems();
	renderTierList();
	renderUnrankedItems();
}

async function moveTier(index, direction) {
	const newIndex = index + direction;
	if (newIndex < 0 || newIndex >= tiers.length) return;
	
	[tiers[index], tiers[newIndex]] = [tiers[newIndex], tiers[index]];
	await saveTiers();
	renderTierList();
}

// ========== GESTION ITEMS ========== //
document.getElementById('addItemBtn').addEventListener('click', () => {
	document.getElementById('itemName').value = '';
	document.getElementById('itemImage').value = '';
	document.getElementById('imagePreview').innerHTML = '';
	addItemModal.classList.add('active');
});

document.getElementById('closeItemModal').addEventListener('click', () => {
	addItemModal.classList.remove('active');
});

document.getElementById('itemImage').addEventListener('change', (e) => {
	const file = e.target.files[0];
	if (file) {
		const reader = new FileReader();
		reader.onload = (event) => {
			const preview = document.getElementById('imagePreview');
			preview.innerHTML = `<img src="${event.target.result}" alt="Preview">`;
		};
		reader.readAsDataURL(file);
	}
});

document.getElementById('saveItemBtn').addEventListener('click', async () => {
	const name = document.getElementById('itemName').value.trim();
	const imageFile = document.getElementById('itemImage').files[0];
	
	if (!name || !imageFile) {
		alert('Veuillez remplir tous les champs');
		return;
	}
	
	const reader = new FileReader();
	reader.onload = async (event) => {
		const newItem = {
			id: 'item-' + Date.now(),
			name: name,
			image: event.target.result,
			tier: 'unranked'
		};
		
		items.push(newItem);
		await saveItems();
		renderUnrankedItems();
		addItemModal.classList.remove('active');
	};
	reader.readAsDataURL(imageFile);
});

async function deleteItem(itemId) {
	if (!confirm('Supprimer cet élément ?')) return;
	
	items = items.filter(i => i.id !== itemId);
	await saveItems();
	renderTierList();
	renderUnrankedItems();
}

// ========== RÉINITIALISATION ========== //
document.getElementById('resetBtn').addEventListener('click', async () => {
	if (!confirm('⚠️ ATTENTION: Réinitialiser TOUTE la tier list ? Cette action est irréversible !')) return;
	
	try {
		await window.storage.delete('akakatsuki-tiers', true);
		await window.storage.delete('akakatsuki-items', true);
		tiers = [];
		items = [];
		await loadData();
	} catch (error) {
		console.error('Erreur reset:', error);
	}
});

// Fermer modales en cliquant dehors
[addTierModal, addItemModal].forEach(modal => {
	modal.addEventListener('click', (e) => {
		if (e.target === modal) {
			modal.classList.remove('active');
		}
	});
});

// ========== INITIALISATION ========== //
loadData();