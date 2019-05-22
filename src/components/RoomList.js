import React, { Component } from 'react'

export class RoomList extends Component {

  render() {
    const orderedRooms = [...this.props.rooms].sort((a, b) => a.id > b.id)
    return (
      <div className="rooms-list">
        <ul>
          <h3>Your rooms:</h3>
          {orderedRooms.map(room => {
            const active = this.props.roomID === room.id ? "-active" : "";
            return (
              <li key={room.id} className={"room" + active}>
                <a onClick={() => {this.props.subscribeRoom(room.id)} } href="#"># {room.name}</a>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

}

export default RoomList
