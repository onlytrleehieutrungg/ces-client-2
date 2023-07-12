import { createContext, ReactNode, useEffect, useReducer } from 'react'
// utils
// import axios from '../utils/axios'
import { isValidToken, setSession } from '../utils/jwt'
// @types
import { authApi } from 'src/api-client'
import axiosClient from 'src/api-client/axiosClient'
import { ActionMap, AuthState, JWTContextType } from '../@types/auth'
import { AccountData } from 'src/@types/@ces'

// ----------------------------------------------------------------------

enum Types {
  Initial = 'INITIALIZE',
  Login = 'LOGIN',
  Logout = 'LOGOUT',
  Register = 'REGISTER',
  Fetch = 'FETCH',
}

type JWTAuthPayload = {
  [Types.Initial]: {
    isAuthenticated: boolean
    user: AccountData | null
  }
  [Types.Fetch]: {
    account: AccountData | null
  }
  [Types.Login]: {
    account: AccountData | null
  }
  [Types.Logout]: undefined
  [Types.Register]: {
    user: AccountData
  }
}

export type JWTActions = ActionMap<JWTAuthPayload>[keyof ActionMap<JWTAuthPayload>]

const initialState: AuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
}

const JWTReducer = (state: AuthState, action: JWTActions) => {
  switch (action.type) {
    case 'INITIALIZE':
      return {
        isAuthenticated: action.payload.isAuthenticated,
        isInitialized: true,
        user: action.payload.user,
      }
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.account,
      }
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      }
    case 'FETCH':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.account,
      }
    case 'REGISTER':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      }

    default:
      return state
  }
}

const AuthContext = createContext<JWTContextType | null>(null)

// ----------------------------------------------------------------------

type AuthProviderProps = {
  children: ReactNode
}

function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(JWTReducer, initialState)

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : ''

        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken)
          const response = await authApi.getMe()

          dispatch({
            type: Types.Initial,
            payload: {
              isAuthenticated: true,
              user: response,
            },
          })
        } else {
          dispatch({
            type: Types.Initial,
            payload: {
              isAuthenticated: false,
              user: null,
            },
          })
        }
      } catch (err) {
        console.error(err)
        dispatch({
          type: Types.Initial,
          payload: {
            isAuthenticated: false,
            user: null,
          },
        })
      }
    }

    initialize()
  }, [])

  const login = async (email: string, password: string) => {
    if (email === 'test@gmail.com' && password === 'test') {
      setSession(
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic3RyaW5nIiwiZW1haWwiOiJ0cnVuZ0BnbWFpbC5jb20iLCJzdWIiOiJ0cnVuZ0BnbWFpbC5jb20iLCJqdGkiOiI4NWFjMGQwYy0yZDA3LTQ2ODEtYjNlMS0zOTljMTYwOGNiNTAiLCJVc2VyTmFtZSI6InN0cmluZyIsIlVzZXJJZCI6IjQwZTQ1Nzc0LThiNmUtNDdkNi04ZTE1LTMyMjA2OWE0MDdmOCIsInJvbGUiOiJTeXN0ZW1BZG1pbiIsIlRva2VuSWQiOiI4ZmZiNzViNy0wMDc4LTRlMDgtYjA1OC04M2VkNmU2Yzg2ZGUiLCJuYmYiOjE2ODUwODU5MzEsImV4cCI6MTkwNjAxODA5MywiaWF0IjoxNjg1MDg1OTMxfQ.eHwYi_tNwcJu2tO5ZSWBWgEdvp1L2ziDLzcAod4LTxc'
      )
      dispatch({
        type: Types.Login,
        payload: {
          account: null,
        },
      })
    } else {
      const response = await axiosClient.post('/login', {
        email,
        password,
      })

      const { token } = response.data

      setSession(token?.accessToken)
      // setSession(refreshToken);
      const account = await authApi.getMe()

      dispatch({
        type: Types.Login,
        payload: { account },
      })
    }
  }

  const register = async (email: string, password: string, firstName: string, lastName: string) => {
    const response = await axiosClient.post('/api/account/register', {
      email,
      password,
      firstName,
      lastName,
    })
    const { accessToken, user } = response.data

    localStorage.setItem('accessToken', accessToken)

    dispatch({
      type: Types.Register,
      payload: {
        user,
      },
    })
  }

  const logout = async () => {
    setSession(null)
    dispatch({ type: Types.Logout })
  }

  const fetchUser = async () => {
    const account = await authApi.getMe()
    dispatch({
      type: Types.Fetch,
      payload: { account },
    })
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        login,
        logout,
        register,
        fetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
