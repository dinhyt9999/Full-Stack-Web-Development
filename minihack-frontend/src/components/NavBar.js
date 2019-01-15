import React, { Component } from 'react'
import SearchField from './SearchField';
import ProfilePanel from './ProfilePanel';

export default class NavBar extends Component {
  render() {
    return (
      <div className='navbar'>
        <div className='container'>
          <SearchField onSearchChanged = {this.props.onSearchChanged}/>
          {/* <div className = 'col-6 text-center'>
            {this.props.img.length > 0 ? this.props.img[0].description : ""}
          </div> */}
          <ProfilePanel onLogin = {this.props.onLogin} username = {this.props.username} />
        </div>
      </div>
    )
  }
}
