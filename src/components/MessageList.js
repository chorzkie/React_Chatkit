import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import Message from './Message'

export class MessageList extends Component {
    render() {
        if (!this.props.roomID) {
            return (
                <div className="message-list">
                    <div className="join-room">
                        &larr; Choose a room to chat!
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className="message-list">
                    {this.props.messages.map((message, index) => {
                        return (
                            <Message key={index} message={message} />
                        )
                    })}
                </div>
            )
        }
    }

    componentWillUpdate() {
        const node = ReactDOM.findDOMNode(this)
        this.shouldScrollToBottom = node.scrollTop + node.clientHeight + 100 >= node.scrollHeight
    }

    componentDidUpdate() {
        if (this.shouldScrollToBottom) {
            const node = ReactDOM.findDOMNode(this)
            node.scrollTop = node.scrollHeight
        }
    }

}

export default MessageList
