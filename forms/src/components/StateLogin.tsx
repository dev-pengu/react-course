import Input from "./Input";
import { hasMinLength, isEmail, isNotEmpty } from "../util/validation";
import useInput from "../hooks/useInput";

export default function Login() {

  const [email, handleEmailChange, handleEmailBlur, emailHasError] = useInput<string>('', (v) => isEmail(v) && isNotEmpty(v));
  const [password, handlePasswordChange, handlePasswordBlur, passwordHasError] = useInput<string>('', (v) => hasMinLength(v, 6));

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (emailHasError || passwordHasError) {
      return;
    }

    console.log('Login form submitted');
    console.log({ email, password });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <Input 
          label="Email"
          id="email"
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
          onBlur={handleEmailBlur}
          error={emailHasError ? "Please enter a valid email address." : undefined}
        />

        <Input
          label="Password"
          id="password"
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
          onBlur={handlePasswordBlur}
          error={passwordHasError ? "Please enter a valid password." : undefined}
         />
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}