import { createContext, useContext, useState } from "react";

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState({
		"_id": "68c22f5946f7d26e67749011",
		"name": "Pharma - Kwame",
		"email": "pharmacist@gmail.com",
		"role": "Pharmacist",
		"verified": false,
		"createdAt": "2025-09-11T02:09:29.017Z",
		"updatedAt": "2025-09-22T23:57:58.979Z",
		"__v": 0,
		"deleted": false,
		"status": "active",
		"location": "Kasoa",
		"phone": "0234 234 2345"
	})
    // const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null)
    const [token, setToken] = useState(localStorage.getItem("token") || null)
 
    const login = (userData, jwt) => {
        setUser(userData)
        setToken(jwt)

        localStorage.setItem("user", JSON.stringify(userData))
        localStorage.setItem("token", jwt)
    }
    const logout = () => {
        setUser(null)
        setToken(null)
        localStorage.clear()
    }

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )

}


export const useAuth = () =>  useContext(AuthContext);