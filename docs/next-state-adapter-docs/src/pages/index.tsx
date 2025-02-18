import type {ReactNode} from 'react';
import {useHistory} from "@docusaurus/router";
import {useEffect} from "react";


export default function Home(): ReactNode {
    const history = useHistory();

    useEffect(() => {
        // Редирект на страницу документации
        history.push('/docs/intro');
    }, [history]);

  return null
}
