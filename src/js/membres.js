// Données des membres avec primes stockées
const membersData = [
	{
		name: "Pain Perdu",
		realName: "Leheurteur Maxence",
		image: "../img/pdp/membres/Pain.jpg",
		bounty: 850000,
		techniques: "Rinnegan, cheveux roux",
		palmares: [
			"A créé le site et le Discord",
			"A inventé la technique secrète",
			"Infiltre le CROUS"
		],
		lore: ``
	},
	{
		name: "Konass",
		realName: "Lepiller Floriane",
		image: "../img/pdp/membres/Konan.jpg",
		bounty: 650000,
		techniques: "Manipulation de papier, catcheuse",
		palmares: [
			"Unique femme membre de l'Akatsuki",
			"Ne sait pas conduire",
			"Regarde du catch et du GTA RP"
		],
		lore: ``
	},
	{
		name: "Itachibre Uchiha",
		realName: "Cantoni Bastien",
		image: "../img/pdp/membres/Itachi.jpg",
		bounty: 920000,
		techniques: "Mangekyō Sharingan, féminisme, taper frais, dyslexique",
		palmares: [
			"Est amoureux de Billie Eilish",
			"Est le plus grand des féministes",
			"Son Sharingan lui permet de voir tous les culs aux environs",
			"N'arrive pas à faire des parchemins à cause de son problème au petit doigt"
		],
		lore: `<h4>L'Éveil du Prodige</h4>
		<p>Itachibre vit le jour dans le village isolé de Selens, fils unique et prodige parmi les siens. Son ascension fut rapide, mais son éveil fut déclenché par un événement très spécifique. Alors qu'il s'entraînait, un aîné réputé pour son énorme postérieur perdit l'équilibre en plein saut périlleux et atterrit directement sur le jeune Itachibre.</p>
		
		<p>L'impact fut monumental. La douleur, le choc, et la surprise firent éclore une nouvelle puissance. Le sang coula de ses yeux, et pour la première fois, il vit le monde avec une clarté effrayante. Son Sharingan venait de s'éveiller. Le premier Tomoe de son œil écarlate était né.</p>
		
		<h4>La Malédiction Écarlate</h4>
		<p>Cependant, cet éveil fut maudit. Le Sharingan d'Itachibre était tout le temps actif, le fatiguant énormément, mais lui offrant une vision prémonitoire des mouvements, des techniques... et surtout, des courbes féminines spécifiques. Il pouvait désormais anticiper, avec une précision terrifiante, l'approche ou le mouvement de toute femme dotée d'un énorme cul ou de seins imposants.</p>
		
		<p>Son deuxième Tomoe apparut quelques mois plus tard, en plein cours de langue ninja. La professeure était une femme très sexy dont le corps attirait tous les regards. S'appuyant avec nonchalance sur une table en bois, elle afficha son énorme postérieur. La pression du mouvement, combinée à la concentration accrue d'Itachibre sur cette vision distrayante, fut telle que la table céda sous l'effort. Le choc du bois pulvérisé, face à l'énorme cul de la professeure brisant le mobilier, fit intensifier son chakra.</p>
		
		<p>Le troisième Tomoe final arriva lors d'une mission de renseignement. Cerné par l'ennemi, Itachibre cherchait la faille dans les lignes adverses. Une citoyenne passa devant lui à bout portant. Son regard, involontairement, fut aspiré par un énorme cul d'une perfection... absolue. L'excès de concentration, l'anticipation soudaine du mouvement de la femme, et l'épuisement nerveux firent monter son Sharingan à son stade final.</p>
		
		<p>Dès lors, avec trois tomoes, Itachibre devint le maître du Genjutsu et de l'anticipation, constamment épuisé.</p>
		
		<h4>La Naissance du Duo Écarlate</h4>
		<p>Devenu Chûnin, Itachibre fut placé dans une équipe avec Batotsu. Ils devinrent rapidement Le Duo Écarlate, le fait d'armes le plus légendaire étant la mission du Pays de Groland, où ils affrontèrent une armée entière et débloquèrent, tous les deux, le Mangekyo Sharingan.</p>
		
		<h4>La Disparition et l'Unité 731</h4>
		<p>La gloire fut de courte durée. Batotsu fut immédiatement rappelé par les services secrets de Konoha pour une mission ultra-confidentielle. Il partit sans un mot et fut déclaré disparu en mission pendant les deux années qui suivirent.</p>
		
		<p>Itachibre, seul, accepta de rejoindre l'Unité 731 — l'unité de recherche secrète de Topipirama — où il subit des expériences pour gérer la malédiction de son Sharingan. Cette expérience le plongea plus profondément dans les secrets les plus sombres de Konoha, préparant le terrain pour sa future trahison et son alliance avec Pain Perdu.</p>`
	},
	{
		name: "Kisamerde Hoshigaki",
		realName: "Girard-Fourneaux Liam",
		image: "../img/pdp/membres/Kisame.jpg",
		bounty: 780000,
		techniques: "Affinités Suiton, épée Samehada, Super Gaulois",
		palmares: [
			"Est le meilleur Gaulois",
			"Vit dans le noir depuis 2 ans et demi",
			"A attaqué une mosquée avec du pâté et du taboulé"
		],
		lore: ``
	},
	{
		name: "Deidarabe",
		realName: "Leroy Valentin",
		image: "../img/pdp/membres/Deidara.jpg",
		bounty: 690000,
		techniques: "Argile explosive (Katsu), tricheur, fait du beatbox",
		palmares: [
			"A été attrapé en train de tricher",
			"A acheté une trottinette à 500€",
			"A organisé le 11 septembre"
		],
		lore: ``
	},
	{
		name: "Sassoumi",
		realName: "Hazet Alex",
		image: "../img/pdp/membres/Sasori.jpg",
		bounty: 720000,
		techniques: "Marionnettiste maître, escalade, peut monter à 100%",
		palmares: [
			"A escaladé le mont Everest avec Inoxtag",
			"A maîtrisé Linux",
			"Est bon à JKLM"
		],
		lore: ``
	},
	{
		name: "Orochipartout",
		realName: "Morvan Quentin",
		image: "../img/pdp/membres/Orochimaru.jpg",
		bounty: 810000,
		techniques: "Immortalité, technique de la réincarnation, invocation de Neymar Junior, bon au foot",
		palmares: [
			"Joue à FC Frileuse",
			"A créé Ray Dark",
			"Silencieux comme le vent"
		],
		lore: ``
	},
	{
		name: "Grobito Uchiha (Tobi)",
		realName: "Elmaknasi Lucas",
		image: "../img/pdp/membres/Obito.jpg",
		bounty: 880000,
		techniques: "Mangekyō Sharingan (Kamui), Rinnegan, maître des larves",
		palmares: [
			"A géré une Coréenne de 24 ans",
			"S'est fait attaquer par des larves",
			"A dupliqué des escabeaux"
		],
		lore: ``
	},
	{
		name: "Kakakuzu",
		realName: "Dumont Enzo",
		image: "../img/pdp/membres/Kakuzu.jpg",
		bounty: 760000,
		techniques: "Jiongu (filaments noirs), maîtrise des cinq éléments, alcoolisme",
		palmares: [
			"A gravi les échelons jusqu'à l'Akatsuki",
			"Se détruit le foie et les poumons tous les jeudis et vendredis",
			"Les lunettes de Shrek"
		],
		lore: ``
	},
	{
		name: "Hidanus",
		realName: "Lucas Alexandre",
		image: "../img/pdp/membres/Hidan.jpg",
		bounty: 670000,
		techniques: "Immortel, dieu Jashin",
		palmares: [
			"A supporté Pain Perdu pendant 2 mois lors du jeu d'entreprise",
			"A créé le calendrier Hyperplanning",
			"A rejoint l'Akatsuki lors de son apogée"
		],
		lore: ``
	},
	{
		name: "Zezettesou",
		realName: "Foyer Emilien",
		image: "../img/pdp/membres/Zetsu.jpg",
		bounty: 740000,
		techniques: "Mokuton, maître de l'IA, inspiration infinie, recréer la réalité grâce à ses créations",
		palmares: [
			"A leak la tête de tous les profs 2 semaines avant la rentrée",
			"S'est infiltré à 42, les concurrents",
			"Est à l'origine de quasiment toutes les refs de l'Akatsuki"
		],
		lore: ``
	}
];

