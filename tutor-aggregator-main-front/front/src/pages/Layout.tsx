import {PageHeader} from "./PageHeader";
import {LogInProps} from "../propsTypes/LogInProps";
import {Outlet} from "react-router";
import {PageFooter} from "./PageFooter";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

type LayoutProps = LogInProps & {}

export function Layout(props: LayoutProps) {
    const nav = useNavigate()
    // useEffect(() => {
    //     nav('/');
    // }, [props.logged])

    return (
        <>
            <PageHeader {...props}/>
            <Outlet/>
            <PageFooter/>
        </>
    )
}