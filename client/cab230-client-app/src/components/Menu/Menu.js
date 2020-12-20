import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';



const labelOnClick = (label) => {

  
  if (label === "Logout") {
    localStorage.removeItem("token");    
  }
  
}
const MenuLink = ({label, to, activeOnlyWhenExact}) => {
    return (
      <Route
        path={to}
        exact={activeOnlyWhenExact}
        children={({match}) => {
            
            if (label !== "Logout") {
              var active = match ? 'active' : '';
            } else {
              active = '';
            }
              return (              
                <li className={active} > 
                    <Link to={to} onClick={() => labelOnClick(label)} > 
                        {label}
                    </Link>
                </li>
              ) 
            
            
            
        }}
      />  
    );
}
class Menu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      menus: [{
        name: 'Home',
        to: '/',
        exact: true
      },
      {
        name: 'Stocks',
        to: '/stocks',
        exact: false
      }
      ],
      rightNav: [],
      authorized: ''



    }
  }
  
  
 
  componentDidMount() {
    
    
  }
/**
 * Click logout button then remove the token
 */
  labelOnClick = () => {

    localStorage.removeItem("token");     
    this.setState({
      authorized: "false"
    })
    this.props.setChanged();
  }


  render() {
    if (this.props.authorized){
      return (
        <div className="navbar navbar-default">
            <span className="navbar-brand">STOCK ANALYST</span>
            <ul className="nav navbar-nav">
                {this.showMenus(this.state.menus)}
            </ul>
            <ul className="nav navbar-nav navbar-right mr-100">
            <Route
              path='/'
              exact={false}
              children={() => {            
                return (              
                  <li> 
                      <Link to='/' onClick={() => this.labelOnClick()} > 
                          Log out
                      </Link>
                  </li>
                ) 
              }}
            />  
            </ul>
            

        </div>       
    
      );
      
    }else {
      
      
      return (
        <div className="navbar navbar-default">
            <span className="navbar-brand">STOCK ANALYST</span>
            <ul className="nav navbar-nav">
                {this.showMenus(this.state.menus)}
            </ul>
            <ul className="nav navbar-nav navbar-right mr-100">
            <Route
              path='/'
              exact={false}
              children={() => {            
                return (    
                  <li> 
                      <Link to='/register' > 
                          Register
                      </Link>
                  </li>          
                  
                ) 
              }}
            /> 
            <Route
              path='/'
              exact={false}
              children={() => {            
                return (    
                          
                  <li> 
                      <Link to='/login' > 
                          Log in
                      </Link>
                  </li>
                ) 
              }}
            />
            </ul>
            

        </div>       
    
      );
      
    }
    

  }
/**
 * Show menu components
 * 
 */
  showMenus = (menus) => {
      var result = null;
      if (menus.length > 0) {
          result = menus.map((menu, index) => {
              return (
                // this.MenuLink(menu.name, menu.to, menu.exact)
                <MenuLink
                    key={index}
                    label={menu.name}
                    to={menu.to}
                    activeOnlyWhenExact={menu.exact}
                />

              );
          })
      }

      return result

  }
  
}

export default Menu;
