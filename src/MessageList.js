import React, { Component} from "react";
import axios from 'axios';
import ReactDOM from 'react-dom'

class MessageList extends Component {
  constructor (propos) {
    super(propos)

    {/* bind context to methods */}

    this.handleAdd = this.handleAdd.bind(this);
    this.onChange = this.onChange.bind(this);
    {/* created API using mockapi */}
    this.UrlApi = "http://5cb8dd281551570014da432b.mockapi.io/api/messages/v1/messages",

  this.state = {
    messages: [],
    messageInput: "",
    selectedOption: "public"
  }
}

componentDidMount() {
  axios.get(this.UrlApi)
  .then(res => {
    const messages= res.data;
    this.setState({ messages });
  })
}

/**
 * Handle form input field changes & update the state
 */
handleAdd() {
  const toInsert = {message: this.state.messageInput, status: this.state.selectedOption}
  axios.post(this.UrlApi, toInsert)
  .then((res) => {
   this.state.messages.push(res.data);
   this.setState({data: this.state.data, messageInput: "", selectedOption: ""});
 });
}

/**
 * Form submit handler
 */
onChange(event) {
  let {name: fieldName, value} = event.target;
  console.log(event.target.name, event.target.value)
  this.setState({
    [fieldName]: value
  });
}

  render() {
    return(
      <div className="row">
      <div className="message-list col-md-8 col-sm-6">
      {this.state.messages.map((detail, index) =>
          <div className="card-body msg-card-body " key={index}>
          {detail.status ==="public" ?
            <div className="d-flex justify-content-start">
              <div className="msg-container">
              {detail.message}
                <span className="msg-time">
                  9:12 AM, Today
                </span>
              </div>
            </div>
             :<p>private</p> }
          </div>
        )}
        </div>
        <div className= "col-md-4 col-sm-6 user-input">
          <textarea name="messageInput"
            value={this.state.messageInput}
            onChange={this.onChange}
            placeholder="Type your message..."
            cols="30" rows="5">
          </textarea>
          <br/><br/>
          {/*If private selected, message is hidden else message is visible*/}
          <input className="radio-btn" type="radio"
              name="selectedOption"
              value= "private"
              onChange={this.onChange}
              checked={this.state.selectedOption === "private"} />
              <label>Private</label>
          <input className="radio-btn" type="radio"
              name="selectedOption"
              value= "public"
              onChange={this.onChange}
              checked={this.state.selectedOption === "public"} />
              <label>Public</label>
              <br/>
              <br/>
          <button className="action-menu-btn" onClick={this.handleAdd} type="submit">Add</button>
          </div>
        </div>
    );
  }
}
export default MessageList;
