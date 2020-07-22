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
    methods: {
        submitForm() {
            this.$refs.modalTaskName.$refs.name.validate(); // trigger the validation (for task name) before submission (this.$refs.name ==> hasError props True or False)
            if (!this.$refs.modalTaskName.$refs.name.hasError) {
                this.submitTask();
            }
        },
        clearDueDate() {
            this.taskToSubmit.dueDate = '';
            this.taskToSubmit.dueTime = '';
        }
    }
}