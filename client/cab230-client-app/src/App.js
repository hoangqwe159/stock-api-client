import React, { Component } from 'react';
import './App.css';
import Menu from './components/Menu/Menu';
import HomePage from './pages/HomePage/HomePage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';


import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import StockListPage from './pages/StockListPage/StockListPage';
import StockDetailPage from './pages/StockDetailPage/StockDetailPage';

// import routes from './routes'
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom';



class App extends Component {
  constructor(props) {
    super(props);
    if (localStorage.getItem("token")) {
      this.state = {    
        authorized: true
      }
    } else {
      this.state = {    
        authorized: false
      }
    }
    }
    

  componentDidMount() {
    this.checkToken();
    setInterval(this.checkToken, 600000);
  }

  checkToken = () => {
    if (localStorage.getItem("token")) {
      if (new Date(JSON.parse(localStorage.getItem("token")).expiry) <= new Date()){
        localStorage.removeItem("token");
        this.setState({
          authorized: false
        })
      } else {
        this.setState({
          authorized: true
        })
      }
      
      
    } else{
      this.setState({
        authorized: false
      })
    }
  }

  setChanged=() => {
    this.setState({ authorized: !this.state.authorized });
  }

  render() {
    const routes = [
      {
          path: '/',
          exact: true,
          main: ({match, history}) => <HomePage match={match} history={history}/>
      },
      {
          path: '/stocks',
          exact: false,
          main: ({match, history}) => <StockListPage match={match} history={history}/>
  
      },     
      {
          path: '/login',
          exact: false,
          main: ({history}) => <LoginPage setChanged={this.setChanged} history={history}/>
      },
      {
          path: '/register',
          exact: false,
          main: ({history}) => <RegisterPage history={history}/>
      },
      {
          path: '/stock/:symbol/:authed',
          exact: false,
          main: ({match, history}) => <StockDetailPage match={match} history={history}/>
      },
      {
          path: '',
          exact: false,
          main: () => <NotFoundPage/>
      },
      
  
  
  ];
    return (
      <Router>
        <div> 
          <Menu 
            authorized={this.state.authorized}
            setChanged={this.setChanged}  
          />               
          <div className="container">        
            <div className="row">           

              {this.showContentMenus(routes)}
            </div>            
          </div>
        </div>
      </Router>
      
      
  
    );

  }

  showContentMenus = (routes) => {
    var result = null;
    if (routes.length > 0) {
      result = routes.map((route, index) => {
        return (<Route
          key={index}
          path={route.path}
          exact={route.exact}
          component={route.main}
          setChanged={this.setChanged}
        />);

      });
    }

    return <Switch>{result}</Switch>
  }
  
}

export default App;
