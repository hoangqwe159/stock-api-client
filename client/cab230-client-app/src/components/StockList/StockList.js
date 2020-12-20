import React, { Component } from 'react';



class StockList extends Component {
  render() {
    return (
        <div className="panel panel-primary">
                  <div className="panel-heading">
                  </div>
                  <div className="panel-body">
                    
                    <table id="myTable" className="table table-striped table-bordered table-hover">
                      <thead>
                        <tr>
                          
                          <th>Name</th>
                          <th>Symbol</th>
                          <th>Industry</th>
                         
                        </tr>
                      </thead>
                      <tbody>
                        {this.props.children}
                      </tbody>
                    </table>
                    
                </div>
            </div>      
    
      );

  }
  
}

export default StockList;
