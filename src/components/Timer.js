import React, { Component } from 'react'

class Timer extends Component {
    constructor(props) {
        super(props)
        this.state = { minute: 0, second: 0 }
    }

    timer() {
        return setInterval(() => {
            return this.setState((state, props) => {
                return {
                    second: state.second == 59 ? 0 : state.second + 1,
                    minute: state.second == 59 ? state.minute + 1 : state.minute
                }
            })
        }, 1000)
    }

    componentDidMount() {
        this.timer()
    }
    componentWillUnmount() {
        this.props.save(this.state.second, this.state.minute)
        clearInterval(this.timer)
    }
    render() {
        const { minute, second } = this.state
        return (
            <h1>{minute < 10 ? '0' + minute : minute}:{second < 10 ? '0' + second : second}</h1>
        )
    }
}

export default Timer