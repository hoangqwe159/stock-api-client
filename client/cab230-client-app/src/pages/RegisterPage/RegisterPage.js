import React, { Component } from 'react';

import { registerUser} from '../../utils/auth';
import { validateSignUp } from '../../utils/validateInputs';
import {Link} from 'react-router-dom';


class RegisterPage extends Component {
  constructor(props) {

    super(props);
    this.state = {
         
      email: '',
      password: '',  
      checkPassword:'',    
      loading: false,
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
 * Submit the information for register
 */
  onSave = async (e) => {
    e.preventDefault();
    
    
    var {email, password, checkPassword} = this.state;
    var errors = validateSignUp(email, password, checkPassword);
    this.setState({errors});
    var {history} = this.props;
    if(Object.keys(errors).length === 0){
      console.log("alo");
      this.setState({loading: true});
      const res = await registerUser({email, password});
      console.log(res);
      if(res.error){
        this.setState({errors:{...this.state.errors, global: res.message}, loading: false})
        alert(res.message);
      }else{
        alert(res.message);
        history.push("./login")
        
      }
    }else {
      console.log(errors);
      alert("Password does not match. Enter password again");
    }    
  }

    
    

  render() {
    const {email,password, checkPassword } = this.state
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

          <div className="form-group">
            <label>Re-enter password:</label>
            <input  type="password" 
                    className="form-control" 
                    name="checkPassword"
                    value={checkPassword}
                    onChange={this.onChange}
            />
          </div>
          
          
        
          
          <Link to='/' className="btn btn-danger mr-10">
            Back
          </Link>
          <button type="submit" className="btn btn-primary">Register</button>
          
        </form>
        
      </div>           
      );

  }
  
}

export default RegisterPage;
