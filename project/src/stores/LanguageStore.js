import { defineStore } from 'pinia'
import { textdata } from "../components/TextDataComp";
import { loadingStore } from '../stores/LoadingStore.js';


export const useLanguageStore = defineStore('language', {
    state: () => ({
        language: 'en',
        text: {},
        about: "",
        textEn: {},
    }),
    actions: {
        setLanguage(input) {
            this.language = input;
        },

        setText(language) {
            console.log(language);
            this.text = textdata[0][language];
            setTimeout(() => {
                loadingStore().setLoaded();
              }, 500);
        },

        setTextAbout(language) {
        this.about = language;
        },

        getLanguage() {
            return this.language;
        },
    },

})
