import {Component} from 'react'
import {MdLightMode, MdDarkMode} from 'react-icons/md'
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";

import ThemeContext from '../../contexts/ThemeContext'

import PageLoader from '../PageLoader'
import FailureView from '../FailureView'
import UserCard from '../Usercard'

const status = {
  initial: 'INITIAL',
  failure: 'FAILURE',
  loading: 'LOADING',
  success: 'SUCCESS',
}

class Home extends Component {
  state = {
    usersDetails: [],
    apiStatus: status.initial,
    searchInput: '',
    start: 0,
  }
  componentDidMount() {
    this.getUsersDetails()
  }

  getUsersDetails = async () => {
    this.setState({apiStatus: status.loading})
    const response = await fetch('https://jsonplaceholder.typicode.com/users/')
    const data = await response.json()
    if (response.ok === true) {
      this.handleSuccess(data)
    } else {
      this.handleFailure()
    }
  }

  handleSuccess = data => {
    this.setState({
      usersDetails: data,
      apiStatus: status.success,
    })
  }

  handleFailure = () => {
    this.setState({apiStatus: status.failure})
  }

  renderResults = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case status.loading:
        return this.renderLoader()
      case status.failure:
        return this.renderFailureView()
      case status.success:
        return this.renderSuccessView()
      default:
        return
    }
  }

  renderLoader = () => <PageLoader />

  renderFailureView = () => <FailureView tryAgain={this.getUsersDetails} />

  renderSuccessView = () => {
    const {usersDetails, searchInput, start} = this.state
    let filteredUsers = usersDetails.filter(user =>
      user.name.toLowerCase().includes(searchInput.toLowerCase()),
    )
    filteredUsers = filteredUsers.slice(
      start,
      Math.min(start + 6, filteredUsers.length),
    )
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          return (
            <ul
              className={`p-3 min-h-[85vh] md:min-h-[60vh]
              flex flex-col md:flex-row
                justify-start items-center
                md:flex-wrap overflow-y-auto
                md:justify-center
              ${
                isDarkTheme === true
                  ? 'bg-gradient-to-r from-slate-400 to-gray'
                  : 'bg-gradient-to-r from-sky-100 to-amber-50'
              }
              `}
            >
              {filteredUsers.map(user => (
                <UserCard key={user.id} user={user} />
              ))}
            </ul>
          )
        }}
      </ThemeContext.Consumer>
    )
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  sortItemsAsc = () => {
    const {usersDetails} = this.state
    const sorted = [...usersDetails].sort((a, b) => {
      return a.name.localeCompare(b.name)
    })
    this.setState({usersDetails: sorted})
  }

  sortItemsDesc = () => {
    const {usersDetails} = this.state
    const sorted = [...usersDetails].sort((a, b) => {
      return b.name.localeCompare(a.name)
    })
    this.setState({usersDetails: sorted})
  }

  showPrevious = () => {
    this.setState(prevState => {
      if (prevState.start - 4 >= 0) {
        return {
          start: prevState.start - 4,
        }
      }
    })
  }

  showNext = () => {
    const {usersDetails} = this.state
    this.setState(prevState => {
      if (prevState.start + 4 < usersDetails.length) {
        return {
          start: prevState.start + 4,
        }
      }
    })
  }

  render() {
    const {searchInput} = this.state

    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme, toggleTheme} = value
          const onChangeTheme = () => {
            toggleTheme()
          }
          return (
            <div
              className={`w-full min-h-lvh ${isDarkTheme === true ? 'bg-slate-900' : 'bg-sky-50'}`}
            >
              <nav className="flex flex-col md:flex-row items-center justify-between px-2 w-full">
                <h1
                  className={`${
                    isDarkTheme === true ? 'text-white' : 'text-sky-700'
                  } 
                    font-sans text-3xl font-bold`}
                >
                  Users
                </h1>
                <div className="flex flex-col md:flex-row justify-self-end items-center">
                  <input
                    value={searchInput}
                    onChange={this.onChangeSearchInput}
                    type="search"
                    className={`border-2 rounded-md outline-none px-2 bg-transparent 
                      ${
                        isDarkTheme === false
                          ? 'border-sky-600 textsky-700'
                          : 'border-white text-white'
                      }`}
                    placeholder="search here"
                  />
                  <div className='flex items-center'>
                  <button
                    className={`border-2 m-3 px-2 rounded-md ${
                      isDarkTheme === true
                        ? 'border-white hover:bg-white text-white hover:text-black'
                        : 'border-sky-500 hover:bg-sky-500 text-slate-500 hover:text-white'
                    }`}
                    onClick={this.sortItemsAsc}
                  >
                    sort a-z
                  </button>
                  <button
                    className={`border-2 m-3 px-2 rounded-md ${
                      isDarkTheme === true
                        ? 'border-white hover:bg-white text-white hover:text-black'
                        : 'border-sky-500 hover:bg-sky-500 text-slate-500 hover:text-white'
                    }`}
                    onClick={this.sortItemsDesc}
                  >
                    sort z-a
                  </button>
                  <button onClick={onChangeTheme}>
                    {isDarkTheme === true ? (
                      <MdLightMode className="text-white text-3xl" />
                    ) : (
                      <MdDarkMode className="text-sky-700 text-3xl" />
                    )}
                  </button>
                  </div>
                </div>
              </nav>
              {this.renderResults()}
              <div className="flex justify-between px-5">
                <button
                  className={`m-3 px-2 rounded-md flex items-center ${
                    isDarkTheme === true
                      ? 'hover:bg-white text-white hover:text-black'
                      : 'hover:bg-sky-500 text-slate-500 hover:text-white'
                  }`}
                  onClick={this.showPrevious}
                >
                  <GrFormPreviousLink/>
                  <span>Previous</span>
                </button>
                <button
                  className={`m-3 px-2 rounded-md flex items-center py-2 ${
                    isDarkTheme === true
                      ? 'hover:bg-white text-white hover:text-black'
                      : 'hover:bg-sky-500 text-slate-500 hover:text-white'
                  }`}
                  onClick={this.showNext}
                >
                  <span>Next</span>
                  <GrFormNextLink/>
                </button>
              </div>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Home
