import { defineStore } from "pinia";
import { UserService } from "../iam/services/user.service.js";
import {SignInResponse} from "../iam/model/sign-in.response.js";

const userService = new UserService();

export const useAccountStore = defineStore({
    id: 'user',
    state: () => ({ signedIn: false, userId: 0, username: ''}),
    actions: {
        async signIn(signInRequest, router) {
            console.log("SignInRequest:", signInRequest)
            userService.getByEmail(signInRequest.email)
                .then(response => {
                    const user = response.data.length > 0 ? response.data[0] : null;
                    if (user && user.password === signInRequest.password) {
                        let signInResponse = new SignInResponse(user.id, user.username, user.phone, user.email, user.password);

                        this.signedIn = true;
                        this.userId = signInResponse.id;
                        this.username = signInResponse.username;
                        router.push({ name: 'bills' });
                    } else {
                        router.push({ name: 'sign-in' });
                    }

                })
                .catch(e => {
                    console.error("Error during sign-in:", e);
                    router.push({ name: 'sign-in' });
                })
        },
        async signUp(userResponse, router){
            userService.create(userResponse)
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