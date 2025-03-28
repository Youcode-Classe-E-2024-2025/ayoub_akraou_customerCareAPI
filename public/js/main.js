// Import Axios
// import axios from "axios";

// Configuration de l'API
const API_URL = "http://localhost:8000/api"; // Remplacez par l'URL de votre API
console.log("URL de l'API configurée:", API_URL);
let authToken = localStorage.getItem("authToken");
let currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
let currentTicketId = null;

// Configuration d'Axios (utilise l'objet axios global)
const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

// Ajouter le token d'authentification à chaque requête si disponible
api.interceptors.request.use((config) => {
    if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
});

// Éléments DOM
const authSection = document.getElementById("auth-section");
const loginRegisterContainer = document?.getElementById(
    "login-register-container"
);
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const userInfo = document.getElementById("user-info");
const userName = document.getElementById("user-name");
const logoutBtn = document.getElementById("logout-btn");

const ticketsSection = document.getElementById("tickets-section");
const newTicketBtn = document.getElementById("new-ticket-btn");
const newTicketFormContainer = document?.getElementById(
    "new-ticket-form-container"
);
const newTicketForm = document.getElementById("new-ticket-form");
const cancelTicketBtn = document.getElementById("cancel-ticket-btn");
const ticketsList = document.getElementById("tickets-list");

const ticketDetailSection = document.getElementById("ticket-detail-section");
const backToTicketsBtn = document.getElementById("back-to-tickets-btn");
const claimTicketBtn = document.getElementById("claim-ticket-btn");
const resolveTicketBtn = document.getElementById("resolve-ticket-btn");
const deleteTicketBtn = document.getElementById("delete-ticket-btn");
const ticketDetailSujet = document.getElementById("ticket-detail-sujet");
const ticketDetailStatus = document.getElementById("ticket-detail-status");
const ticketDetailDate = document.getElementById("ticket-detail-date");
const ticketDetailDescription = document?.getElementById(
    "ticket-detail-description"
);
const responsesList = document.getElementById("responses-list");
const addResponseForm = document.getElementById("add-response-form");

const notification = document.getElementById("notification");
const notificationIcon = document.getElementById("notification-icon");
const notificationMessage = document.getElementById("notification-message");
const closeNotification = document.getElementById("close-notification");

// Fonctions d'initialisation
function init() {
    console.log("Initialisation de l'application...");

    // Vérifier si l'utilisateur est connecté
    if (authToken && currentUser) {
        showAuthenticatedUI();
        loadTickets();
    } else {
        showUnauthenticatedUI();
    }

    // Ajouter les écouteurs d'événements
    setupEventListeners();
}

// Assurez-vous que les écouteurs d'événements sont correctement configurés
function setupEventListeners() {
    // Formulaires d'authentification
    if (loginForm) {
        console.log(
            "Attachement de l'écouteur d'événements au formulaire de connexion"
        );
        loginForm?.addEventListener("submit", (e) => {
            console.log("Formulaire de connexion soumis");
            handleLogin(e);
        });
    } else {
        console.error("Formulaire de connexion non trouvé!");
    }

    if (registerForm) {
        registerForm?.addEventListener("submit", (e) => {
            console.log("Formulaire d'inscription soumis");
            handleRegister(e);
        });
    } else {
        console.error("Formulaire d'inscription non trouvé!");
    }

    if (logoutBtn) {
        logoutBtn?.addEventListener("click", handleLogout);
    }

    // Ticket events
    if (newTicketBtn) {
        newTicketBtn?.addEventListener("click", () => {
            newTicketFormContainer?.classList.remove("hidden");
        });
    }

    if (cancelTicketBtn) {
        cancelTicketBtn?.addEventListener("click", () => {
            newTicketFormContainer?.classList.add("hidden");
            newTicketForm.reset();
        });
    }

    if (newTicketForm) {
        newTicketForm?.addEventListener("submit", handleCreateTicket);
    }

    if (backToTicketsBtn) {
        backToTicketsBtn?.addEventListener("click", () => {
            ticketDetailSection?.classList.add("hidden");
            ticketsSection?.classList.remove("hidden");
            loadTickets(); // Recharger les tickets pour voir les mises à jour
        });
    }

    if (claimTicketBtn) {
        claimTicketBtn?.addEventListener("click", handleClaimTicket);
    }

    if (resolveTicketBtn) {
        resolveTicketBtn?.addEventListener("click", handleResolveTicket);
    }

    if (deleteTicketBtn) {
        deleteTicketBtn?.addEventListener("click", handleDeleteTicket);
    }

    if (addResponseForm) {
        addResponseForm?.addEventListener("submit", handleAddResponse);
    }

    // Notification
    if (closeNotification) {
        closeNotification?.addEventListener("click", () => {
            notification?.classList.add("hidden");
        });
    }
}

