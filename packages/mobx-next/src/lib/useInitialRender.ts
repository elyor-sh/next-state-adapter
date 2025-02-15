'use client';

import {useRef} from "react";

export const useInitialRender = (cb: () => void) => {
    const initialized = useRef(false)

    if (!initialized.current) {
        cb()
        initialized.current = true
    }

}