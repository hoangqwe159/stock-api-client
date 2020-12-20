import React, { Component } from 'react';

import { loginUser} from '../../utils/auth';
import { validateSignIn } from '../../utils/validateInputs';
import { setTokenWithExpiry } from '../../utils/token';
import {Link} from 'react-router-dom';


class LoginPage extends Component {
  constructor(props) {

    super(props);
    this.state = {
      id : '',      
      email: '',
      password: '', 
      errors: {}
    };
  }
 

  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value =  target.value;
    this.setState({
      [name] : value
    });   
    
  }
/**
 * Submit the information for log in
 */
  onSave = async (e) => {
    e.preventDefault();     
    var {email, password} = this.state;
    var errors = validateSignIn(email, password);
    
    
   
    var {history} = this.props;
    if(Object.keys(errors).length === 0){     
      
      const res = await loginUser({email, password})
      if(res.error){
        this.setState({errors:{...this.state.errors, global: res.message}, loading: false});
        alert("Bad account");
        console.log(this.state.errors);
        
      }else{
        const {token, expires_in} = res
        setTokenWithExpiry(token, expires_in)
        // updateAPIConfig({authToken: token})
        this.props.setChanged();
        await history.push('/stocks');
      }
    } else {
      alert(errors);
      
    }
  }

    
    

  render() {
    const {email,password} = this.state
    // const {errors, loading} = this.state
    return (
      <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">              
        
        <form onSubmit ={this.onSave} >
          <div className="form-group">
            <label>Username:</label>
            <input  type="text" 
                    className="form-control" 
                    name="email"
                    value={email}
                    onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input  type="password" 
                    className="form-control" 
                    name="password"
                    value={password}
                    onChange={this.onChange}
            />
          </div>
          
          
        
          
          <Link to='/' className="btn btn-danger mr-10">
            Back
          </Link>
          <button type="submit" className="btn btn-primary">Login</button>
          
        </form>
        
      </div>           
      );

  }
  
}

export default LoginPage;
