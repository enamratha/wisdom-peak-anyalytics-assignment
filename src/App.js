import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'

import ThemeContext from './contexts/ThemeContext'

import Home from './components/Home'
import UserDetails from './components/UserDetails'

class App extends Component {
  state = {
    isDarkTheme: false,
  }

  toggleTheme = () => {
    this.setState(prevState => ({
      isDarkTheme: !prevState.isDarkTheme,
    }))
  }

  render() {
    const {isDarkTheme} = this.state
    return (
      <ThemeContext.Provider
        value={{isDarkTheme, toggleTheme: this.toggleTheme}}
      >
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/users/:id" component={UserDetails} />
        </Switch>
      </ThemeContext.Provider>
    )
  }
}

export default App
