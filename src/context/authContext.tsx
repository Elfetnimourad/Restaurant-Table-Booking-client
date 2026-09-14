import { createContext, useContext, useEffect, useState } from "react";


interface AuthContextType {
    userData: {id:number;name:string;password:string;email:string;role:string;} | null;
    authenticated:boolean;
}

const authContext :React.Context<AuthContextType | null> = createContext<AuthContextType | null>(null);


export const AuthProvider = ({children}: {children: React.ReactNode})=>{
    let [userData,setUserData] = useState<AuthContextType["userData"]|null>(null);
const [authenticated,setAuthenticated] = useState<boolean>(false);
const token:string|null = localStorage.getItem("token")
useEffect(()=>{
    const getMe = async()=>{
        try{
         const res = await fetch("http://localhost:5000/users/me",{
            method:"GET",
            headers:{
                "authorization":`Bearer ${token}` 
            }
        });
         const data = await res.json() as AuthContextType["userData"];

         setUserData(data)
         if(!res.ok){
            console.error("There is Something Wrong!")
         }
         ;
         setAuthenticated(true);
         console.log("userData",userData)
        }catch(error){
            console.error(error)
            throw(error);
        }
    }
    getMe();
},[])

return(
    <authContext.Provider value={{userData,authenticated}}>
        {children}
    </authContext.Provider>
)

}

export const useAuth = () =>{
    const context = useContext(authContext);

    if(!context){
        throw new Error("Auth Context is not found")
    }
    return context;
}