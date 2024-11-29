const UserService = (() => {
    const store = {
        1: { // dummy user to be able to sign in without making new user
            username: 'admin',
            password: 'admin',
        },
    };
    //the key for next user, start at 2 because admin is 1
    let userId = 2;

    let currentUser = null; // Store the currently logged-in user

    return {
        setItem: (value) => {
            store[userId] = value;
            userId++; // Increment user ID for the next user
        },

        getItem: (key) => {
            return store[key] || null; // Return user or null if not found
        },

        getAllUsers: () => {
            return store; // Return all stored users
        },

        clear: () => {
            for (const key in store) {
                delete store[key]; // Clear all users
            }
        },

        // New methods for handling current user
        setCurrentUser: (user) => {
            currentUser = user;
        },

        getCurrentUser: () => {
            return currentUser; // Get the current logged-in user
        },

        removeCurrentUser: () => {
            currentUser = null; // Clear the current user on logout
        },
    };
})();

export default UserService;
