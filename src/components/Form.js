import React from 'react'
import axios from 'axios'
import Timer from './Timer'
import './form.css'

const socket = io()

class Form extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            firstNumber: '',
            secondNumber: '',
            duration: '',
            callState: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.save = this.save.bind(this)
        socket.on('call progress event', (newCallState) => this.handleStateChange(newCallState));
    }

    handleStateChange(newCallState) {
        console.log(newCallState)
        this.setState({
            callState: newCallState.callStatus
        })
    }

    handleInputChange(event) {
        const target = event.target;
        const name = target.name;
        this.setState({
            [name]: target.value
        });
    }

    handleSubmit(event) {
        const { firstNumber, secondNumber, duration } = this.state
        axios.post('/voice', {
            // firstNumber: '+15512092495',
            firstNumber,
            secondNumber,
            duration
        })
            .then((response) => {
                console.log(response);
            }, (error) => {
                console.log(error);
            });
        event.preventDefault();
    }

    save(seconds=0, minutes=0) {
        console.log(seconds, minutes)
        const { firstNumber, secondNumber } = this.state
        const duration = `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds: seconds}`
        console.log(duration)
        axios.post('/save', {
            // firstNumber: '+15512092495',
            from: firstNumber,
            to: secondNumber,
            duration
        })
            .then((response) => {
                console.log(response);
            }, (error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <div className="container">
                { this.state.callState == '' && <form onSubmit={this.handleSubmit}>
                    <label>
                        Name:
                    <input required type="text" value={this.state.name} name="name" onChange={this.handleInputChange} />
                    </label>
                    <label>
                        Your Number:
                    <input required type="text" value={this.state.firstNumber} name="firstNumber" onChange={this.handleInputChange} />
                    </label>
                    <label>
                        Number to be called:
                    <input required type="text" value={this.state.secondNumber} name="secondNumber" onChange={this.handleInputChange} />
                    </label>
                    <label>
                        Duration:
                        <select defaultValue={this.state.duration} name="duration" onChange={this.handleInputChange}>
                            <option value="5">5 minutes</option>
                            <option value="10">10 minutes</option>
                            <option value="15">15 minutes</option>
                        </select>
                    </label>
                    <input className="submit" type="submit" value="Call" />
                </form>
                }
                {this.state.callState == 'ringing' && <div className="ring"> Ringing .... </div>}
                {this.state.callState == 'in-progress' && <Timer save={this.save} />}
                {this.state.callState == 'completed' && <div className="completed"> Call completed </div>}
                {this.state.callState == 'no-answer' && <div class="no-answer"> No Answer </div>}
            </div>
        )
    }
}

export default Form