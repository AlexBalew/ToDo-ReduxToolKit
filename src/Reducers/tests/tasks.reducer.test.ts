import {v1} from "uuid";
import {
    addTaskTC,
    changeTaskStatusAC, deleteTaskTC,
    getTasksTC,
    onChangeTaskTitleAC,
    TasksStateType
} from "../tasks.reducer";
import {addTDlAC, removeTDlAC, setTodolistsAC} from "../todolist-reducer";
import {TaskPriorities, TaskStatuses} from "../../api/Todolists.api";
import {tasksReducer} from "../reducer/all-reducer";

let todolistID1 = v1()
let todolistID2 = v1()
let todolistID3 = v1()
let todolistID4 = v1()
let todolistID5 = v1()
let taskID1 = v1()
let startState: TasksStateType = {}

beforeEach(() => {
    startState = {
        [todolistID1]: [
            {
                id: taskID1, title: 'sleep', status: TaskStatuses.New,
                addedDate: '01-01-2021', deadline: '', description: 'daily routine', startDate: '', order: 0,
                priority: TaskPriorities.Hi, todoListId: 'TD1'
            },
            {
                id: v1(), title: 'drink', status: TaskStatuses.New,
                addedDate: '01-01-2021', deadline: '', description: 'daily routine', startDate: '', order: 0,
                priority: TaskPriorities.Hi, todoListId: 'TD1'
            },
            {
                id: v1(), title: 'rave', status: TaskStatuses.New,
                addedDate: '01-01-2021', deadline: '', description: 'daily routine', startDate: '', order: 0,
                priority: TaskPriorities.Hi, todoListId: 'TD1'
            },
            {
                id: v1(), title: 'repeat', status: TaskStatuses.Completed,
                addedDate: '01-01-2021', deadline: '', description: 'daily routine', startDate: '', order: 0,
                priority: TaskPriorities.Hi, todoListId: 'TD1'
            },
        ],
        [todolistID2]: [
            {
                id: v1(), title: 'Metallica', status: TaskStatuses.Completed,
                addedDate: '01-01-2021', deadline: '', description: 'daily routine', startDate: '', order: 0,
                priority: TaskPriorities.Hi, todoListId: 'TD1'
            },
            {
                id: v1(), title: 'Neuro', status: TaskStatuses.New,
                addedDate: '01-01-2021', deadline: '', description: 'daily routine', startDate: '', order: 0,
                priority: TaskPriorities.Hi, todoListId: 'TD1'
            },
            {
                id: v1(), title: 'Ghost', status: TaskStatuses.New,
                addedDate: '01-01-2021', deadline: '', description: 'daily routine', startDate: '', order: 0,
                priority: TaskPriorities.Hi, todoListId: 'TD1'
            },
            {
                id: v1(), title: 'Liquid', status: TaskStatuses.Completed,
                addedDate: '01-01-2021', deadline: '', description: 'daily routine', startDate: '', order: 0,
                priority: TaskPriorities.Hi, todoListId: 'TD1'
            },
        ],
        [todolistID3]: [
            {
                id: v1(), title: 'Seven', status: TaskStatuses.Completed,
                addedDate: '01-01-2021', deadline: '', description: 'daily routine', startDate: '', order: 0,
                priority: TaskPriorities.Hi, todoListId: 'TD1'
            },
            {
                id: taskID1, title: 'Night', status: TaskStatuses.New,
                addedDate: '01-01-2021', deadline: '', description: 'daily routine', startDate: '', order: 0,
                priority: TaskPriorities.Hi, todoListId: 'TD1'
            },
            {
                id: v1(), title: 'Family Guy', status: TaskStatuses.New,
                addedDate: '01-01-2021', deadline: '', description: 'daily routine', startDate: '', order: 0,
                priority: TaskPriorities.Hi, todoListId: 'TD1'
            },
            {
                id: v1(), title: 'South Park', status: TaskStatuses.Completed,
                addedDate: '01-01-2021', deadline: '', description: 'daily routine', startDate: '', order: 0,
                priority: TaskPriorities.Hi, todoListId: 'TD1'
            }
        ],
        [todolistID4]: [
            {
                id: v1(), title: 'Train UseStyles', status: TaskStatuses.New,
                addedDate: '01-01-2021', deadline: '', description: 'daily routine', startDate: '', order: 0,
                priority: TaskPriorities.Hi, todoListId: 'TD1'
            },
            {
                id: v1(), title: 'Set up a background', status: TaskStatuses.New,
                addedDate: '01-01-2021', deadline: '', description: 'daily routine', startDate: '', order: 0,
                priority: TaskPriorities.Hi, todoListId: 'TD1'
            },
            {
                id: v1(), title: 'Create own style', status: TaskStatuses.New,
                addedDate: '01-01-2021', deadline: '', description: 'daily routine', startDate: '', order: 0,
                priority: TaskPriorities.Hi, todoListId: 'TD1'
            },
            {
                id: v1(), title: 'Push it to GitHub', status: TaskStatuses.New,
                addedDate: '01-01-2021', deadline: '', description: 'daily routine', startDate: '', order: 0,
                priority: TaskPriorities.Hi, todoListId: 'TD1'
            }
        ],
        [todolistID5]: []
    }
})

