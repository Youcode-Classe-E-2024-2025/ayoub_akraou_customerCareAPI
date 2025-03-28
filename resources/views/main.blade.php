<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Système de Support Client</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
</head>

<body class="bg-gray-100 min-h-screen">
    <div class="container mx-auto px-4 py-8">
        <!-- Auth Section -->
        <div id="auth-section" class="mb-8">
            @auth
            <div id="login-register-container" class="bg-white rounded-lg shadow p-6">
                <div class="flex justify-between mb-6">
                    <button type="button" id="show-login-btn"
                        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none">Connexion</button>
                    <button type="button" id="show-register-btn"
                        class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none">Inscription</button>
                </div>

                <!-- Login Form -->
                <form id="login-form" class="space-y-4">
                    <h2 class="text-xl font-bold">Connexion</h2>
                    <div>
                        <label for="login-email" class="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" id="login-email"
                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                    </div>
                    <div>
                        <label for="login-password" class="block text-sm font-medium text-gray-700">Mot de passe</label>
                        <input type="password" id="login-password"
                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                    </div>
                    <button type="submit"
                        class="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none">Se
                        connecter</button>
                </form>

                <!-- Register Form -->
                <form id="register-form" class="space-y-4 hidden">
                    <h2 class="text-xl font-bold">Inscription</h2>
                    <div>
                        <label for="register-name" class="block text-sm font-medium text-gray-700">Nom</label>
                        <input type="text" id="register-name"
                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            required>
                    </div>
                    <div>
                        <label for="register-email" class="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" id="register-email"
                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            required>
                    </div>
                    <div>
                        <label for="register-password" class="block text-sm font-medium text-gray-700">Mot de
                            passe</label>
                        <input type="password" id="register-password"
                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            required minlength="8">
                    </div>
                    <button type="submit"
                        class="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none">S'inscrire</button>
                </form>

                <!-- User Info -->
                <div id="user-info" class="hidden">
                    <div class="flex justify-between items-center">
                        <p>Connecté en tant que: <span id="user-name" class="font-bold"></span></p>
                        <button id="logout-btn"
                            class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none">Déconnexion</button>
                    </div>
                </div>
            </div>
            @endauth
        </div>

        <!-- Tickets Section -->
        <div id="tickets-section" class="hidden">
            <div class="flex justify-between items-center mb-6">
                <h1 class="text-2xl font-bold">Tickets de Support</h1>
                <button id="new-ticket-btn"
                    class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none">Nouveau
                    Ticket</button>
            </div>

            <!-- New Ticket Form -->
            <div id="new-ticket-form-container" class="bg-white rounded-lg shadow p-6 mb-6 hidden">
                <h2 class="text-xl font-bold mb-4">Créer un nouveau ticket</h2>
                <form id="new-ticket-form" class="space-y-4">
                    <div>
                        <label for="ticket-sujet" class="block text-sm font-medium text-gray-700">Sujet</label>
                        <input type="text" id="ticket-sujet" name="subject"
                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                    </div>
                    <div>
                        <label for="ticket-description"
                            class="block text-sm font-medium text-gray-700">Description</label>
                        <textarea id="ticket-description" rows="4" name="description"
                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"></textarea>
                    </div>
                    <div class="flex justify-end space-x-2">
                        <button type="button" id="cancel-ticket-btn"
                            class="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 focus:outline-none">Annuler</button>
                        <button type="submit"
                            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none">Soumettre</button>
                    </div>
                </form>
            </div>

            <!-- Tickets List -->
            <div class="bg-white rounded-lg shadow overflow-hidden">
                <div class="px-6 py-4 border-b border-gray-200">
                    <h2 class="text-lg font-medium">Mes tickets</h2>
                </div>
                <ul id="tickets-list" class="divide-y divide-gray-200">
                    <!-- Tickets will be added here dynamically -->
                    <li class="px-6 py-4 flex items-center justify-between">
                        <div class="animate-pulse flex space-x-4 w-full">
                            <div class="flex-1 space-y-2 py-1">
                                <div class="h-4 bg-gray-200 rounded w-3/4"></div>
                                <div class="h-4 bg-gray-200 rounded w-1/2"></div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        <!-- Ticket Detail Section -->
        <div id="ticket-detail-section" class="hidden">
            <div class="flex justify-between items-center mb-6">
                <button id="back-to-tickets-btn"
                    class="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 focus:outline-none flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20"
                        fill="currentColor">
                        <path fill-rule="evenodd"
                            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                            clip-rule="evenodd" />
                    </svg>
                    Retour
                </button>
                <div class="space-x-2">
                    <button id="claim-ticket-btn"
                        class="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 focus:outline-none">Réclamer</button>
                    <button id="resolve-ticket-btn"
                        class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none">Résoudre</button>
                    <button id="delete-ticket-btn"
                        class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none">Supprimer</button>
                </div>
            </div>

            <!-- Ticket Info -->
            <div class="bg-white rounded-lg shadow p-6 mb-6">
                <h1 id="ticket-detail-sujet" class="text-2xl font-bold mb-2">Chargement...</h1>
                <div class="flex items-center text-sm text-gray-500 mb-4">
                    <span id="ticket-detail-status" class="px-2 py-1 rounded text-xs font-medium mr-2">Status</span>
                    <span>Créé le <span id="ticket-detail-date">--/--/----</span></span>
                </div>
                <p id="ticket-detail-description" class="text-gray-700 mb-4">Chargement...</p>
            </div>

            <!-- Responses -->
            <div class="bg-white rounded-lg shadow p-6 mb-6">
                <h2 class="text-xl font-bold mb-4">Réponses</h2>
                <ul id="responses-list" class="space-y-4">
                    <!-- Responses will be added here dynamically -->
                    <li class="animate-pulse">
                        <div class="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                        <div class="h-4 bg-gray-200 rounded w-full"></div>
                        <div class="h-4 bg-gray-200 rounded w-full mt-1"></div>
                    </li>
                </ul>
            </div>

            <!-- Add Response -->
            <div class="bg-white rounded-lg shadow p-6">
                <h2 class="text-xl font-bold mb-4">Ajouter une réponse</h2>
                <form id="add-response-form" class="space-y-4">
                    <div>
                        <label for="response-content" class="block text-sm font-medium text-gray-700">Votre
                            réponse</label>
                        <textarea id="response-content" rows="4"
                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"></textarea>
                    </div>
                    <button type="submit"
                        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none">Envoyer</button>
                </form>
            </div>
        </div>

        <!-- Notifications -->
        <div id="notification"
            class="fixed top-4 right-4 max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto hidden overflow-hidden">
            <div class="p-4">
                <div class="flex items-start">
                    <div id="notification-icon" class="flex-shrink-0">
                        <!-- Icon will be added dynamically -->
                    </div>
                    <div class="ml-3 w-0 flex-1">
                        <p id="notification-message" class="text-sm font-medium text-gray-900"></p>
                    </div>
                    <div class="ml-4 flex-shrink-0 flex">
                        <button id="close-notification"
                            class="inline-flex text-gray-400 hover:text-gray-500 focus:outline-none">
                            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                fill="currentColor">
                                <path fill-rule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clip-rule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Script pour la bascule entre les formulaires -->
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            // Gestion de la bascule entre les formulaires
            document.getElementById('show-login-btn').addEventListener('click', function() {
                document.getElementById('login-form').classList.remove('hidden');
                document.getElementById('register-form').classList.add('hidden');
            });

            document.getElementById('show-register-btn').addEventListener('click', function() {
                document.getElementById('register-form').classList.remove('hidden');
                document.getElementById('login-form').classList.add('hidden');
            });
        });
    </script>
    <script type="module">
        import axios from 'https://cdn.jsdelivr.net/npm/axios@1.6.7/dist/esm/axios.min.js';
    </script>
    <script type="module" src="{{ asset('js/main.js') }}"></script>
</body>

</html>
