import { useState } from "react";


const useInput = <T>(defaultValue: T, validationFn: (value: T) => boolean): [T, (event: React.ChangeEvent<HTMLInputElement>) => void, () => void, boolean] => {
    const [enteredValue, setEnteredValue] = useState<T>(defaultValue);
    const [didEdit, setDidEdit] = useState<boolean>(false);

    const isValid = validationFn(enteredValue);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        
        setEnteredValue(event.target.value as T);
        setDidEdit(false);
    }

    const handleInputBlur = ()  => {
        setDidEdit(true);
    }

    return [enteredValue, handleInputChange, handleInputBlur, didEdit && !isValid];
}

export default useInput;