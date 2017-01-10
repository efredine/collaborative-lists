import React, {Component} from 'react';
import fetch from 'isomorphic-fetch';
import _ from 'lodash';
import Yelp from '../components/Yelp.jsx'
import { connect } from 'react-redux'
import { addYelp} from '../actions';
import { Button, Navbar, Nav, NavItem, NavDropdown, Form, FormGroup, FormControl } from 'react-bootstrap';


class YelpSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurant: [],
      clientIp: ''
    };
  }

  componentWillMount(){
    const that = this;
    fetch(`http://ipinfo.io/json`)
    .then(response => {
      return response.text();
    })
    .then(responseText => {
      const ipAddress = JSON.parse(responseText);
      this.setState({
        clientIp: ipAddress.city
      })
      fetch(`http://localhost:8080/v2/search/term/${that.state.clientIp}`)
      .then(response => {
        return response.text();
      })
      .then(responseText => {
        const restaurant = JSON.parse(responseText);
         this.setState({
           restaurant: restaurant.businesses
         });
      })
    })
  }


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
    if(this.refs.restaurant.value === "" || this.refs.location.value === ""){
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
          <Form inline>
            <div className="form-group">
              <input ref = "restaurant" onChange = {(e)=>{this.updateSearch()}} type = 'text' className="form-control input-sm" placeholder = "Restaurant" />
            </div>
            <div className= "form-group">
              <input ref = "location" onChange = {(e)=>{this.updateSearch()}} type = 'text' className="form-control input-sm" placeholder = {this.state.clientIp}/>
            </div>
            <Button type = 'submit' value= 'search' className="btn btn-sm" onClick = {()=>{this.updateSearch()}}>Submit</Button>
          </Form>
          {restaurants}

      </div>
    )

  }
}

const mapDispatchToProps =  ({
  addYelp: addYelp
})

export default connect(null, mapDispatchToProps)(YelpSearch);