// Variables globales
let currentIndex = 0;
let autoPlayInterval;

// Sélecteurs
const pdpImg = document.getElementById('pdp');
const nom = document.getElementById('nom');
const prime = document.getElementById('prime');
const counter = document.getElementById('counter');

// Afficher un membre spécifique
function showMember(index) {
	currentIndex = index;

	pdpImg.src        = membersData[index].image;
	pdpImg.alt        = membersData[index].name;
	nom.textContent   = membersData[index].name;
	prime.textContent = membersData[index].bounty;

	counter.textContent = `${index + 1} / ${membersData.length}`;
}

// Navigation
function nextMember() {
	showMember((currentIndex + 1) % membersData.length);
}

function prevMember() {
	showMember((currentIndex - 1 + membersData.length) % membersData.length);
}

// Autoplay
function startAutoPlay() {
	autoPlayInterval = setInterval(nextMember, 10000);
}

function stopAutoPlay() {
	clearInterval(autoPlayInterval);
}

function resetAutoPlay() {
	stopAutoPlay();
	startAutoPlay();
}

// Ouvrir la modal avec détails
document.getElementById('prime').addEventListener('click', () => {
    openModal(currentIndex);
});

function openModal(index) {
	const member = membersData[currentIndex];
	const modal = document.getElementById('memberModal');

	document.getElementById('modalName').textContent = member.name;
	document.getElementById('modalImage').src = member.image;
	document.getElementById('modalImage').alt = member.name;
	document.getElementById('modalRealName').textContent = member.realName;
	document.getElementById('modalTechniques').textContent = member.techniques;

	const palmaresList = document.getElementById('modalPalmares');
	palmaresList.innerHTML = '';
	member.palmares.forEach(item => {
		const li = document.createElement('li');
		li.textContent = item;
		palmaresList.appendChild(li);
	});

	const loreDiv = document.getElementById('modalLore');
	loreDiv.innerHTML = member.lore || '<p>Histoire à venir...</p>';

	modal.style.display = 'block';
	document.body.style.overflow = 'hidden';
	stopAutoPlay();
}

// Fermer la modal
function closeModal() {
	const modal = document.getElementById('memberModal');
	modal.style.display = 'none';
	document.body.style.overflow = 'auto';
	startAutoPlay();
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
	showMember(0);
	startAutoPlay();

	document.getElementById('prevBtn').addEventListener('click', () => {
		prevMember();
		resetAutoPlay();
	});

	document.getElementById('nextBtn').addEventListener('click', () => {
		nextMember();
		resetAutoPlay();
	});

	pdpImg.addEventListener('click', openModal);
	document.querySelector('.modal-close').onclick = closeModal;

	window.onclick = (event) => {
		const modal = document.getElementById('memberModal');
		if (event.target === modal) closeModal();
	};

	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape') closeModal();
		else if (e.key === 'ArrowRight') { nextMember(); resetAutoPlay(); }
		else if (e.key === 'ArrowLeft') { prevMember(); resetAutoPlay(); }
	});
});