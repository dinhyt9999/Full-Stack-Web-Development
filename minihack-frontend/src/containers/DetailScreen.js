import React, { Component } from 'react';
import axios from '../axios';
import GirlImage from '../components/GirlImage';
import NavBar from '../components/NavBar';

export default class DetailScreen extends Component {
    state = {};

    componentDidMount = () => {
        axios
            .get(`http://localhost:6969/api/images/${this.props.match.params.imageId}`)
            .then(data => {
                this.setState({
                    image: data.data,
                });
            }
            )
            .catch(err => console.log(err));
    }
    render() {
        console.log(this.state)
        return (
            <div>
                <NavBar 
                    img = {this.state.images} 
                    onSearchChanged = {this._onSearchChanged} 
                    onLogin = {this.props.onLogin} username = {this.props.username} 
                />
                <div className = 'main_content container'>
                    <div className = 'row'>
                        <div className = 'col-8 mr-auto ml-auto'>
                            {this.state.image ? <GirlImage img = {this.state.image} /> : ""}
                        </div>
                    </div> 
                </div>
            </div>
        )
    }
}
