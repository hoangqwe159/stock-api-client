import React, { Component } from 'react';
import {  
  Route,
  Link  
} from "react-router-dom";

class HomePage extends Component {
  render() {
    return (
      
      
     
      <div className="hero-text col-xs-12">
        <h1 className="hero-heading">Welcome to Stock Analyst</h1>
        <p className="hero-heading"> Get the latest price information by stock symbol, or sample the price history for a particular stock</p>
        
        <Route
          path={`/stocks`}
          exact={false}
          children={() => {            
             
                return (  
                  <Link to={`/stocks`} type="button"  className="btn btn-lg btn-default">
                  Get Started
                  </Link>                
                ) 
          }}
        /> 

        
      </div>
   
      
      

      

      );

  }
  
}

export default HomePage;
