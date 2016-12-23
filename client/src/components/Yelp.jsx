import React, {Component} from 'react';
import Video from 'react-video';
import { Collapse, Button, Well, ProgressBar, Glyphicon } from 'react-bootstrap';
import VoteStates from '../types/VoteStates';

class Yelp extends Component {

  constructor(...args) {
    super(...args);
    this.state = {
      open: false,
      posterOpen: true

    };
  }

  castVote = (vote) => {
    const {onVote, currentVote} = this.props;
    if(currentVote === vote) {
      onVote(VoteStates.NONE)
    } else {
      onVote(vote);
    }
  }

  voteClass(vote) {

  }

  votingEnable () {
    // current vote will be one of the following:
    // VoteStates.NONE
    // VoteStates.UP
    // VoteStates.DOWN
    const { votes, currentVote, voteCount, numberOfVotes, thumbsUpCount, thumbsDownCount } = this.props;
    const upOn = VoteStates.UP === currentVote ? "-on" + " bounce" : "";
    const downOn = VoteStates.DOWN === currentVote ? "-off" + " bounce" : "";
    if (votes === true) {
      return (
        <div>
         <div className={"voteup" + upOn}>
          <div className ="voteupcount">
           {thumbsUpCount}
          </div>
           <Glyphicon onClick={ ()=> this.castVote(VoteStates.UP) } glyph="glyphicon glyphicon-thumbs-up"/>
         </div>
         <div className={"votedown" + downOn}>
           <div className ="votedowncount">
             {thumbsDownCount}
          </div>
           <Glyphicon onClick={ ()=> this.castVote(VoteStates.DOWN) } glyph="glyphicon glyphicon-thumbs-down"/>
         </div>
        </div>
      )
    }
    else {
      return (<div>&nbsp;</div>);
    }
  }

  drop () {
    if (this.state.open === true) {
      return (
        <div className="drop">
          <Glyphicon onClick={ ()=> this.setState({ open: !this.state.open })} glyph="glyphicon glyphicon-chevron-down "/>
        </div>
      );
    }else {
      return (
        <div className="drop">
          <Glyphicon onClick={ ()=> this.setState({ open: !this.state.open })} glyph="glyphicon glyphicon-chevron-right"/>
        </div>
      );
    }
  }

  renderAddRemove() {
    const { completed } = this.props;
    if (completed === false) {
      return (
          <div className="remove">
            <img onClick={this.onRemove} className= "image" src="http://localhost:8080/images/remove.png"/>
          </div>
      );
    }
    if (completed === true) {
      return (
          <div className="undo">
            <Glyphicon onClick= {this.onClick} glyph="glyphicon glyphicon-repeat"/>
          </div>
      );
    }
     if (completed === undefined) {
        return (
            <div className="add">
              <img onClick={this.onAdd} className= "image" src="http://localhost:8080/images/add.png"/>
            </div>
      );
    }
  }


  onAdd = () => {
    const {onAdd, index} = this.props;
    onAdd(index);
  }

  onRemove = () => {
    const {onClick, index} = this.props;
    onClick();
  }

  onClick = () => {
    const {onClick, index} = this.props;
    onClick();
  }

  render() {
    const {name, location,
          image_url, is_closed, display_phone, rating,
          rating_img_url_small, review_count, snippet_text
        } = this.props.content;
    // if(isLoaded){
    //   return
    // }
    return(
      <div>
        <div className="panel-movie panel panel-default">
          <div className="panel-heading" onClick={ ()=> this.setState({ posterOpen: !this.state.posterOpen })}>
            {this.renderAddRemove()}
            <h3 className="panel-title">
              {name}
            </h3>
          </div>
          <div className="restaurant" >
              <div className="restaurant-container">
                {this.renderAddRemove()}
                <div className="restaurant-img"> <img src={image_url}/> </div>
                <div className= "restaurant-info-image"><h6 className="restaurant-name">{name}</h6> {rating} <img src ={rating_img_url_small}/></div>
                <span className="restaurant-review">{review_count} Reviews</span>
                <div className = "restaurant-info" >
                  <span>is closed:{is_closed}</span>
                  <div className = "restaurant-address">{location.address} {location.city}<p>{display_phone}</p> </div>
                  <div className="restaurant-people-review">{snippet_text}</div>
                </div>
              </div>
          </div>
          <div>
            <div>
            {/* <Collapse in={this.state.posterOpen}>

            </Collapse> */}
               {this.drop()}
               {this.votingEnable()}
              {/* <Collapse in={this.state.open}>
                <div>
                 <ProgressBar bsStyle="danger" active now={vote_average * 10} label={`${vote_average} / 10 Average Rating`}/>
                </div>
              </Collapse> */}
            </div>
          </div>
        </div>
      </div>
  );
  }
}
export default Yelp;
