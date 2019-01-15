import React, { Component } from 'react'

export default class ProfilePanel extends Component {
  render() {
    const display = this.props.username ? (
      <div>
        <span className = "navbar-text">Welcome, {this.props.username}</span>
      </div>
    ) : (
      <button
        className = "btn btn-primary btn-block"
        onClick = {this.props.onLogin}
      >
        Login
      </button>
    )
    return (
      <div className = 'col-3 profile_panel'>
        {display}
      </div>
    )
  }
}
