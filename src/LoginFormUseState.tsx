import { useState } from 'react'
import { login } from './utils'

const LoginForm = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [loggedin, setLoggedIn] = useState(false)

    const loginUser = async (e: any) => {
        e.preventDefault();
        setError('')
        setIsLoading(true)
        try {
            await login(name, password)
            setLoggedIn(true)
            setError('')
        } catch (err) {
            setError('incorrect username or password!')
        }
        console.log('logged in', name)
        setIsLoading(false)
    }
    const logout = () => {
        setLoggedIn(false)
        setName('')
        setPassword('')
        console.log('logged out')
    }
    return (
        <>
            <h1>React Typescript Form with useReducer actions</h1>

            {error && <p className="error">{error}</p>}
            {loggedin ? <>
                <p>Welcome, {name}</p>
                <button onClick={logout}>Logout</button>
            </> :
                <form onSubmit={loginUser}>
                    <input type="text" name="name" id="name" placeholder="name" value={name} onChange={(e) => setName(e.target.value)} />
                    <label>Password</label>
                    <input type="password" name="password" id="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit" disabled={isLoading}>{isLoading ? 'Logging in...' : 'Login'}</button>
                </form>
            }
        </>
    )
}

export default LoginForm
