import React, {Component} from 'react';

class Layout extends Component {


  render() {
    return (


    <div>

    <nav className="navbar navbar-default navbar-fixed-top">
  <div className="container-fluid">
    <div className="navbar-header">
    <h2> Lists! </h2>
    </div>
  </div>
</nav>
<div className="panel-container">
  <div className="panel panel-default">
    <div className="panel-heading">
      <h3 className="panel-title"><img className="certified" src="http://localhost:8080/images/certified.png"/>85% ROGUE ONE: A STAR WARS STORY (2016)</h3>
    </div>
  <div className="panel-body">
  Rating: PG-13 | Genre: Action & Adventure  | Runtime: 133 minutes  | Directed By: Gareth Edwards
  </div>
</div>

<div className="panel panel-default">
    <div className="panel-heading">
      <h3 className="panel-title"><img className="rotten" src="http://localhost:8080/images/rotten.png"/>26% SUICIDE SQUAD (2016)</h3>
    </div>
  <div className="panel-body">
    Rating: R | Genre: Action | Runtime: 141 minutes  | Directed By: David Eyers
  </div>
</div>

<div className="panel panel-default">
    <div className="panel-heading">
      <h3 className="panel-title"><img className="fresh" src="http://localhost:8080/images/fresh.png"/>77% COLLATERAL BEAUTY (2016)</h3>
    </div>
  <div className="panel-body">
    Rating: PG | Genre: Romance | Runtime: 109 minutes  | Directed By: Bob Guy
  </div>
</div>

<div className="panel panel-default">
    <div className="panel-heading">
      <h3 className="panel-title"><img className="certified" src="http://localhost:8080/images/certified.png"/>88% SOLACE (2016)</h3>
    </div>
  <div className="panel-body">
    Rating: R | Genre: Horror | Runtime: 133 minutes  | Directed By: Bill Dude
  </div>
</div>

<div className="panel panel-default">
    <div className="panel-heading">
      <h3 className="panel-title"><img className="rotten" src="http://localhost:8080/images/rotten.png"/>21% DONT THINK TWICE (2016)</h3>
    </div>
  <div className="panel-body">
    Rating: PG:13 | Genre: Comedy | Runtime: 141 minutes  | Directed By: Guy Car
  </div>
</div>
</div>

</div>
    );
  }
}
export default Layout;
