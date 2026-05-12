import { useRef, useState } from "react";

export default function Login() {

  const [emailIsInvalid, setEmailIsInvalid] = useState<boolean>(false);
  const [passwordIsInvalid, setPasswordIsInvalid] = useState<boolean>(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    const emailIsValid = email?.includes('@');
    const passwordIsValid = password && password.length >= 6;
    if (!emailIsValid) {
      setEmailIsInvalid(true);
      return;
    }
    if (!passwordIsValid) {
      setPasswordIsInvalid(true);
      return;
    }
    setEmailIsInvalid(false);
    setPasswordIsInvalid(false);
    
    console.log('Login form submitted');
    console.log({ email, password });
    event.currentTarget.reset();
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" ref={emailRef} />
          <div className="control-error">{emailIsInvalid && <p>Please enter a valid email address.</p>}</div>
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" ref={passwordRef} />
          <div className="control-error">{passwordIsInvalid && <p>Please enter a valid password.</p>}</div>
        </div>
      </div>

      <p className="form-actions">
        <button type="reset" className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}