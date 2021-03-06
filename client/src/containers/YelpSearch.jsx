import React, {Component} from 'react';
import fetch from '../utils/fetch';
import _ from 'lodash';
import Yelp from '../components/Yelp.jsx'
import { connect } from 'react-redux'
import { addYelp} from '../actions';
import { Button, Navbar, Nav, NavItem, NavDropdown, Form, FormGroup, FormControl } from 'react-bootstrap';
import FlipMove from 'react-flip-move';


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
    fetch(`https://ipinfo.io/json`)
    .then(response => {
      return response.json();
    })
    .then(ipAddress => {
      this.setState({
        clientIp: ipAddress.city
      })
      fetch(`/api/v2/search/restaurant/${that.state.clientIp}`)
      .then(response => {
        return response.json();
      })
      .then(restaurant => {
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

  submitHandler = e => {
    e.preventDefault();
    const searchTerm = this.refs.restaurant.value;
    if(!searchTerm === ""){
    }
    else{
      const location = this.refs.location.value;
      this.foodSearch(searchTerm, location === "" ? this.state.clientIp : location);
    }
  }

  foodSearch(restaurant, location){
    this.setState({
      restaurant:[]
    });
    fetch(`/api/v2/search/${restaurant}/${location}`)
    .then(response => {
      return response.text();
    })
    .then(responseText => {
      const restaurant = JSON.parse(responseText);
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
          <Form inline onSubmit={this.submitHandler}>
            <div className="form-group">
              <input ref = "restaurant" type = 'text' className="form-control input-sm" placeholder = "Restaurant" />
            </div>
            <div className= "form-group">
              <input ref = "location" type = 'text' className="form-control input-sm" placeholder = {this.state.clientIp}/>
            </div>
            <Button type = 'submit' value= 'search' className="btn btn-sm">Submit</Button>
          </Form>
          <FlipMove>
            {restaurants}
          </FlipMove>
      </div>
    )

  }
}

const mapDispatchToProps =  ({
  addYelp: addYelp
})

export default connect(null, mapDispatchToProps)(YelpSearch);
