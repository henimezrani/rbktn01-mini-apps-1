class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.reset();
  }

  reset(){
    var states = {
      count: 1,
      name: "",
      email: "",
      password: "",
      street1: "",
      street2: "",
      city: "",
      zip: "",
      phone: "",
      card_Number: "",
      expiration: "",
      ccv: "",
      billing_Zip: ""
    }
    return states;
  }

  inc(event){
    event.preventDefault();
    this.setState({ count: this.state.count + 1})
  }

  dec(event){
    event.preventDefault();
    this.setState({ count: this.state.count - 1})
  }

  typing(event) {
    this.setState({[event.target.id]: event.target.value});
    console.log(this.state)
  }

  rememberValue(event){
    return this.state
  }

  submitData(event) {
    event.preventDefault();
    var data = {};
    for (var keys in this.state) {
      if(keys !== 'count'){
        data[keys] = this.state[keys]
      }
    }
    this.setState(this.reset())


    $.post("/data", data);
  }

  render() {
    return(
      this.state.count === 1 ? 
        <FormOne states = {this.state} typing = {this.typing.bind(this)} inc = {this.inc.bind(this)} /> : 
        (this.state.count === 2 ? 
        <FormTwo states = {this.state} typing = {this.typing.bind(this)} inc = {this.inc.bind(this)} dec = {this.dec.bind(this)} /> : 
          (this.state.count === 3 ? 
          <FormThree states = {this.state} typing = {this.typing.bind(this)} inc = {this.inc.bind(this)} dec = {this.dec.bind(this)} /> :
          <Confirmation states = {this.state} submitData = {this.submitData.bind(this)} dec = {this.dec.bind(this)} /> ))
    )
  }
}

class FormOne extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <form action="/data" method="post">

          <label name="name">Name</label>
          <input name="name" type="text" id="name" value={this.props.states.name} onChange={this.props.typing}/>

          <label name="email">Email</label>
          <input type="email" id="email"  value={this.props.states.email} onChange={this.props.typing}/>

          <label name="password">Password</label>
          <input type="password" id="password" value={this.props.states.password} onChange={this.props.typing}/>
          
          <button onClick= {this.props.inc}>Next</button>
        </form>
      </div>
    )
  }
}

class FormTwo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <form action="/data" method="post">

          <label name="street1">Street 1</label>
          <input type="text" id="street1"  value={this.props.states.street1} onChange={this.props.typing}/>

          <label name="street2">Street 2</label>
          <input type="text" id="street2" value={this.props.states.street2} onChange={this.props.typing}/>

          <label name="city">City</label>
          <input type="text" id="city"  value={this.props.states.city} onChange={this.props.typing}/>

          <label name="zip">ZIP Code</label>
          <input type="number" id="zip"  value={this.props.states.zip} onChange={this.props.typing}/>

          <label name="phone">Phone number</label>
          <input type="number" id="phone"  value={this.props.states.phone} onChange={this.props.typing}/>

          <button onClick= {this.props.dec}>Previous</button>
          <button onClick= {this.props.inc}>Next</button>

        </form>
      </div>
    )
  }
}

class FormThree extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <form action="/data" method="post">

          <label name="card_Number">Credit Card Number</label>
          <input type="number" id="card_Number" value={this.props.states.card_Number} onChange={this.props.typing}/>

          <label name="expiration">Expiration Date</label>
          <input type="month" id="expiration" value={this.props.states.expiration} onChange={this.props.typing}/>

          <label name="ccv">CCV</label>
          <input type="number" id="ccv" value={this.props.states.ccv} onChange={this.props.typing}/>

          <label name="billing_Zip">Billing ZIP</label>
          <input type="number" id="billing_Zip" value={this.props.states.billing_Zip} onChange={this.props.typing}/>

          <button onClick= {this.props.dec}>Previous</button>
          <button onClick={this.props.inc}>Next</button>
        </form>
      </div>
    )
  }
}

class Confirmation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {
          Object.keys(this.props.states).map((elem, i) => (
            elem !== 'count' ? <ListElem key={i} title = {elem} value = {this.props.states[elem]} /> : null
          ))
        }
         
        <button onClick= {this.props.dec}>Previous</button>
        <button onClick={this.props.submitData}>Confirm</button>
      </div>
    )
  }
}

class ListElem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <p><b>{this.props.title}</b>: {this.props.value}</p>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('App'));
