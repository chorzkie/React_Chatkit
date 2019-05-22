import React, { Component } from 'react'

export class SendMessageForm extends Component {

  constructor() {
    super()
    this.state = {
      message: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange = (e) => {
    this.setState({ message: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.sendMessage(this.state.message);
    this.setState({ message: '' });
  }

  render() {
    //console.log(this.state.message)
    return (
      <form onSubmit={this.handleSubmit} className="send-message-form">
        <input
          disabled={this.props.disabled}
          type="text"
          placeholder="Type your message here and hit ENTER"
          onChange={this.handleChange}
          value={this.state.message}
        />
      </form>
    )
  }
}

export default SendMessageForm
