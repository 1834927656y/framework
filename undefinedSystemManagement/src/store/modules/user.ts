import { getToken } from '@/utils/auth'

export const useUserStore = defineStore('user',() => {
    const token = ref(getToken())

    const setToken = (token: any) => {
        token.value = token
    }

    return {
        token,
        setToken
    }
})

