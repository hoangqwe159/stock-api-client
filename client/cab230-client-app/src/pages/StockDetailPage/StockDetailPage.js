import React, { Component } from 'react';
import  {callAuthedAPI} from '../../utils/apiCaller';

import BootstrapTable from 'react-bootstrap-table-next';
import { LineChart } from 'react-chartkick';
import 'chart.js';
import moment from 'moment';

import paginationFactory from 'react-bootstrap-table2-paginator'; 
import Description from '../../components/Description/Description';

class StockDetailPage extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    
    this.state = {
      stock : [],
      stocks: [],
      symbol: '',
      isAuthed: '',
      columns: [
        {
          dataField: 'timestamp',
          text: 'Timestamp',
          sort: true
          
        },
        
        {
          dataField: 'open',
          text: 'Open',
          sort: true
         
        },
        {
          dataField: 'high',
          text: 'High',
          sort: true
         
        },
        {
          dataField: 'low',
          text: 'Low',
          sort: true
         
        },
        {
          dataField: 'close',
          text: 'Close',
          sort: true
         
        },
        {
          dataField: 'volumes',
          text: 'Volumes',
          sort: true
         
        },
        
      
      ]
      
      
    };
  }
  
/**
 * Convert string to date
 * @param {string} string - String of date
 */

  formatDate=(string)=>{
    var options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return new Date(string).toLocaleDateString([],options);
  } 

  componentDidMount() {
    this._isMounted = true;
    var url = new URL(window.location.href);
    var from = url.searchParams.get("from");
    var  to = url.searchParams.get("to");
    if (this._isMounted) {
      this.setState({
        symbol: this.props.match.params.symbol,
        isAuthed: this.props.match.params.authed,
        from: url.searchParams.get("from")  ,
        to: url.searchParams.get("to")
      })
    }
    
    
    
    

    if(!localStorage.getItem("token")){   
      callAuthedAPI(`/stocks/${this.props.match.params.symbol}`, 'GET', null).then(res => {
        res['timestamp'] = moment(Object.values(res)[0]).format('MM/DD/YYYY');
        if (this._isMounted) {
          this.setState({
              stocks: [res]
              
          });       
        }
   
      });
    
    } else {
     
      if (from === null) {
        callAuthedAPI(`/stocks/${this.props.match.params.symbol}`, 'GET', null).then(res => {
       
          res['timestamp'] =moment(Object.values(res)[0]).format('MM/DD/YYYY');
          if (this._isMounted) {
          this.setState({
              stocks: [res]
              
          });       
        }
     
        });
      } else {
        callAuthedAPI(`/stocks/authed/${this.props.match.params.symbol}?from=${from}&to=${to}`, 'GET', null).then(res => {
         
          if (!res.error){
            res.map((r, index) =>{
              res[index]['timestamp'] = moment(Object.values(r)[0]).format('MM/DD/YYYY');  
              if (this._isMounted) {      
                this.setState({
                  stocks: res
                  
                });  
              };
              return null;
            })  
          } else {
           
            
          }
        });
      }
      




    }
    
    
    
  }

 

  componentWillUnmount() {
    this._isMounted = false;
  }
  render() { 
    console.log("1");
    
    var {from, to, stocks, isAuthed} = this.state;
    const x = this.state.stocks[0];
    var chartDate = [];
    var chartVolume = [];
    if (x !== undefined){
      var title = Object.values(x)[2] + ' - ' + Object.values(x)[1] ;
      
    }
    
    if (isAuthed === "authed") {
      
     
      stocks.map((stock, index) => {
        
        chartDate[index] = new Date((Object.values(stock)[0]));
        chartVolume[index] = (Object.values(stock)[7]);
        return null;
      })
      
      var data = [];
      var close;

      chartDate.map((c, index) => {
        data[index] = [chartDate[index], chartVolume[index]]
        return null;
      })

      if (data.length === 0){
        close ="";
      } else {
        close = "Closing Price"
      }

    
      return (        
        <div className="container mb-100">  
          <div className="mb-20"> 
            {title }
          </div>          
          
          <form onSubmit={this.handleSubmit}>
            <label  htmlFor="from">From:
              <input type="date" name="from" defaultValue={from} required pattern="\d{4}-\d{2}-\d{2}"/>
              <span className="validity"></span>
            </label>

            <label htmlFor="to">To:
              <input type="date" name="to" defaultValue={to} required pattern="\d{4}-\d{2}-\d{2}"/>
              <span className="validity"></span>
            </label>
            
            <span className="span">
              <button className="btn btn-success ml-20" >Search</button>
            </span>           
            
          </form>
                    
          

          <div className="mt-20">  
            <BootstrapTable
              striped
              hover  
              keyField='timestamp'
              data={ stocks }  
              columns={ this.state.columns} 
              pagination={paginationFactory()}
            /> 
          </div>
          
          
          <div className="row">
            <div className="col-md-4 text-center"></div>
              <div className="col-md-4 text-center chart-label">{close}</div>              
          </div>        
          
          <LineChart className="mb-100" messages={{empty: "No data"}}  xtitle="Date" ytitle="Volume" data={data} /> 
          <Description data={data} title = {title}></Description>

        </div>  
        );

    } else {

      return (        
        <div className="container">  
          <div> 
            {title }
          </div>
            <div  style={{ marginTop: 20 }}>  
            <BootstrapTable
              striped
              hover  
              keyField='timestamp'
              data={ stocks }  
              columns={ this.state.columns } 
            /> 
          </div>               
        </div>  
        );
    }
    
  }
}



export default StockDetailPage;
