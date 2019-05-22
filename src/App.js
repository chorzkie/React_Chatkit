import React, { Component } from 'react'
import MessageList from './components/MessageList'
import NewRoomForm from './components/NewRoomForm'
import RoomList from './components/RoomList'
import SendMessageForm from './components/SendMessageForm'

import { tokenUrl, instanceLocator } from './config'
//import Chatkit from '@pusher/chatkit-client'
import { ChatManager, TokenProvider } from '@pusher/chatkit-client'

export class App extends Component {

  constructor() {
    super()
    this.state = {
      roomId: null,
      messages: [],
      joinableRooms: [],
      joinedRooms: [],
    }

    this.sendMessage = this.sendMessage.bind(this)
    this.subscribeToRoom = this.subscribeToRoom.bind(this)
    this.getRooms = this.getRooms.bind(this)
    this.createNewRoom = this.createNewRoom.bind(this)
  }

  render() {
    return (
      <div className="app">
        <RoomList
          roomID={this.state.roomId}
          subscribeRoom={this.subscribeToRoom}
          rooms={[...this.state.joinedRooms, ...this.state.joinableRooms]}
        />
        <MessageList
          roomID={this.state.roomId}
          messages={this.state.messages}
        />
        <SendMessageForm
          disabled={!this.state.roomId}
          sendMessage={this.sendMessage}
        />
        <NewRoomForm
          createRoom={this.createNewRoom}
        />
      </div>
    )
  }

  componentDidMount() {
    const chatManager = new ChatManager({
      instanceLocator: instanceLocator,
      userId: 'chorzkie',
      tokenProvider: new TokenProvider({
        url: tokenUrl
      }),
    })

    chatManager.connect()
      .then(currentUser => {
        this.currentUser = currentUser
        this.getRooms()
      })
  }

  sendMessage(text) {
    this.currentUser.sendMessage({
      text: text,
      roomId: this.state.roomId
    })
      .catch(error => console.log('Error on sending message; ', error));
  }

  subscribeToRoom(roomID) {
    this.setState({ messages: [] })
    this.currentUser.subscribeToRoomMultipart({
      roomId: roomID,
      messageLimit: 50,
      hooks: {
        onMessage: message => {
          //console.log('message.text: ', message.parts[0].payload.content)
          this.setState({
            messages: [...this.state.messages, message]
          })
        }
      }
    })
      .then(room => {
        this.setState({ roomId: room.id })
        this.getRooms()
      })
      .catch(err => console.log('Error on connecting to room; ', err))
  }

  getRooms() {
    this.currentUser.getJoinableRooms()
      .then(joinableRooms => {
        this.setState({
          joinableRooms: joinableRooms,
          joinedRooms: this.currentUser.rooms
        })
      })
      .catch(err => console.log('Error on getting joinable rooms; ', err))
  }

  createNewRoom(roomName) {
    this.currentUser.createRoom({
      name: roomName,
      private: true,
    })
      .catch(err => console.log('Error on creating room; ', err))
  }

}

export default App