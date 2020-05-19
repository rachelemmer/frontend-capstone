import React, { Component } from 'react'

export default class LogIn extends Component {

    state = {
        username: '',
        password: '',
    }

    updateInput = event => {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    logIn = event => {
        event.preventDefault()
        const {username, password} = this.state
        
        fetch("http://localhost:4000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({username, password})
        })
        .then(response => response.json())
        .then(result => {
            console.log(result)
            localStorage.setItem("token", result.token)
            result.token ? alert("You have successfully logged in!") : alert("Wrong username or password!")
        })
        // .then( () => {
        //     this.props.getBooks()
        // })   
            
        this.setState({
            username: '',
            password: ''
        })
        
    }

    logOut = event => {
        localStorage.clear()
        alert("You have successfully logged out!")
    }


    render() {
        return (
            <div className="login-container">
                <div className="login-form-container">
                    <p className="login-question">Already a user? Log In!</p>
                    <form className="login-form" onSubmit={this.logIn}>
                        <input 
                            value={this.state.username} 
                            name="username"
                            type="text" 
                            placeholder="username" 
                            onChange={this.updateInput}
                        />
                        <input 
                            value={this.state.password} 
                            name="password" 
                            type="password" 
                            placeholder="password"
                            onChange={this.updateInput}
                        />
                        <button type="submit">Log In</button>
                    </form>
                    <button className="logout-button" onClick={this.logOut}>Log Out</button>
                </div>
            </div>
        )
    }
}
