import React, {useState, useContext, useEffect} from 'react';
import AppContext from '../../context/appContext';

const Login = (props) => {

  const appContext = useContext(AppContext);
  const {logIn, isAuthenticated} = appContext;

  const [admin, setAdmin] = useState({
    name: '',
    password: ''
  });

  const {name, password} = admin;

  const onChange = (e)=>{
    setAdmin({...admin, [e.target.name]:e.target.value})
  }

  const onSubmit = (e)=>{
    e.preventDefault();

    logIn(admin);
  }

  useEffect(()=>{
    if(isAuthenticated){
      props.history.push('/questions');
      console.log('running')
    }
  }, [isAuthenticated, props.history]);


  return (
    <div className='container'>
      <form onSubmit={onSubmit} className='loginForm'>
        <h3>Log In</h3>

        <div>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" value={name} onChange={onChange} />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input type="text" name="password" value={password} onChange={onChange}/>
        </div>

        <input type="submit" value='Login' />

      </form>

    </div>
  )
}

export default Login
