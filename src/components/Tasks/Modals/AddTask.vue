<template>
    <q-card>
        <modalHeader>Add Task</modalHeader>
        <form @submit.prevent="submitForm">
            <q-card-section class="q-pt-none">
                <modalTaskName :name.sync="taskToSubmit.name" ref="modalTaskName" />
                <modalDueDate :dueDate.sync="taskToSubmit.dueDate" @clear="clearDueDate" />
                <modalDueTime :dueTime.sync="taskToSubmit.dueTime" :dueDate="taskToSubmit.dueDate" v-if="taskToSubmit.dueDate" />
            </q-card-section>
            <modalButtons />
        </form>
    </q-card>
</template>

<script>
import { mapActions } from 'vuex'
import modalHeader from 'components/Tasks/Modals/Shared/ModalHeader.vue'
import modalTaskName from 'components/Tasks/Modals/Shared/ModalTaskName.vue'
import modalDueDate from 'components/Tasks/Modals/Shared/ModalDueDate.vue'
import modalDueTime from 'components/Tasks/Modals/Shared/ModalDueTime.vue'
import modalButtons from 'components/Tasks/Modals/Shared/ModalButtons.vue'

export default {
    components: {
        modalHeader,
        modalTaskName,
        modalDueDate,
        modalDueTime,
        modalButtons
    },
    data() {
        return {
            taskToSubmit: {
                name: '',
                completed: false,
                dueDate: '',
                dueTime: ''
            }
        }
    },
    methods: {
        ...mapActions('tasks', ['addTask']),
        submitForm() {
            this.$refs.modalTaskName.$refs.name.validate(); // trigger the validation (for task name) before submission (this.$refs.name ==> hasError props True or False)
            if (!this.$refs.modalTaskName.$refs.name.hasError) {
                this.submitTask();
            }
        },
        submitTask() {
            this.addTask(this.taskToSubmit);
            this.$emit('close');
        },
        clearDueDate() {
            this.taskToSubmit.dueDate = '';
            this.taskToSubmit.dueTime = '';
        }
    }
}
</script>

<style>

</style>



