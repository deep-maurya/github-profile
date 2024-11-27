const localStorageUtils = {
    
    setItem: (key, value) => {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error("Error setting item in localStorage:", error);
      }
    },
  
    getItem: (key) => {
      try {
        const storedValue = localStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : null;
      } catch (error) {
        console.error("Error getting item from localStorage:", error);
        return null;
      }
    },

    removeItem: (key) => {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.error("Error removing item from localStorage:", error);
      }
    },

    clear: () => {
      try {
        localStorage.clear();
      } catch (error) {
        console.error("Error clearing localStorage:", error);
      }
    },
  };
  
  export default localStorageUtils;
  