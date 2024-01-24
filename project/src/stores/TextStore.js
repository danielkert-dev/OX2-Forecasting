import { defineStore } from 'pinia'

export const useTextStore = defineStore('text', {
    state: () => ({
        wpText: 'Nothing',
    }),
    actions: {
        setText(input) {
            this.wpText = input
        },

        getMainText() {
            // Process main view text
            return 
        },

        getMonthlyText() {
            // Process monthly view text
            return
        },

        getYearlyText() {
            // Process yearly view text
            return
        }


    }
})