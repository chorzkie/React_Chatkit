import React from 'react'

export default function Message(props) {
  return (
    <div className="message">
      <div className="message-username">{props.message.senderId}</div>
      <div className="message-text">{props.message.parts[0].payload.content}</div>
    </div>
  )
}