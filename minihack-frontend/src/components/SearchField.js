import React, { Component } from 'react'

export default class SearchField extends Component {
  _handleTextChange=event => this.props.onSearchChanged(event.target.value)
  render() {
    return (
      <form className = 'col-3'>
        <input onChange={this._handleTextChange} className = 'form-control' type = 'text' pladeholder = 'Search'/>
      </form>
    )
  }
}
