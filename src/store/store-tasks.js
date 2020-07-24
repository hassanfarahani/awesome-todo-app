import Vue from 'vue';
import { uid } from 'quasar';
import { firebaseDb, firebaseAuth } from 'boot/firebase'

const state = {
    tasks: {
        // 'ID1': {
        //     name: 'Go to shop',
        //     completed: false,
        //     dueDate: '2019/05/12',
        //     dueTime: '18:30'
        // },
        // 'ID2': {
        //     name: 'Get apples',
        //     completed: false,
        //     dueDate: '2019/05/14',
        //     dueTime: '18:30'
        // },
        // 'ID3': {
        //     name: 'Get bananas',
        //     completed: false,
        //     dueDate: '2019/05/13',
        //     dueTime: '16:00'
        // }
    },
    search: '',
    sort: 'name'
}

const mutations = {
    updateTask(state, payload) {
        Object.assign(state.tasks[payload.id], payload.updates);
    },
    deleteTask(state, id) {
        Vue.delete(state.tasks, id);
    },
    addTask(state, payload) {
        Vue.set(state.tasks, payload.id, payload.task)
    },
    setSearch(state, value) {
        state.search = value;
    },
    setSort(state, value) {
        state.sort = value;
    }
}

const actions = {
    updateTask({ commit }, payload) {
        commit('updateTask', payload)
    },
    deleteTask({ commit }, id) {
        commit('deleteTask', id);
    },
    addTask({ commit }, task) {
        let taskId = uid();
        let payload = {
            id: taskId,
            task
        };
        commit('addTask', payload);
    },
    setSearch({ commit }, value) {
        commit('setSearch', value);
    },
    setSort({ commit }, value) {
        commit('setSort', value);
    },
    fbReadData({ commit }) {
        console.log('read data from fb')
        // to access firebase data, We first set up a reference to a particular node within the database.
        // we can use firebase auth api to get access to the user id in db
        let userId = firebaseAuth.currentUser.uid
        let userTasks = firebaseDb.ref(`tasks/${userId}`)
        // we can add Hookes to this ref, so listen for changes within our data
        // add a hook (child added hook) which will be fired any time a new task is added within firebase
        // child added hook is also fired, When we first connect to the database
        userTasks.on('child_added', snapshot => {
            let task = snapshot.val()
            let payload = {
                id: snapshot.key,
                task
            }
            commit('addTask', payload)
        })

        // child_changed hook === task updated
        userTasks.on('child_changed', snapshot => {
            let task = snapshot.val()
            let payload = {
                id: snapshot.key,
                updates: task
            }
            commit('updateTask', payload)
        })
    }
}

const getters = {
    tasksSorted(state) {
        let tasksSorted = {},
            keysOrdered = Object.keys(state.tasks);

        keysOrdered.sort((a, b) => {
            let taskAProp = state.tasks[a][state.sort].toLowerCase(),
                taskBProp = state.tasks[b][state.sort].toLowerCase()

            if (taskAProp>taskBProp) return 1
            else if (taskAProp<taskBProp) return -1
            else return 0
        });
        keysOrdered.forEach(key => {
            tasksSorted[key] = state.tasks[key];
        })
        return tasksSorted
    },
    tasksFiltered(state, getters) {
        let tasksSorted = getters.tasksSorted;
        let tasksFiltered = {};
        if (state.search) {
            Object.keys(tasksSorted).forEach(key => {
                let task = tasksSorted[key];
                if (task.name.toLowerCase().includes(state.search.toLowerCase())) {
                    tasksFiltered[key] = task;
                }
            })
            return tasksFiltered;
        }
        return tasksSorted;
    },
    tasksToDo(state, getters) {
        let tasksFiltered = getters.tasksFiltered;
        let tasks = {};
        Object.keys(tasksFiltered).forEach(key => {
            let task = tasksFiltered[key];
            if (!task.completed) {
                tasks[key] = task;
            }
        })
        return tasks;
    },
    tasksCompleted(state, getters) {
        let tasksFiltered = getters.tasksFiltered;
        let tasks = {};
        Object.keys(tasksFiltered).forEach(key => {
            let task = tasksFiltered[key];
            if (task.completed) {
                tasks[key] = task;
            }
        })
        return tasks;
    }
}

export default {
    namespaced: true, // this allows us to have multiple store modules within our app
    state,
    mutations,
    actions,
    getters
}