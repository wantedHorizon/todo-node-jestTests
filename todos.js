
const database = require('./database');
const readlineSync = require('readline-sync');




const toggleDone = (id) => {
    const todo = database.data.find(todo => todo.id === Number(id));
    if (todo) {
        todo.done = !todo.done;
    }
    return todo;
}

const deleteTodo = (id) => {
    const todo = database.data.find(todo => todo.id === Number(id));
    if (todo) {
        todo.delete = true;
    }
}

const addTodo = (task) => {
    const todo = {
        task: task,
        done: false,
        id: database.data.length + 1,
        delete: false
    }
    database.data.push(todo);
}

const list = () => {
    return database.data
        .filter(task => !task.delete)
        .sort((a, b) => {
            if (a.done)
                return 1;
            else if (b.done)
                return -1;
            else {
                return a.id - b.id;
            }

        })
        .map(todo => { return { task: todo.task, done: todo.done, id: todo.id } });
}



const displayOptions = () => {
    console.log("----------------------------------------------");

    const answers = [
        'edit task',
        'view all tasks',
        'add task'
    ]
    return readlineSync.keyInSelect(answers, "What do you want to do");
}

const displayEditOptions = () => {
    console.log("----------------------------------------------");
    const answers = [
        'toggle done',
        'delete task',
        'back',
    ]
    return readlineSync.keyInSelect(answers, "choose edit option");
}
const chooseTask = (tasks) => {
    console.log("----------------------------------------------");

    const answers = tasks.map(todo => todo.task);
    const index = readlineSync.keyInSelect(answers, "choose task to edit");

    if (tasks[index]) {
        return tasks[index];
    }
    return -1;

}


const startUI = () => {
    let done = false;
    let op1;
    let editTask;
    let editOption;
    while (!done) {
        op1 = displayOptions();
        console.log(op1);
        switch (op1) {
            case 0://edit task
                editTask = chooseTask(database.data.filter(t => !t.delete));
                if(editTask < 0){
                    done = true;
                    break;
                }
                editOption = displayEditOptions();
                if (editOption < 0 ) {
                    done = true;
                    break;
                }

                if (editOption === 0) {
                    toggleDone(editTask.id);
                } else if (editOption === 1) {
                    deleteTodo(editTask.id);
                    console.log("deleted");

                }
                break;

            case 1:// view all tasks
                console.log(list());
                break;

            case 2: // add task
                const task = readlineSync.question("enter task:\n");
                addTodo(task);

                break;
            default:
                done = true;
                break;

        }

    }
}



// startUI();


module.exports = {
    startUI,
    chooseTask,
    addTodo,
    deleteTodo,
    toggleDone,
    list,
};