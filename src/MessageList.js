import React, { Component} from "react";
import axios from "axios";
import ReactDOM from "react-dom";

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
  const toInsert = {message: this.state.messageInput,
                    sender_picture: "http://downloadicons.net/sites/default/files/women-business-user-icon-44928.png",
                    sender: "Supreeti",
                    status: this.state.selectedOption}
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
  this.setState({
    [fieldName]: value
  });
}

  render() {
    return(
      <div>
      <h2> Messages </h2>
      {this.state.messages.map((detail, index) => {
      return (
      <article className="card"  key={index}>
      {detail.status ==="public" ?
      <div>
      <span className="sender-img">
      <img src={detail.sender_picture} />
      </span>
      <span className="sender-text">
        <h2 className="card-sender">{detail.sender}</h2>
        <br/>
        <h3 className="card-message">{detail.message}</h3>
      </span>
      </div>
      :<p>private</p>
    }
      </article>
      )
    })
  }
  <div className= "user-input">
    <input type="text" autoComplete="off" className= "type-input"
      name="messageInput"
      value={this.state.messageInput}
      onChange={this.onChange}
      placeholder="Type your message..."/>
    <br/><br/>
    {/*If private selected, message is hidden else message is visible*/}

    <label className="radio-container">Private
    <input className="radio-btn" type="radio"
        name="selectedOption"
        value= "private"
        onChange={this.onChange}
        checked={this.state.selectedOption === "private"} />
        <span className="checkmark"></span>
        </label>

        <label className="radio-container">Public
        <input className="radio-btn" type="radio"
        name="selectedOption"
        value= "public"
        onChange={this.onChange}
        checked={this.state.selectedOption === "public"} />
        <span className="checkmark"></span>
        </label>
        <br/>
        <br/>
        <button className="action-menu-btn" onClick={this.handleAdd} type="submit">
          <i className="fas fa-paper-plane"></i>
        </button>
    </div>
</div>
);
  }
}
export default MessageList;
