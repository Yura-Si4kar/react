const STORAGE_KEY = 'alarm';

export const getItemsFromLocalStorage = () => {
    const items = localStorage.getItem(STORAGE_KEY);
    return items ? JSON.parse(items) : [];
};

const saveData = (data) => {
    return localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export function saveItemsToLocalStorage(item) {
    const data = getItemsFromLocalStorage()
    const updatedList = [...data, item];
  
    saveData(updatedList);
}

export const updateItemsInLocalStorage = (id, updatedOrder) => {
    const data = getItemsFromLocalStorage(STORAGE_KEY);

    saveData(data.map((el) => (el.id !== +id ? el : updatedOrder)));
};

export const deleteItemsFromLocalStorage = (id) => {
    const data = getItemsFromLocalStorage(STORAGE_KEY);
    
    saveData(data.filter((el) => el.id !== id));
};