import {Component} from 'react';
import User from './User';
import classes from './Users.module.css';

class Users extends Component<{ users: {id: string, name: string}[]}, {showUsers: boolean}> {

    constructor(props: { users: {id: string, name: string}[]}) {
        super(props);
        this.state = {showUsers: true};
    }

    toggleUsersHandler = () => {
        this.setState((prevState) => {
            return {showUsers: !prevState.showUsers};
        });
    }
    
    render() {
        const usersList = <ul>
                {this.props.users.map((user) => (
                    <User key={user.id} name={user.name}/>
                ))}
            </ul>;
        return (
            <div className={classes.users}>
                <button onClick={this.toggleUsersHandler.bind(this)}>
                    {this.state.showUsers ? 'Hide' : 'Show'} Users
                </button>
                {this.state.showUsers && usersList}
            </div>
        )
    }
}

export default Users;