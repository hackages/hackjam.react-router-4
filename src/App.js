import React, { Component } from 'react';
import { BrowserRouter as Router, Link, NavLink, Route, Switch } from 'react-router-dom';
import { Books } from './Components/Books';
import { BookDetail } from './Components/Bookdetail';
import { Dashboard } from './Components/Dashboard';
import { TopSecretComponent } from './Components/TopSecretComponent';
import { ProtectedRoute } from './hor/ProtectedRoute';
import { fakeAuth } from './fakeAuth';
import { AccessDenied } from './Components/AccessDenied';
import Logo from './logo_w.svg';
import './Routing.css';

export class App extends Component {
  state = {
    authenticated: false,
  };

  componentDidMount() {
    fakeAuth
    .subscribe(authenticated => this.setState({authenticated}));
  }

  render() {
    return (
      <Router>
        <div>
          <nav>
            <div className="nav-wrapper">
              <Link className="brand-logo hide-on-med-and-down" to="/"><img alt="" src={Logo} width="55"/></Link>
              <ul className="right">
                <li><NavLink activeClassName={"activeLink"} to="/dashboard">Books</NavLink></li>
                <li><NavLink activeClassName={"activeLink"} to="/books">Manage Books</NavLink></li>
                <li><NavLink activeClassName={"activeLink"} to="/secret">Top Secret Page</NavLink></li>
                <li><a onClick={fakeAuth.toggle}>{this.state.authenticated ? 'Log out' : 'Log in'}</a></li>
              </ul>
            </div>
          </nav>

          <div className="container">
            <Switch>
              <Route exact path="/" component={Dashboard}/>
              <Route path="/dashboard/:name?" component={Dashboard}/>
              <Route path="/books" component={Books}/>
              <Route path="/access-denied" component={AccessDenied}/>
              <ProtectedRoute loggedIn={this.state.authenticated} path="/secret" component={TopSecretComponent}/>
              <Route path="/:id" component={BookDetail}/>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}