test('exact task should be removed from exact array', () => {

    const finalState = tasksReducer(startState, deleteTaskTC.fulfilled(
        {todolistId: todolistID1, taskId: taskID1},
        '',
        {todolistID: todolistID1, taskId: taskID1})
    )

    expect(finalState[todolistID1].length).toBe(3)
    expect(finalState[todolistID3].length).toBe(4)
    expect(finalState[todolistID2].length).toBe(4)
    expect(finalState[todolistID4].length).toBe(4)

})

test('new task should be added to exact array', () => {

    const task = {
        todoListId: todolistID2,
        title: 'Дайте танк!',
        status: TaskStatuses.New,
        addedDate: '',
        deadline: '',
        description: '',
        order: 0,
        priority: 0,
        startDate: '',
        id: '234467'
    }

    const action = addTaskTC.fulfilled({task}, 'requestId', {title: task.title, todolistID: task.todoListId})

    const finalState = tasksReducer(startState, action)

    expect(finalState[todolistID2].length).toBe(5)
    expect(finalState[todolistID2][0].title).toBe('Дайте танк!')
    expect(finalState[todolistID2][2].title).toBe('Neuro')
    expect(finalState[todolistID4].length).toBe(4)
    expect(finalState[todolistID2][4].title).toBe('Liquid')
})

test('task title should be changed in exact array', () => {

    const finalState = tasksReducer(startState, onChangeTaskTitleAC({
        todolistId: todolistID3,
        taskId: taskID1,
        title: 'It'
    }))

    expect(finalState[todolistID3][1].title).toBe('It')
    expect(finalState[todolistID3][2].title).toBe('Family Guy')
})

test('task status should be changed in exact array', () => {

    let newTaskID = v1()

    const finalState = tasksReducer(startState, changeTaskStatusAC({
        todolistID: todolistID3,
        taskID: newTaskID,
        status: TaskStatuses.Completed
    }))

    expect(finalState[todolistID3][1].status).toBe(TaskStatuses.New)
    expect(finalState[todolistID3][2].status).toBe(TaskStatuses.New)
    expect(finalState[todolistID3][0].status).toBe(TaskStatuses.Completed)
    expect(finalState[todolistID3][3].status).toBe(TaskStatuses.Completed)
})

test('new array should be added when new todolist is added', () => {

    const action = addTDlAC({todoList: {id: '1', title: 'New affairs', addedDate: '', order: 0}});

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != todolistID1 &&
        k != todolistID2 && k != todolistID3 && k != todolistID4);
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(6);
    expect(endState[newKey]).toEqual([]);
});

test('property with todolistId should be deleted', () => {

    const action = removeTDlAC({id: todolistID3});

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(4);
    expect(endState[todolistID3]).not.toBeDefined();
});

test('new empty arrays of tasks should be added when todolists were set', () => {

    const action = setTodolistsAC({
        todolists: [
            {id: '1', title: '111', order: 0, addedDate: ''},
            {id: '2', title: '222', order: 0, addedDate: ''},
        ]
    })

    const endState = tasksReducer({}, action)

    const keys = Object.keys(endState);

    expect(keys.length).toBe(2);
    expect(endState['1']).toStrictEqual([]);
    expect(endState['2']).toStrictEqual([]);
});

test('new arrays of tasks should be added to state when todolists were set', () => {

    const action = getTasksTC.fulfilled({
        todolistID: todolistID5, tasks: [
            {
                id: '23',
                title: '11122',
                order: 0,
                addedDate: '',
                description: '',
                status: 0,
                priority: 0,
                startDate: '',
                deadline: '',
                todoListId: todolistID3
            },
            {
                id: '32',
                title: '11133',
                order: 0,
                addedDate: '',
                description: '',
                status: 0,
                priority: 0,
                startDate: '',
                deadline: '',
                todoListId: todolistID3
            },
        ]
    }, '', todolistID5)

    const endState = tasksReducer({[todolistID5]: []}, action)

    expect(endState[todolistID5].length).toBe(2);
    expect(endState[todolistID5][0].id).toBe('23');
    expect(endState[todolistID5][1].title).toBe('11133');
});