import {useLocation} from "react-router-dom";
import {useEffect} from "react";

export function useAnchors(): void{
    const loc = useLocation();
    useEffect(() => {
        const hash = loc.hash
        // Check if there is a hash and if an element with that id exists
        const el = hash && document.getElementById(hash.substr(1))
        if (el) {
            el.scrollIntoView({behavior: "smooth"})
        }
    }, [loc.hash])
}