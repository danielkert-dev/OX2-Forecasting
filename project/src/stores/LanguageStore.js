import { defineStore } from 'pinia'
import { textdata } from "../components/TextDataComp";


export const useLanguageStore = defineStore('language', {
    state: () => ({
        language: 'en',
        text: {},
        textEn: {},
    }),
    actions: {
        setLanguage(input) {
            this.language = input;
        },

        setText(language) {
            console.log(language);
            this.text = textdata[0][language];
          },

        getLanguage() {
            return this.language;
        },
    },

})
