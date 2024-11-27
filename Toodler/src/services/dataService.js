// Assuming data.json is located in the src/resources folder
import data from '../resources/data.json';

// Service function to get all boards
export const getBoards = () => {
    return data.boards;
};

// Service function to get a board by ID
export const getBoardById = (boardId) => {
    return data.boards.find(board => board.id === boardId);
};

// Service function to get all lists for a specific board
export const getListsForBoard = (boardId) => {
    return data.lists.filter(list => list.boardId === boardId);
};

// Service function to get all tasks for a specific list
export const getTasksForList = (listId) => {
    return data.tasks.filter(task => task.listId === listId);
};

export const addBoard = (newBoard) => {
    const newId = data.boards.length > 0 ? data.boards[data.boards.length - 1].id + 1 : 1;
    const board = { ...newBoard, id: newId };
    data.boards.push(board);
    return board;
};

// Service function to delete a board
export const deleteBoard = (boardId) => {
    const boardIndex = data.boards.findIndex(board => board.id === boardId);
    if (boardIndex !== -1) {
        data.boards.splice(boardIndex, 1);
        // Also delete associated lists and tasks
        data.lists = data.lists.filter(list => list.boardId !== boardId);
        data.tasks = data.tasks.filter(task => !data.lists.some(list => list.id === task.listId && list.boardId === boardId));
        return true;
    }
    return false;
};

// Service function to update a board
export const updateBoard = (boardId, updatedBoard) => {
    const boardIndex = data.boards.findIndex(board => board.id === boardId);
    if (boardIndex !== -1) {
        data.boards[boardIndex] = { ...data.boards[boardIndex], ...updatedBoard };
        return data.boards[boardIndex];
    }
    return null;
};

// Service function to add a list to a board
export const addListToBoard = (boardId, newList) => {
    const newId = data.lists.length > 0 ? data.lists[data.lists.length - 1].id + 1 : 1;
    const list = { ...newList, id: newId, boardId };
    data.lists.push(list);
    return list;
};

// Service function to delete a list from a board
export const deleteList = (listId) => {
    const listIndex = data.lists.findIndex(list => list.id === listId);
    if (listIndex !== -1) {
        data.lists.splice(listIndex, 1);
        // Delete associated tasks
        data.tasks = data.tasks.filter(task => task.listId !== listId);
        return true;
    }
    return false;
};

// Service function to update a list
export const updateList = (listId, updatedList) => {
    const listIndex = data.lists.findIndex(list => list.id === listId);
    if (listIndex !== -1) {
        data.lists[listIndex] = { ...data.lists[listIndex], ...updatedList };
        return data.lists[listIndex];
    }
    return null;
};

// Service function to add a task to a list
export const addTaskToList = (listId, newTask) => {
    const newId = data.tasks.length > 0 ? data.tasks[data.tasks.length - 1].id + 1 : 1;
    const task = { ...newTask, id: newId, listId };
    data.tasks.push(task);
    return task;
};

// Service function to delete a task
export const deleteTask = (taskId) => {
    const taskIndex = data.tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
        data.tasks.splice(taskIndex, 1);
        return true;
    }
    return false;
};

// Service function to update a task
export const updateTask = (taskId, updatedTask) => {
    const taskIndex = data.tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
        data.tasks[taskIndex] = { ...data.tasks[taskIndex], ...updatedTask };
        return data.tasks[taskIndex];
    }
    return null;
};

// Service function to move a task to another list
export const moveTaskToAnotherList = (taskId, newListId) => {
    const taskIndex = data.tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
        data.tasks[taskIndex].listId = newListId;
        return data.tasks[taskIndex];
    }
    return null;
};