import React, { Component } from 'react';
import callApi from './../../utils/apiCaller';
import BootstrapTable from 'react-bootstrap-table-next';

import paginationFactory from 'react-bootstrap-table2-paginator'; 
import {  
  Route,
  Link  
} from "react-router-dom";




class StockListPage extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      stocks : [],
      industry: '',
      columns: [
        {
          dataField: 'name',
          text: 'Name',
          sort: true
          
        },
        {
          dataField: 'symbol',
          text: 'Symbol',
          
        },
        {
          dataField: 'industry',
          text: 'Industry',
          sort: true,
         
        },
        {
          dataField: 'actions',
          text: 'Actions',
          isDummyField: true,
          csvExport: false,
          formatter: this.actionsFormatter,
        }
      
      
      ],
      token: localStorage.getItem("token"),
      
    };
  }


  componentDidMount() {
    this._isMounted = true;
    callApi('stocks/symbols', 'GET', null).then(res => {    
        if (this._isMounted) {
          this.setState({
            stocks: res.data,
            mytext: this.props.match.params.id
          })
        }
      }).catch((error) => {
        alert("Cannot load data")        
      });
        
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
/**
 * Create "See stock details" button
 */
  actionsFormatter = (cell, row) => {
    
  var {token} = this.state;
  if (token !== null) {
    return(
      <Route
          path={`/stock/${row.symbol}/authed`}
          exact={false}
          children={() => {            
             
                return (  
                  <Link to={`/stock/${row.symbol}/authed`} type="button" id={row.id} className="btn btn-info mb-1">
                  See stock details
                  </Link>                
                ) 
          }}
        />  
    );

  }
  return(
    <Route
        path={`/stock/${row.symbol}/unauthed`}
        exact={false}
        children={() => {
              return ( 
                <Link to={`/stock/${row.symbol}/unauthed`} type="button" id={row.id} className="btn btn-info mb-1">
                See stock details
                </Link>
              ) 
        }}
    />  
  );
  
  }



/**
 * Search button
 */
  onSearch = () => {

    var industry = document.getElementById("inputStock").value;
  
    if(industry !== "" && industry !== "All industries") {
      callApi(`stocks/symbols?industry=${industry}`, 'GET', null).then(res => {          
        if (res !== undefined) {  
          this.setState({
            stocks: res.data
        })
        } else {
          alert("The industry not found!");
          
        }
      }).catch((error) =>{
        console.log(error);
        
        
      })
    } else {
    
      
      callApi(`stocks/symbols`, 'GET', null).then(res => {    
        this.setState({
            stocks: res.data
        })
   
      });
    }
    
  }
/**
 * Select industry to search
 */
  selectIndustry = (i) => {

   document.getElementById('inputStock').value = "" + i; 
    
    
  }

  render() { 

    var {stocks, mytext} = this.state;

    console.log(stocks);
    
    return (
      <div className="container">  
        <div> 
          {mytext}
        </div>
        <label>Industry:</label> 
        <div className="input-group row pd-15">
          <input id="inputStock" className="form-control " type="text"  placeholder="Search" name="q"/>
          <div className="input-group-btn">
            <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <span id="mydropdowndisplay">Select industry</span> 
              <span className="caret"></span>
            </button>
            <ul className="dropdown-menu" id="mydropdownmenu">
            <li><a onClick={() => this.selectIndustry('All industries')} href="#">All industries</a></li>
              <li><a onClick={() => this.selectIndustry('Health Care')} href="#">Health Care</a></li>
              <li><a onClick={() => this.selectIndustry('Industrials')} href="#">Industrials</a></li>
              <li><a onClick={() => this.selectIndustry('Consumer Discretionary')} href="#">Consumer Discretionary</a></li>
              <li><a onClick={() => this.selectIndustry('Information Technology')} href="#">Information Technology</a></li>
              <li><a onClick={() => this.selectIndustry('Consumer Staples')} href="#">Consumer Staples</a></li>
              <li><a onClick={() => this.selectIndustry('Utilities')} href="#">Utilities</a></li>
              <li><a onClick={() => this.selectIndustry('Financials')} href="#">Financials</a></li>
              <li><a onClick={() => this.selectIndustry('Real Estate')} href="#">Real Estate</a></li>
              <li><a onClick={() => this.selectIndustry('Materials')} href="#">Materials</a></li>
              <li><a onClick={() => this.selectIndustry('Energy')} href="#">Energy</a></li>
              <li><a onClick={() => this.selectIndustry('Telecommunication Services')} href="#">Telecommunication Services</a></li>
            </ul>
            <input type="hidden" id="mydropwodninput" name="category"/>              
          </div>         
          
          <button type="button" className="btn btn-success col-xs-4" onClick={this.onSearch}  >Search</button>
        

        </div>

          
          
        
       
      
                               
    
        <div  style={{ marginTop: 20 }}>
          <BootstrapTable
            striped
            hover  
            keyField='symbol'
            data={ stocks }  
            columns={ this.state.columns } 
            pagination={paginationFactory()}            
          />       
        </div>  

 
        

      </div>  
    );

  }  
}



export default StockListPage;