// Fonctions d'UI
function showAuthenticatedUI() {
    if (loginForm) {
        loginForm?.classList.add("hidden");
    }
    if (registerForm) {
        registerForm?.classList.add("hidden");
    }
    if (userInfo) {
        userInfo?.classList.remove("hidden");
    }
    if (userName) {
        userName.textContent = currentUser.name;
    }
    if (ticketsSection) {
        ticketsSection?.classList.remove("hidden");
    }
}

function showUnauthenticatedUI() {
    if (loginForm) {
        loginForm?.classList.remove("hidden");
    }
    if (registerForm) {
        registerForm?.classList.add("hidden");
    }
    if (userInfo) {
        userInfo?.classList.add("hidden");
    }
    if (ticketsSection) {
        ticketsSection?.classList.add("hidden");
    }
    if (ticketDetailSection) {
        ticketDetailSection?.classList.add("hidden");
    }
}

function showNotification(message, type = "success") {
    notificationMessage.textContent = message;

    // Définir l'icône en fonction du type
    if (type === "success") {
        notificationIcon.innerHTML = `
      <svg class="h-6 w-6 text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
    `;
        notification?.classList.add("bg-green-50");
        notification?.classList.remove("bg-red-50");
    } else {
        notificationIcon.innerHTML = `
      <svg class="h-6 w-6 text-red-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    `;
        notification?.classList.add("bg-red-50");
        notification?.classList.remove("bg-green-50");
    }

    notification?.classList.remove("hidden");

    // Masquer la notification après 3 secondes
    setTimeout(() => {
        notification?.classList.add("hidden");
    }, 3000);
}

// Fonctions de gestion des événements
async function handleLogin(e) {
    e.preventDefault();

    const email = document.getElementById("login-email")?.value;
    const password = document.getElementById("login-password")?.value;

    console.log("Tentative de connexion avec:", { email, password: "***" });

    try {
        // Vérifier que l'URL est correcte selon la documentation de l'API
        console.log("Envoi de la requête à:", API_URL + "/login");
        const response = await api.post("/login", { email, password });
        console.log("Réponse de connexion:", response.data);

        authToken = response.data.token;
        currentUser = response.data.user || { name: email.split("@")[0] }; // Fallback si l'API ne renvoie pas l'utilisateur

        // Sauvegarder dans le localStorage
        localStorage.setItem("authToken", authToken);
        localStorage.setItem("currentUser", JSON.stringify(currentUser));

        showNotification("Connexion réussie");
        showAuthenticatedUI();
        loadTickets();
    } catch (error) {
        console.error("Erreur de connexion:", error);

        // Afficher plus de détails sur l'erreur
        if (error.response) {
            console.error("Détails de l'erreur:", error.response.data);
            showNotification(
                `Échec de la connexion: ${
                    error.response.data.message || "Vérifiez vos identifiants"
                }`,
                "error"
            );
        } else if (error.request) {
            console.error("Pas de réponse du serveur:", error.request);
            showNotification(
                "Échec de la connexion: Pas de réponse du serveur",
                "error"
            );
        } else {
            console.error("Erreur de configuration:", error.message);
            showNotification(
                `Échec de la connexion: ${error.message}`,
                "error"
            );
        }
    }
}

// Vérifier si le formulaire d'inscription est correctement soumis
async function handleRegister(e) {
    e.preventDefault();

    const name = document.getElementById("register-name")?.value;
    const email = document.getElementById("register-email")?.value;
    const password = document.getElementById("register-password")?.value;

    console.log("Tentative d'inscription avec:", { name, email, password });

    try {
        // Assurez-vous que l'URL est correcte selon la documentation de l'API
        const response = await api.post("/register", { name, email, password });
        console.log("Réponse d'inscription:", response.data);

        authToken = response.data.token;
        currentUser = response.data.user || { name };

        // Sauvegarder dans le localStorage
        localStorage.setItem("authToken", authToken);
        localStorage.setItem("currentUser", JSON.stringify(currentUser));

        showNotification("Inscription réussie");
        showAuthenticatedUI();
        loadTickets();
    } catch (error) {
        console.error("Erreur d'inscription:", error);
        // Afficher plus de détails sur l'erreur
        if (error.response) {
            console.error("Détails de l'erreur:", error.response.data);
            showNotification(
                `Échec de l'inscription: ${
                    error.response.data.message || "Erreur serveur"
                }`,
                "error"
            );
        } else {
            showNotification(
                "Échec de l'inscription. Veuillez réessayer.",
                "error"
            );
        }
    }
}

