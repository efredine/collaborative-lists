import React, {Component} from 'react';
import fetch from 'isomorphic-fetch';
import _ from 'lodash';


class YelpSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurant: []
    };
  }

  // onSumbit(e){
  //   if (e.charCode === 13){
  //     console.log("enter pressed");
  //     const searchUrl = `/api/restaurant/${this.refs.term.value}`;
  //     this.foodSearch(searchUrl);
  //   }
  // }

  // foodSearch(term){
  //   fetch(term)
  //   .then(response => {
  //     return response.json();
  //   })
  //   .then(search => {
  //     this.setState({
  //       search: search
  //     });
  //   })
  //
  // }

  updateSearch(e){
    if(this.refs.restaurant.value==="" || this.refs.location.value === ""){
      //alert("Please enter both values");
    }
    else{
      console.log("button pressed")
      this.foodSearch(this.refs.restaurant.value, this.refs.location.value)
    }
  }

  foodSearch(restaurant, location){
    fetch(`http://localhost:8080/v2/search/${restaurant}/${location}`)
    .then(response => {
      return response.text();
    })
    .then(responseText => {
      const restaurant = JSON.parse(responseText);
      console.log("foooddd", restaurant);
       this.setState({
         restaurant: restaurant.businesses
       });
    })
  }


  render(){
    var restaurants = _.map(this.state.restaurant, (restaurant)=>{
      return <li key = {restaurant.id}>{restaurant.name} {restaurant.location.address} {restaurant.location.city}{restaurant.image_url}</li>
    })

    return(
      <div>
        <input ref = "restaurant" onChange = {(e)=>{this.updateSearch()}} type = 'text'/>
        <input ref = "location" onChange = {(e)=>{this.updateSearch()}} type = 'text' />
        <input type = 'button' value= 'search' onClick = {(e)=>{this.updateSearch()}}></input>
        {restaurants}
      </div>
    )


  }






}
export default YelpSearch
