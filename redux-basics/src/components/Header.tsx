import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/features/auth/authSlice";

import classes from './Header.module.css';
import type { RootState } from "../store";

const Header = () => {
  const {isAuthenticated} = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  return (
    <header className={classes.header}>
      <h1>Redux Auth</h1>
      {isAuthenticated && 
      <nav>
        <ul>
          <li>
            <a href='/'>My Products</a>
          </li>
          <li>
            <a href='/'>My Sales</a>
          </li>
          <li>
            <button onClick={() => dispatch(logout())}>Logout</button>
          </li>
        </ul>
      </nav>}
    </header>
  );
};

export default Header;