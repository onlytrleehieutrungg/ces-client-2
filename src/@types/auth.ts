import { UserCredential } from 'firebase/auth'
import { AccountData } from './@ces'

// ----------------------------------------------------------------------

export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key
      }
    : {
        type: Key
        payload: M[Key]
      }
}

export type AuthUser = null | Record<string, any>

export type FixAuthState = {
  isAuthenticated: boolean
  isInitialized: boolean
  user: any
}

export type AuthState = {
  isAuthenticated: boolean
  isInitialized: boolean
  user: AccountData | null
}

export type JWTContextType = {
  isAuthenticated: boolean
  isInitialized: boolean
  user: AccountData | null
  method: 'jwt'
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<void>
  logout: () => Promise<void>
  fetchUser: () => Promise<void>
}

export type FirebaseContextType = {
  isAuthenticated: boolean
  isInitialized: boolean
  user: AccountData | null
  method: 'firebase'
  login: (email: string, password: string) => Promise<UserCredential>
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<void>
  logout: () => Promise<void>
}

export type AWSCognitoContextType = {
  isAuthenticated: boolean
  isInitialized: boolean
  user: AccountData | null
  method: 'cognito'
  login: (email: string, password: string) => Promise<unknown>
  register: (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => Promise<unknown>
  logout: VoidFunction
}

export type Auth0ContextType = {
  isAuthenticated: boolean
  isInitialized: boolean
  user: AccountData | null
  method: 'auth0'
  login: () => Promise<void>
  logout: VoidFunction
}