async function handleLogout() {
    try {
        await api.post("/logout");
    } catch (error) {
        console.error("Erreur de déconnexion:", error);
    } finally {
        // Même en cas d'erreur, on déconnecte l'utilisateur localement
        authToken = null;
        currentUser = null;
        localStorage.removeItem("authToken");
        localStorage.removeItem("currentUser");

        showNotification("Déconnexion réussie");
        showUnauthenticatedUI();
    }
}

async function handleCreateTicket(e) {
    e.preventDefault();

    const subject = document.getElementById("ticket-sujet")?.value;
    const description = document.getElementById("ticket-description")?.value;

    try {
        await api.post("/tickets", { subject, description });

        showNotification("Ticket créé avec succès");
        newTicketFormContainer?.classList.add("hidden");
        newTicketForm.reset();
        loadTickets();
    } catch (error) {
        console.error("Erreur de création de ticket:", error);
        showNotification("Échec de la création du ticket", "error");
    }
}

async function handleClaimTicket() {
    if (!currentTicketId) return;

    try {
        await api.post(`/tickets/${currentTicketId}/claim`);
        showNotification("Ticket réclamé avec succès");
        loadTicketDetail(currentTicketId);
    } catch (error) {
        console.error("Erreur de réclamation de ticket:", error);
        showNotification("Échec de la réclamation du ticket", "error");
    }
}

async function handleResolveTicket() {
    if (!currentTicketId) return;

    try {
        await api.patch(`/tickets/${currentTicketId}/resolve`);
        showNotification("Ticket résolu avec succès");
        loadTicketDetail(currentTicketId);
    } catch (error) {
        console.error("Erreur de résolution de ticket:", error);
        showNotification("Échec de la résolution du ticket", "error");
    }
}

async function handleDeleteTicket() {
    if (!currentTicketId) return;

    if (!confirm("Êtes-vous sûr de vouloir supprimer ce ticket ?")) return;

    try {
        await api.delete(`/tickets/${currentTicketId}`);
        showNotification("Ticket supprimé avec succès");
        ticketDetailSection?.classList.add("hidden");
        ticketsSection?.classList.remove("hidden");
        loadTickets();
    } catch (error) {
        console.error("Erreur de suppression de ticket:", error);
        showNotification("Échec de la suppression du ticket", "error");
    }
}

async function handleAddResponse(e) {
    e.preventDefault();

    if (!currentTicketId) return;

    const content = document.getElementById("response-content")?.value;

    try {
        await api.post(`/tickets/${currentTicketId}/responses`, { content });
        showNotification("Réponse ajoutée avec succès");
        document.getElementById("response-content").value = "";
        loadResponses(currentTicketId);
    } catch (error) {
        console.error("Erreur d'ajout de réponse:", error);
        showNotification("Échec de l'ajout de la réponse", "error");
    }
}

// Fonctions de chargement des données
async function loadTickets() {
    ticketsList.innerHTML = `
    <li class="px-6 py-4 flex items-center justify-between">
      <div class="animate-pulse flex space-x-4 w-full">
        <div class="flex-1 space-y-2 py-1">
          <div class="h-4 bg-gray-200 rounded w-3/4"></div>
          <div class="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    </li>
  `;

    try {
        const response = await api.get("/tickets");
        const tickets = response.data;

        if (tickets.length === 0) {
            ticketsList.innerHTML = `
        <li class="px-6 py-4 text-center text-gray-500">
          Aucun ticket trouvé. Créez-en un nouveau !
        </li>
      `;
            return;
        }

        ticketsList.innerHTML = "";

        tickets.forEach((ticket) => {
            console.log(ticket);
            const statusClass = getStatusClass(ticket.status);
            const li = document.createElement("li");
            li.className = "px-6 py-4 hover:bg-gray-50 cursor-pointer";
            li.innerHTML = `
        <div>
          <div class="flex justify-between">
            <h3 class="text-lg font-medium text-gray-900">${ticket.subject}</h3>
            <span class="${statusClass} px-2 py-1 rounded text-xs font-medium">${
                ticket.status
            }</span>
          </div>
          <p class="text-sm text-gray-500 mt-1">${formatDate(
              ticket.created_at
          )}</p>
        </div>
      `;

            li?.addEventListener("click", () => loadTicketDetail(ticket.id));
            ticketsList.appendChild(li);
        });
    } catch (error) {
        console.error("Erreur de chargement des tickets:", error);
        ticketsList.innerHTML = `
      <li class="px-6 py-4 text-center text-red-500">
        Erreur de chargement des tickets. Veuillez réessayer.
      </li>
    `;
    }
}

