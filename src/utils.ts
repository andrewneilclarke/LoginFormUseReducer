export const login = async (username: string, password: string) => {
    return new Promise<void>((resolve, reject) => {
        setTimeout(() => {
            if (username === 'ben' && password === 'password') {
                resolve();
            } else {
                reject()
            }
        }, 1000
        )
    })
}
