<template>
    <transition
    appear
    enter-active-class="animated zoomIn"
    leave-active-class="animated zoomOut absolute-top"
    >
        <div>
            <listHeader v-if="!settings.showTasksInOneList" bgColor="bg-orange-4">Todo</listHeader>
            <q-list separator bordered>
                <task v-for="(task, key) in tasksToDo" :key="key" :task="task" :id="key" />
            </q-list>
        </div>
    </transition>
</template>

<script>
import task from 'components/Tasks/Task.vue'
import listHeader from 'components/Shared/ListHeader.vue'
import { mapGetters } from 'vuex'

export default {
    props: ['tasksToDo'],
    components: {
        task,
        listHeader
    },
    computed: {
        ...mapGetters('settings', ['settings'])
    }
}
</script>

<style>

</style>
