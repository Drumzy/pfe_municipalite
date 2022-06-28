

export const parseJwt = (token: string) => {
    try{
        return JSON.parse(atob(token.split(".")[1]));
    }catch(e){
        return null;
    }
}

export const AuthVerify = () =>{
    const token = localStorage.getItem("token");
    if(token){
        const decodedJWT = parseJwt(token);
        if(decodedJWT.exp * 1000 < Date.now()){
            localStorage.clear()
            return false;
        }
        return true;
    }
}