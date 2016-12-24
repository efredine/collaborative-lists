import React, {Component} from 'react';
import fetch from 'isomorphic-fetch';
import _ from 'lodash';
import Yelp from '../components/Yelp.jsx'
import { connect } from 'react-redux'
import { addYelp} from '../actions';


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
  //
  click = index => {
    const { addYelp } =  this.props;
    const restuarantSelected = this.state.restaurant[index];
    addYelp(restuarantSelected);
    const updatedRestaurants = this.state.restaurant.slice();
    updatedRestaurants.splice(index, 1);
    this.setState({
      restaurant: updatedRestaurants
    })
  }

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
    var restaurants = _.map(this.state.restaurant, (restaurant, index)=>{
      return <Yelp key = {restaurant.id} content = {restaurant} votes={false} index={index} onAdd={this.click} />
    })

    return(
      <div>
          <form>
            <div className="form-group">
              <input ref = "restaurant" onChange = {(e)=>{this.updateSearch()}} type = 'text' className="form-control" placeholder = "Restaurant" />
            </div>
            <div className= "form-group">
              <input ref = "location" onChange = {(e)=>{this.updateSearch()}} type = 'text' className="form-control" placeholder= "Location"/>
            </div>
            <button type = 'button' value= 'search' className="btn btn-default" onClick = {(e)=>{this.updateSearch()}}>Submit</button>
          </form>
          {restaurants}

      </div>
    )

  }

}

const mapDispatchToProps =  ({
  addYelp: addYelp
})

export default connect(null, mapDispatchToProps)(YelpSearch);
