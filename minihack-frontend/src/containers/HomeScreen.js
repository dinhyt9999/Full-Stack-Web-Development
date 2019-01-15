import React, { Component } from 'react'
import axios from '../axios';
import NavBar from '../components/NavBar';
import MainContent from '../components/MainContent';

export default class HomeScreen extends Component {
  state = {
    images: [],
    searchString: ""
  };
  componentDidMount = () => {
    axios
      .get("/api/images")
      .then(data => 
          this.setState({
          images: data.data,
        })
      )
      .catch(err => console.log(err));
    }
      
  _onSearchChanged = text => this.setState({ searchString: text});
    
  render() {
    const displayedImages = this.state.images.filter(img => 
      img.title.includes(this.state.searchString) || 
      img.description.includes(this.state.searchString)
    );
    console.log(this.state.images);
    return (
      <div>
        <NavBar 
          img = {this.state.images}
          onSearchChanged = {this._onSearchChanged} 
          onLogin = {this.props.onLogin} 
          username = {this.props.username} />
        <MainContent images = {displayedImages} />
      </div>
    )
  }
}
