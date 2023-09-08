import { Outlet } from "react-router-dom";
import { Header } from '../sections';
import { useContext } from 'react';
import { AuthContext, ContextType } from "../contexts/AuthProvider";
import Loading from "../components/loading/Loading";

const DefaultLayout = () => {
    const { isLoading } = useContext<ContextType>(AuthContext);

    if (isLoading) {
        return <Loading />
    }

    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}

export default DefaultLayout
