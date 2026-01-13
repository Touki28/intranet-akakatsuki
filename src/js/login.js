// Import Firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';

// ⚠️ REMPLACE PAR TA CONFIG FIREBASE
const firebaseConfig = {
	apiKey: "AIzaSyCnLrEVz0LoAjM0zJjBB_ke1PTO95e9lzg",
	authDomain: "intranet-akakatsuki.firebaseapp.com",
	projectId: "intranet-akakatsuki",
	storageBucket: "intranet-akakatsuki.firebasestorage.app",
	messagingSenderId: "440343082436",
	appId: "1:440343082436:web:ad5624c95f1b54cc75e091",
	measurementId: "G-4ZTKMXKCMX"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// SESSION_KEY pour compatibilité
const SESSION_KEY = "intranet_auth_ok_v2";

// Vérifier l'état de connexion au chargement
onAuthStateChanged(auth, (user) => {
	const loginBtn = document.getElementById('loginBtn');
	const logoutContainer = document.getElementById('logoutContainer');

	if (user) {
		// Utilisateur connecté
		sessionStorage.setItem(SESSION_KEY, "1");
		loginBtn.style.display = 'none';
		logoutContainer.style.display = 'flex';
		console.log("✅ Utilisateur connecté:", user.email);
	} else {
		// Utilisateur déconnecté
		sessionStorage.removeItem(SESSION_KEY);
		loginBtn.style.display = 'flex';
		logoutContainer.style.display = 'none';
	}
});

// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function() {
	const modal = document.getElementById("loginModal");
	const closeSpan = document.querySelector('.close');
	const navLinks = document.querySelectorAll('.nav-card:not(.external-link)');
	const loginBtn = document.getElementById('loginBtn');
	let targetUrl = "";

	// Intercepter les clics sur les cartes
	navLinks.forEach(link => {
		link.addEventListener('click', function(event) {
			event.preventDefault();
			
			if (auth.currentUser) {
				// Connecté → naviguer
				window.location.href = this.href;
			} else {
				// Non connecté → modale
				targetUrl = this.href;
				modal.style.display = "block";
				document.getElementById("user").focus();
			}
		});
	});

	// Bouton Login en haut
	loginBtn.addEventListener('click', function() {
		modal.style.display = 'block';
		document.getElementById('user').focus();
	});

	// Fonction de connexion Firebase
	async function handleLogin() {
		const username = document.getElementById("user").value.trim();
		const password = document.getElementById("pwd").value;
		const msg = document.getElementById("msg");

		msg.textContent = "";

		// ⚠️ Empêche une erreur Firebase si username vide
		if (!username) {
			msg.textContent = "Entrez votre identifiant";
			return;
		}

		// 🔥 Crée un faux email pour Firebase
		const email = username + "@intranet.com";

		try {
			await signInWithEmailAndPassword(auth, email, password);
			console.log("✅ Connexion réussie !");

			if (targetUrl) {
				window.location.href = targetUrl;
			} else {
				modal.style.display = "none";
			}
		} catch (error) {
			console.error("❌ Erreur:", error.code);

			// 🟦 Messages d’erreur adaptés pour un login par pseudo
			const errorMessages = {
				'auth/invalid-email': 'Identifiant invalide',
				'auth/user-not-found': 'Identifiant inconnu',
				'auth/wrong-password': 'Mot de passe incorrect',
				'auth/invalid-credential': 'Identifiants incorrects',
				'auth/too-many-requests': 'Trop de tentatives, réessayez plus tard'
			};

			msg.textContent = errorMessages[error.code] || "Erreur de connexion";
		}
	}


	// Bouton submit
	document.getElementById("submit").addEventListener("click", handleLogin);

	// Entrée pour soumettre
	[document.getElementById("user"), document.getElementById("pwd")].forEach(el => {
		el.addEventListener("keydown", e => {
			if (e.key === "Enter") handleLogin();
		});
	});

	// Fermer modale
	closeSpan.addEventListener('click', () => {
		modal.style.display = "none";
		targetUrl = "";
	});

	window.addEventListener('click', (event) => {
		if (event.target === modal) {
			modal.style.display = "none";
			targetUrl = "";
		}
	});

	document.addEventListener('keydown', (e) => {
		if (e.key === "Escape" && modal.style.display === "block") {
			modal.style.display = "none";
			targetUrl = "";
		}
	});
});

// Fonction de déconnexion globale
window.logoutFromIndex = async function() {
	try {
		await signOut(auth);
		sessionStorage.removeItem(SESSION_KEY);
		window.location.reload();
	} catch (error) {
		console.error("Erreur déconnexion:", error);
	}
};