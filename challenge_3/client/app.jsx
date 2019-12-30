class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  render() {
    return (
      <div>
        <FormOne />
        <FormTwo />
        <FormThree />
      </div>
    )
  }
}

class FormOne extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: ""
    }
  }

  typing(event) {
    this.setState({[event.target.id]: event.target.value});
  }

  submitData(event) {
    event.preventDefault();
    var name = this.state.name
    var email = this.state.email
    var password = this.state.password

    $.post("/data", {
      name: name,
      email: email,
      password: password
    });
  }

  render() {
    return (
      <div>
        <form action="/data" method="post">

          <label name="name">Name</label>
          <input name="name" type="text" id="name" value={this.state.name} onChange={this.typing.bind(this)}/>

          <label name="email">Email</label>
          <input type="text" id="email" value={this.state.email} onChange={this.typing.bind(this)}/>

          <label name="password">Password</label>
          <input type="text" id="password" value={this.state.password} onChange={this.typing.bind(this)}/>
          
          <input id="data" type="submit" value="Submit" onClick={this.submitData.bind(this)} />
        </form>
      </div>
    )
  }
}

class FormTwo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      street1: "",
      street2: "",
      city: "",
      zip: "",
      phone: ""
    }
  }

  typing(event) {
    this.setState({[event.target.id]: event.target.value});
  }

  submitData(event) {
    event.preventDefault();
    var street1 = this.state.street1
    var street2 = this.state.street2
    var city = this.state.city
    var zip = this.state.zip
    var phone = this.state.phone

    $.post("/data", {
      street1: street1,
      street2: street2,
      city: city,
      zip: zip,
      phone: phone
    });
  }

  render() {
    return (
      <div>
        <form action="/data" method="post">

          <label name="street1">Street 1</label>
          <input type="text" id="street1" value={this.state.street1} onChange={this.typing.bind(this)}/>

          <label name="street2">Street 2</label>
          <input type="text" id="street2" value={this.state.street2} onChange={this.typing.bind(this)}/>

          <label name="city">City</label>
          <input type="text" id="city" value={this.state.city} onChange={this.typing.bind(this)}/>

          <label name="zip">ZIP Code</label>
          <input type="number" id="zip" value={this.state.zip} onChange={this.typing.bind(this)}/>

          <label name="phone">Phone number</label>
          <input type="number" id="phone" value={this.state.phone} onChange={this.typing.bind(this)}/>

          <input id="data" type="submit" value="Submit" onClick={this.submitData.bind(this)} />
        </form>
      </div>
    )
  }
}

class FormThree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardNumber: "",
      expirationMonth: "",
      expirationYear: "",
      ccv: "",
      billingZip: ""
    }
  }

  typing(event) {
    this.setState({[event.target.id]: event.target.value});
  }

  submitData(event) {
    event.preventDefault();
    var cardNumber = this.state.cardNumber ;
    var expirationMonth = this.state.expirationMonth ;
    var expirationYear = this.state.expirationYear ;
    var ccv = this.state.ccv ;
    var billingZip = this.state.billingZip ;

    $.post("/data", {
      cardNumber: cardNumber,
      expirationMonth: expirationMonth,
      expirationYear: expirationYear,
      ccv: ccv,
      billingZip: billingZip
    });
  }

  render() {
    return (
      <div>
        <form action="/data" method="post">

          <label name="cardNumber">Credit Card Number</label>
          <input type="number" id="cardNumber" value={this.state.cardNumber} onChange={this.typing.bind(this)}/>

          <label name="expirationMonth">Expiration Month</label>
          <input type="number" id="expirationMonth" value={this.state.expirationMonth} onChange={this.typing.bind(this)}/>

          <label name="expirationYear">Expiration Year</label>
          <input type="number" id="expirationYear" value={this.state.expirationYear} onChange={this.typing.bind(this)}/>

          <label name="ccv">CCV</label>
          <input type="number" id="ccv" value={this.state.ccv} onChange={this.typing.bind(this)}/>

          <label name="billingZip">Billing ZIP</label>
          <input type="number" id="billingZip" value={this.state.billingZip} onChange={this.typing.bind(this)}/>

          <input id="data" type="submit" value="Submit" onClick={this.submitData.bind(this)} />
        </form>
      </div>
    )
  }
}


ReactDOM.render(<App />, document.getElementById('App'));
