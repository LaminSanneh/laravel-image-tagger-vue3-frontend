import { defineStore } from 'pinia'

export const photosStore = defineStore('photos', {
    state: () => {
        return {
            photosList: []
        }
    },
    actions: {
        savePhoto(photoProperties) {
            this.photosList.push(photoProperties)
        },
    }
})