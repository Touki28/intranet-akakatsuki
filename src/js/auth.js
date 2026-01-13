import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getAuth, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';

// ⚠️ REMPLACE PAR TA CONFIG FIREBASE (la même que dans index.html)
const firebaseConfig = {
	apiKey: "AIzaSyCnLrEVz0LoAjM0zJjBB_ke1PTO95e9lzg",
	authDomain: "intranet-akakatsuki.firebaseapp.com",
	projectId: "intranet-akakatsuki",
	storageBucket: "intranet-akakatsuki.firebasestorage.app",
	messagingSenderId: "440343082436",
	appId: "1:440343082436:web:ad5624c95f1b54cc75e091",
	measurementId: "G-4ZTKMXKCMX"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const SESSION_KEY = "intranet_auth_ok_v2";

// Fonction pour vérifier l'authentification
function requireAuth() {
	onAuthStateChanged(auth, (user) => {
		if (!user) {
			// Pas connecté → rediriger vers l'index
			window.location.href = "../../index.html";
		} else {
			// Connecté → mettre à jour la session
			sessionStorage.setItem(SESSION_KEY, "1");
		}
	});
}

// Fonction de déconnexion
async function logout() {
	try {
		await signOut(auth);
		sessionStorage.removeItem(SESSION_KEY);
		window.location.href = "../../index.html";
	} catch (error) {
		console.error("Erreur déconnexion:", error);
	}
}

// Appeler requireAuth automatiquement sur les pages protégées
requireAuth();