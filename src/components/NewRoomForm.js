import React, { Component } from 'react'

export class NewRoomForm extends Component {

  constructor() {
    super()
    this.state = {
      roomName: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange = (e) => {
    this.setState({ roomName: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.createRoom(this.state.roomName);
    this.setState({ roomName: '' });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="new-room-form">
        <input
          type="text"
          placeholder="Type new room name"
          onChange={this.handleChange}
          value={this.state.roomName}
          required />
          <button 
            id="create-room-btn" 
            type="submit">
              <h2>+</h2>
          </button>
      </form>
    )
  }

}

export default NewRoomForm
