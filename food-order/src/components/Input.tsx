import { type ComponentPropsWithoutRef } from "react";

export default function Input({label, error, ...props}: ComponentPropsWithoutRef<"input"> & {label: string, error?: string}) {

    return (
        <div className="control">
            <label htmlFor={props.id}>{label}</label>
            <input {...props} id={props.id} />
            <div className="control-error">{error && <p>{error}</p>}</div>
        </div>
    )
}

    