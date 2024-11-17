import { defineStore } from "pinia";
import { UserService } from "../iam/services/user.service.js";
import {User} from "../iam/model/user.entity.js";

const userService = new UserService();

export const useAccountStore = defineStore({
    id: 'user',
    state: () => ({ signedIn: false, userId: 0, username: ''}),
    actions: {
        async signIn(userResponse, router) {

            userService.getByEmail(userResponse.email).then(response => {
                let user = new User(response.data);
                if (userResponse.password !== user.password) {
                    router.push({ name: 'sign-in' });
                }
                this.signedIn = true;
                this.userId = user.id;
                this.username = user.username;
                router.push({ name: 'recovery' });
            })
            .catch(e => {
                console.log(e)
                router.push({ name: 'sign-in' });
            })
        },
        async signUp(user, router){
            userService.create(user)
                .then(response => {
                    router.push({ name: 'sign-in' });
                })
        },

        async signOut(router) {
            this.signedIn = false
            this.userId = 0
            this.username = ''
            router.push({ name: 'sign-in' });
        }
    },
    getters: {
        getUserId: (state) => state['userId'],
        isSignedIn: (state) => state['signedIn'],
        currentUsername: (state) => state['username']
    }
});