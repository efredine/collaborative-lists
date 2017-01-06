import React, {Component} from 'react';
import Video from 'react-video';
import { Collapse, Button, Well, ProgressBar, Glyphicon } from 'react-bootstrap';
import VoteStates from '../types/VoteStates';

class Yelp extends Component {

  constructor(...args) {
    super(...args);
    this.state = {
      open: true
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
        <div className="restaurant-footer">
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

  renderAddRemove() {
    const { completed } = this.props;
    if (completed === false) {
      return (
          <div className="remove">
            <Glyphicon onClick= {this.onClick} glyph="glyphicon glyphicon-remove"/>
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
          image_url, display_phone, rating,
          rating_img_url_small, review_count, snippet_text, url, snippet_image_url
        } = this.props.content;

    return(
      <div>
        <div className="panel-movie panel panel-default">
          <div className="panel-heading-resturaunt" onClick={ ()=> this.setState({ open: !this.state.open })}>
            {this.renderAddRemove()}
            <h3 className="panel-title">
              {name}
            </h3>
          </div>
          <div className = "panel-body">
            <div className="restaurant" >
              <Collapse in={this.state.open}>
                <dl className="dl-horizontal">
                  <dt>
                    <img className="poster-image" src={image_url}/>
                  </dt>
                  <dd>
                    <div> {rating} <img src ={rating_img_url_small}/>
                    &nbsp;{review_count}&nbsp;<a href = {url} target="_blank">Reviews</a>
                    </div>
                    <p>{location.address} {location.city}<br/>
                    {display_phone}</p>
                  </dd>
                  <dt className="restaurant-reviewer">
                    <img src={snippet_image_url}/>
                  </dt>
                  <dd>
                    <p>{snippet_text}</p>
                  </dd>
                </dl>
              </Collapse>
            </div>
            <div>
              {this.votingEnable()}
            </div>
          </div>
        </div>
      </div>
  );
  }
}
export default Yelp;
