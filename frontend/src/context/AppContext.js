import { createContext, useContext, useEffect } from "react";
import { useState } from "react";

const AppContext = createContext();

export const AppProvider = ({children}) => {

    // const [sidebarWidth, setSidebarWidth] = useState(100);
    // const [mleft, setMLeft] = useState(70);
    const [sidebarActive, setSidbarActive] = useState(true);
    const [userName, setUserName] = useState("");
    const [toggle, setToggle] = useState(false);
    const [viewProduct, setViewProduct] = useState({});
    const [showProductDetail, setShowProductDetail] = useState(false);
    // const openSidebar = () => {
    //         setSidebarWidth(200);
    //         setMLeft(300);
    //         console.log(mleft);
    //         console.log("true")
    // }

    useEffect(()=> {
        setUserName(JSON.parse(localStorage.getItem("login_user")))
    }, [])

    // const closeSidebar = () => {
    //     setSidebarWidth(100);
    //     setMLeft(150)
    //     console.log("else",mleft)
    // }
    
    return (
        <AppContext.Provider 
        value={{
            // sidebarWidth,
            // mleft,
            // openSidebar,
            // closeSidebar,
            setSidbarActive,
            userName,
            setUserName,
            sidebarActive,
            toggle,
            setToggle,
            showProductDetail,
            setShowProductDetail,
            viewProduct,
            setViewProduct,
        }}
        >
            {children}
        </AppContext.Provider>
    )
}


export const useGlobalContext = () => {
    return useContext(AppContext);
}

export default AppContext;