import React, { Component } from 'react';

import moment from 'moment';


class Description extends Component {
/**
 * Return index of maximum volume in array
 * @param {string} arr - Array of data
 */
  indexOfMax = (arr) => {
    if (arr.length === 0) {
        return -1;
    }    
    var max = arr[0];
    var maxIndex = 0;    
    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }

    return maxIndex;
  }
/**
 * Return index of minimum volume in array
 * @param {string} arr - Array of data
 */
  indexOfMin = (arr) => {
    if (arr.length === 0) {
        return -1;
    }    
    var min = arr[0];
    var minIndex = 0;    
    for (var i = 1; i < arr.length; i++) {
        if (arr[i] < min) {
            minIndex = i;
            min = arr[i];
        }
    }

  return minIndex;
}
  render() {
    var {data, title} = this.props;
    var date = [];
    var volume = [];
    var trend;
    data.map((d, index) => {
        date[index] = Object.values(d)[0];
        volume[index] =  Object.values(d)[1];
        return null;
    })

    var indexMax = this.indexOfMax(volume);
    var indexMin = this.indexOfMin(volume);
    var dateMin = moment(date[indexMin]).format('MM/DD/YYYY');
    var dateMax = moment(date[indexMax]).format('MM/DD/YYYY');

    if (volume[0] > volume[volume.length - 1]) {
      trend = "increase"
    } else {
      trend = "decrease"
    }

    var from = moment(date[date.length - 1]).format('MM/DD/YYYY');
    var to =moment(date[0]).format('MM/DD/YYYY'); 

    if (data.length >= 2) {
      return (    
        <div className="panel panel-info">
              <div className="panel-heading">
                    <h3 className="panel-title"> The brief description for {title}</h3>
              </div>
              <div className="panel-body">
                <li className="des">From {from} to {to}, the closing price of {title} witnessed a noticeable {trend}.</li>
                <li className="des">It reached a peak of {volume[indexMax]} in {dateMax}.</li>
                <li className="des">It fell to a low of only {volume[indexMin]} in {dateMin}.</li>
              </div>
        </div>
        
         
        );
    } else {
      return (
        <div></div>
      );
    }
    

  }
  
}

export default Description;
