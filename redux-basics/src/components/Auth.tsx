import { useDispatch } from "react-redux";
import { login } from "../store/features/auth/authSlice";

import classes from './Auth.module.css';

const Auth = () => {
  const dispatch = useDispatch();

  const loginAction = (formData: FormData) => {
    const email = formData.get('email');
    const password = formData.get('password');

    if (email && password) {
      dispatch(login({username: email.toString(), password: password.toString()}));
    }
  };
  
  return (
    <main className={classes.auth}>
      <section>
        <form action={loginAction}>
          <div className={classes.control}>
            <label htmlFor='email'>Email</label>
            <input type='email' id='email' name='email'/>
          </div>
          <div className={classes.control}>
            <label htmlFor='password'>Password</label>
            <input type='password' id='password' name='password'/>
          </div>
          <button type="submit">Login</button>
        </form>
      </section>
    </main>
  );
};

export default Auth;