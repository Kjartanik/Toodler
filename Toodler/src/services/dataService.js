// Assuming data.json is located in the src/resources folder
import data from '../resources/data.json';

let nextBoardId = data.boards.length > 0
    ? Math.max(...data.boards.map((board) => board.id)) + 1
    : 1; 


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

export const getListById = (listId) => {
    return data.lists.find(list => list.id === listId);
}

export const addBoard = (newBoard) => {
    const isDuplicate = data.boards.some((board) => board.id === newBoard.id);
    if (isDuplicate) {
        console.warn('Board already exists:', newBoard.id); // Log warning
        return null;
    }

    const board = { ...newBoard, id: nextBoardId };
    nextBoardId += 1;
    data.boards.push(board);
    console.log('dataservice portion entered')
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

// Update a task by ID with updated fields
export const updateTask = (taskId, updatedFields) => {
    const taskIndex = data.tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
        data.tasks[taskIndex] = { ...data.tasks[taskIndex], ...updatedFields }; // Merge updated fields
        return data.tasks[taskIndex];
    }
    return null; // Return null if task not found
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

// Calculate the proportion of finished tasks of a list
export const calculateProgress = (listId) => {
    tasks = getTasksForList(listId);
    totalTasks = tasks.length;
    if (totalTasks === 0) {
        return 0;
    }
    completedTasks = tasks.filter(task => task.isFinished).length;
    percent = (completedTasks / totalTasks);
    return percent;
}
