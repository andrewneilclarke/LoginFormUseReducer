import { useReducer } from 'react'
import { login } from './utils'

const loginReducer = (state: any, action: any) => {
    switch (action.type) {
        case 'field': {
            return {
                ...state,
                [action.fieldName]: action.payload,
            }
        }
        case 'login': {
            return {
                ...state,
                isLoading: true,
                error: '',
            };
        }
        case 'success': {
            return {
                ...state,
                loggedin: true,
                error: '',
                isLoading: false,
            };
        }
        case 'error': {
            return {
                ...state,
                error: 'incorrect username or password!',
                isLoading: false,
            };
        }
        case 'logout': {
            return {
                ...state,
                loggedin: false,
                name: '',
                password: '',
            };
        }
        default:
            break;
    }
    return state
}

const initialState = {
    name: (''),
    password: (''),
    isLoading: false,
    error: false,
    loggedin: false,
}

const LoginForm: React.FC = () => {
    const [state, dispatch] = useReducer(loginReducer, initialState)
    const { name, password, isLoading, error, loggedin } = state;

    const loginUser = async (e: any) => {
        e.preventDefault();
        dispatch({ type: 'login' })
        try {
            await login(name, password)
            dispatch({ type: 'success' })
        } catch (err) {
            dispatch({ type: 'error' })
        }
        console.log('logged in', name)
    }
    const logout = () => {
        dispatch({ type: 'logout' })
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
                    <input type="text" name="name" id="name" placeholder="name" value={name} onChange={(e) => {
                        console.log('change')
                        dispatch({ type: 'field', fieldName: 'name', payload: e.target.value, })
                    }} />
                    <input type="password" name="password" id="password" placeholder="password" value={password} onChange={(e) => dispatch({ type: 'field', fieldName: 'password', payload: e.target.value, })} />
                    <button type="submit" disabled={isLoading}>{isLoading ? 'Logging in...' : 'Login'}</button>
                </form>
            }
        </>
    )
}

export default LoginForm
