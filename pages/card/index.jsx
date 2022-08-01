import Router from "next/router";
import { useEffect } from "react";

export default function Redirect() {
    useEffect(() => {
        Router.push("/");
    }, []);

    return <></>;
}
