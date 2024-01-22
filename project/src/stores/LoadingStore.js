import { defineStore } from 'pinia'

export const loadingStore = defineStore('loading', {
    state: () => ({
        isLoading : true,
    }),
    actions: {
        setLoaded() {
            this.isLoading = false
        },
    }
})