<template>
    <form @submit.prevent="submitForm">
        <div class="q-mb-md">
            <q-banner class="bg-grey-3">
                <template v-slot:avatar>
                    <q-icon name="account_circle" color="primary" />
                </template>
                    {{ tab | titleCase }} to access your Todos anywhere
            </q-banner>
        </div>
        <div class="q-mb-md">
            <q-input
                outlined
                :rules="[ val => isValidEmailAddress(val) || 'Please enter a valid email address!']"
                lazy-rules
                ref="email"
                v-model="formData.email"
                label="Email"
                stack-label />
        </div>
        <div class="q-mb-md">
            <q-input
                type="password"
                :rules="[ val => val.length >= 6 || 'Please use at least 6 characters']"
                lazy-rules
                ref="password"
                outlined
                v-model="formData.password"
                label="Password"
                stack-label />
        </div>
        <div class="row">
            <q-space />
            <q-btn type="submit" color="primary" :label="tab" />
        </div>
    </form>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    props: ['tab'],
    data() {
        return {
            formData: {
                email: '',
                password: ''
            }
        }
    },
    methods: {
        ...mapActions('auth', ['registerUser', 'loginUser']),
        submitForm() {
            this.$refs.email.validate();
            this.$refs.password.validate();
            if (!this.$refs.email.hasError && !this.$refs.password.hasError) {
                if (this.tab === 'login') {
                    this.loginUser(this.formData)
                } else {
                    this.registerUser(this.formData)
                }
            }
        },
        isValidEmailAddress(email) {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }
    },
    filters: {
        titleCase(value) {
            return `${value.charAt(0).toUpperCase()}${value.slice(1)}`
        }
    }
}
</script>

<style>

</style>