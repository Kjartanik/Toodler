const UserService = (() => {
    const store = {}; // This will act as the storage

    return {
        setItem: (key, value) => {
            store[key] = value; // Store key-value pair
        },
        getItem: (key) => {
            return store[key] || null; // Return the value or null if key doesn't exist
        },
        removeItem: (key) => {
            delete store[key]; // Delete the key from the store
        },
        clear: () => {
            for (const key in store) {
                delete store[key]; // Clear all keys
            }
        },
    };
})();

export default UserService;
