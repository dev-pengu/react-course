import { type ComponentPropsWithoutRef, type PropsWithChildren } from "react";

export default function Button({isText = false, children, ...props}: PropsWithChildren<{isText?: boolean}> & ComponentPropsWithoutRef<"button">) {
    return (
        <button className={isText ? "text-button" : "button"} {...props} >
            {children}
        </button>
    )
}