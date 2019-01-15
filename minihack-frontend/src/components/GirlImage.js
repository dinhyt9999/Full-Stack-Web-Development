import React, { Component } from 'react';
import config from '../config';

export default class Girlimage extends Component {
  render() {
    const comments = this.props.img.comments ? 
      this.props.img.comments.map(comment => (
        <p>
          <span className = 'font-weight-bold'>{comment.createdBy.username}</span>:{" "}
          {comment.content}
        </p>
      )) 
      : '';  

    return (
      <div>
        <img 
          className = 'img-fluid' 
          src = {config.rootPath + this.props.img.imageUrl} 
          alt = {this.props.img.title} />
        <h4>{this.props.img.title}</h4>
        <p>{this.props.img.description}</p>
        {comments}
      </div>
    )
  }
}