async function loadTicketDetail(ticketId) {
    currentTicketId = ticketId;
    ticketsSection?.classList.add("hidden");
    ticketDetailSection?.classList.remove("hidden");

    // Réinitialiser les détails du ticket
    ticketDetailSujet.textContent = "Chargement...";
    ticketDetailStatus.textContent = "Status";
    ticketDetailDate.textContent = "--/--/----";
    ticketDetailDescription.textContent = "Chargement...";

    try {
        const response = await api.get(`/tickets/${ticketId}`);
        const ticket = response.data;

        ticketDetailSujet.textContent = ticket.sujet;

        const statusClass = getStatusClass(ticket.status);
        ticketDetailStatus.className = `${statusClass} px-2 py-1 rounded text-xs font-medium mr-2`;
        ticketDetailStatus.textContent = ticket.status;

        ticketDetailDate.textContent = formatDate(ticket.created_at);
        ticketDetailDescription.textContent = ticket.description;

        // Gérer l'affichage des boutons en fonction du statut
        if (ticket.status === "résolu") {
            resolveTicketBtn?.classList.add("hidden");
            claimTicketBtn?.classList.add("hidden");
        } else if (ticket.agent_id) {
            claimTicketBtn?.classList.add("hidden");
            resolveTicketBtn?.classList.remove("hidden");
        } else {
            claimTicketBtn?.classList.remove("hidden");
            resolveTicketBtn?.classList.add("hidden");
        }

        loadResponses(ticketId);
    } catch (error) {
        console.error("Erreur de chargement des détails du ticket:", error);
        showNotification("Échec du chargement des détails du ticket", "error");
    }
}

async function loadResponses(ticketId) {
    responsesList.innerHTML = `
    <li class="animate-pulse">
      <div class="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
      <div class="h-4 bg-gray-200 rounded w-full"></div>
      <div class="h-4 bg-gray-200 rounded w-full mt-1"></div>
    </li>
  `;

    try {
        const response = await api.get(`/tickets/${ticketId}/responses`);
        const responses = response.data;

        if (responses.length === 0) {
            responsesList.innerHTML = `
        <li class="text-center text-gray-500 py-4">
          Aucune réponse pour ce ticket.
        </li>
      `;
            return;
        }

        responsesList.innerHTML = "";

        responses.forEach((response) => {
            const li = document.createElement("li");
            li.className =
                "border-b border-gray-200 pb-4 mb-4 last:border-0 last:mb-0 last:pb-0";
            li.innerHTML = `
        <div class="flex justify-between items-center mb-2">
          <span class="font-medium">${
              response.user_name || "Utilisateur"
          }</span>
          <span class="text-sm text-gray-500">${formatDate(
              response.created_at
          )}</span>
        </div>
        <p class="text-gray-700">${response.content}</p>
      `;
            responsesList.appendChild(li);
        });
    } catch (error) {
        console.error("Erreur de chargement des réponses:", error);
        responsesList.innerHTML = `
      <li class="text-center text-red-500 py-4">
        Erreur de chargement des réponses. Veuillez réessayer.
      </li>
    `;
    }
}

// Fonctions utilitaires
function getStatusClass(status) {
    switch (status) {
        case "ouvert":
            return "bg-blue-100 text-blue-800";
        case "en cours":
            return "bg-yellow-100 text-yellow-800";
        case "résolu":
            return "bg-green-100 text-green-800";
        default:
            return "bg-gray-100 text-gray-800";
    }
}

function formatDate(dateString) {
    if (!dateString) return "Date inconnue";

    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

// Initialiser l'application
document?.addEventListener("DOMContentLoaded", init);
console.log("Initialisation de l'application");