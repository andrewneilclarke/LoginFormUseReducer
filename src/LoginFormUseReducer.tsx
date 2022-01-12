import { TextField, Button, Modal, Box, Typography } from '@mui/material'
import { useReducer, useState } from 'react'
import { login } from './utils'
import { createTheme, ThemeProvider } from '@mui/material/styles';


declare module '@mui/material/styles' {
    interface Theme {
        status: {
            danger: React.CSSProperties['color'];
        };
    }

    interface Palette {
        neutral: Palette['primary'];
    }
    interface PaletteOptions {
        neutral: PaletteOptions['primary'];
    }

    interface PaletteColor {
        darker?: string;
    }
    interface SimplePaletteColorOptions {
        darker?: string;
    }
    interface ThemeOptions {
        status: {
            danger: React.CSSProperties['color'];
        };
    }
}

const theme = createTheme({
    status: {
        danger: '#e53e3e',
    },
    palette: {
        primary: {
            main: '#0971f1',
            darker: '#053e85',
        },
        neutral: {
            main: '#64748B',
            contrastText: '#fff',
        },
    },
});
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

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

const LoginFormUseReducer: React.FC = () => {
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
                    <TextField type="text" name="name" id="outlined-basic" label="name" variant="outlined" placeholder="name" value={name} onChange={(e) => dispatch({ type: 'field', fieldName: 'name', payload: e.target.value, })} />
                    <TextField type="password" name="password" id="outlined-basic" label="password" variant="outlined" placeholder="password" value={password} onChange={(e) => dispatch({ type: 'field', fieldName: 'password', payload: e.target.value, })} />
                    <ThemeProvider theme={theme}>
                        <Button type="submit" size="large" color='info' disabled={isLoading} variant="contained">{isLoading ? 'Logging in...' : 'Login'}</Button>
                    </ThemeProvider>
                </form>
            }
        </>
    )
}

export default LoginFormUseReducer
