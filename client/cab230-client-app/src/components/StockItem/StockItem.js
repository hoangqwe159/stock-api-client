import React, { Component } from 'react';



class StockItem extends Component {

 

  render() {
    var {stock} = this.props;

    return (
      <tr>
        
        <td>{stock.name}</td>
        <td>{stock.symbol}</td>
        <td>{stock.industry}</td>
       
      </tr>
      );

  }
  
}

export default StockItem;
