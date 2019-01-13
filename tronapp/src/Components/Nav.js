import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Nav extends Component {
      render(){
          return (
             <nav className="navbar is-link" aria-label="main navigation">
                 <div className="navbar-brand">
                     <a className="navbar-item" href="#">
                         <strong><i className="fa fa-coins"></i> {this.props.appName}</strong>
                     </a>

                     <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false">
                         <span aria-hidden="true"></span>
                         <span aria-hidden="true"></span>
                         <span aria-hidden="true"></span>
                     </a>
                  </div>
                  <div className="navbar-menu">
                      <div class="navbar-start">
                          <Link class="navbar-item" to="/">
                          Asserts
                          </Link>
                          <Link class="navbar-item" to="/customer">Customer</Link>

                          <Link class="navbar-item" to="/merchant">
                          Merchant
                          </Link>

                      </div>
                  </div>

              <div className="navbar-end">
                         <a className="navbar-item">
                             <div className="tags has-addons">
                                 <span className="tag">
                                 <i className="fa fa-signal"></i> &nbsp; Network
                                                                </span>
                                 <span className="tag is-danger">{this.props.network}</span>
                             </div>
                         </a>
                     </div>

             </nav>
         )
     }
 }

export default Nav;
