// Éléments
const bookWrapper = document.getElementById("bookWrapper");
const book3D = document.getElementById("book3D");
const bookOpen = document.getElementById("bookOpen");
const bookOverlay = document.getElementById("bookOverlay");
const closeBookBtn = document.getElementById("closeBookBtn");
const homeBtn = document.getElementById("homeBtn");
const chapterItems = document.querySelectorAll('.chapter-item');
const chapterContents = document.querySelectorAll('.chapter-content');

// OUVRIR LE LIVRE
book3D.addEventListener("click", () => {
	// Overlay sombre
	bookOverlay.classList.add("active");
	
	// Animation d'ouverture
	bookWrapper.classList.add("opening");
	
	// Cacher bouton accueil
	homeBtn.style.opacity = "0";
	homeBtn.style.pointerEvents = "none";
	
	// Après animation, afficher le contenu
	setTimeout(() => {
		bookWrapper.style.display = "none";
		bookOpen.classList.add("active");
		// Enlever l'overlay sombre une fois le livre ouvert
		bookOverlay.classList.remove("active");
	}, 2500);
});

// FERMER LE LIVRE
closeBookBtn.addEventListener("click", () => {
	bookOpen.classList.remove("active");
	bookOverlay.classList.remove("active");
	
	setTimeout(() => {
		bookWrapper.style.display = "flex";
		bookWrapper.classList.remove("opening");
		homeBtn.style.opacity = "1";
		homeBtn.style.pointerEvents = "auto";
	}, 400);
});

// Navigation chapitres
chapterItems.forEach(item => {
	item.addEventListener('click', () => {
		const chapterId = item.dataset.chapter;
		
		chapterItems.forEach(i => i.classList.remove('active'));
		item.classList.add('active');
		
		chapterContents.forEach(c => c.classList.remove('active'));
		document.getElementById(chapterId).classList.add('active');
		
		document.getElementById('rightPage').scrollTop = 0;
	});
});

// Fermer avec Échap
document.addEventListener('keydown', (e) => {
	if (e.key === 'Escape' && bookOpen.classList.contains('active')) {
		closeBookBtn.click();
	}
});