const todos = require('./todos');
const database = require('./database');


describe('todos', () => {

    beforeEach(() => {
        database.data = [{
            task: 'task1',
            done: false,
            id: 1,
            delete: false
        },
        {
            task: 'task2',
            done: false,
            id: 2,
            delete: false
        }, {
            task: 'task3',
            done: false,
            id: 3,
            delete: false
        }, {
            task: 'task4',
            done: true,
            id: 4,
            delete: false
        }, {
            task: 'task5',
            done: true,
            id: 5,
            delete: false
        }, {
            task: 'task6',
            done: false,
            id: 6,
            delete: false
        }, {
            task: 'task7',
            done: false,
            id: 7,
            delete: false
        }
    ];
    })
    describe('toggleDone', () => {
        it('should toggle the done prop of object todo', () => {
            //before
            expect(database.data.find(t => t.id === 1).done).toEqual(false);

            //toggle to true
            todos.toggleDone(1);
            expect(database.data.find(t => t.id === 1).done).toEqual(true);
            //toggle to false
            todos.toggleDone(1);
            expect(database.data.find(t => t.id === 1).done).toEqual(false);


        });
    });


    describe('addTodo', () => {
        it('should add new todo to database', () => {
            //Arrange
            const task = "new Task @test";
            //Act
            todos.addTodo(task);

            //Assert
            const result = database.data.filter(t => t.task === task);
            expect(result.length).toEqual(1);
            expect(result[0].task).toEqual(task);


        });
    });


    describe('deleteTodo', () => {
        it('should delete todo item', () => {

            const task = "new Task @test2";
            todos.addTodo(task);
            const result = database.data.filter(t => t.task === task);
            const todo = result[0];


            todos.deleteTodo(todo.id);

            expect(todo.delete).toEqual(true);



        });

        it('should delete all todos', () => {

            database.data.forEach(todo => {
                todos.deleteTodo(todo.id);
            });



            database.data.forEach(todo => {
                expect(todo.delete).toEqual(true);
            });


        });


    });

    describe('list', () => {
        it('should return all non deleted strings', () => {
            //Arrange
            const task = {
                task: 'task1',
                done: false,
                id: 1,
                delete: false
            }
            const task2 = Object.assign({},task);
            task2.delete =true;
            database.data = [ 
                task,
                task2
            ]

            //Act
            const result = todos.list();

            //Assert
            expect(result).toEqual([{task:task.task, id:task.id, done:task.done}]);
        });


        it('should return [] of non deleted ', () => {
            //Arrange

            database.data.forEach(todo => {
                todos.deleteTodo(todo.id);
            });

            //Act
            const result = todos.list();

            //Assert
            expect(result).toEqual([]);
        });

        it('test sort of list by all done', () => {
            //Arrange

            database.data.forEach(todo => {
                todo.done= true;
            });

            const expected = database.data.map(todo => {
                return {task: todo.task, done: true, id:todo.id}
            });
            //Act
            const result = todos.list();

            //Assert
            expect(result).toEqual(expected);
            expect(result.length).toEqual(7);
        });


        it('test sort of list by single not done', () => {
            //Arrange   
           
            database.data.forEach(todo => {
                todo.done= true;
            });
            
            const expected = database.data.map(todo => {
                return {task: todo.task, done: todo.done, id:todo.id}
            });
            
            
            database.data.push({
                task:'task15',
                done: false,
                id: 15,
                delete:false
            })

            expected.unshift({task:'task15',
            done: false,
            id: 15
        })


            //Act
            const result = todos.list();

            //Assert
            expect(result).toEqual(expected);
            expect(result.length).toEqual(8);
        });
    })
});