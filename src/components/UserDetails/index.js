import {Component} from 'react'
import {Link} from 'react-router-dom'
import {MdLightMode, MdDarkMode} from 'react-icons/md'

import PageLoader from '../PageLoader'
import FailureView from '../FailureView'

import ThemeContext from '../../contexts/ThemeContext'

const status = {
  initial: 'INITIAL',
  failure: 'FAILURE',
  loading: 'LOADING',
  success: 'SUCCESS',
}

class UserDetails extends Component {
  state = {
    details: {},
    apistatus: status.initial,
  }

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    this.setState({apistatus: status.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`,
    )
    const data = await response.json()
    if (response.ok) {
      this.handleSuccess(data)
    } else {
      this.handleFailure()
    }
  }

  handleFailure = () => {
    this.setState({apistatus: status.failure})
  }

  handleSuccess = data => {
    this.setState({
      details: data,
      apistatus: status.success,
    })
  }

  renderResults = () => {
    const {apistatus} = this.state
    switch (apistatus) {
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

  renderLoader = () => <PageLoader className="mx-auto" />

  renderFailureView = () => <FailureView tryAgain={this.getDetails} />

  renderSuccessView = () => {
    const {details} = this.state
    const {name, username, phone, email, website, company, address} = details
    const {street, suite, city, zipcode} = address
    const {catchPhrase, bs} = company

    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          const img =
            isDarkTheme === true
              ? 'https://res.cloudinary.com/dzhzfdugz/image/upload/c_crop,w_300,h_300,r_max/v1737351435/WhatsApp_Image_2025-01-20_at_11.06.30_ffmomn.png'
              : 'https://res.cloudinary.com/dzhzfdugz/image/upload/c_crop,w_300,h_300,r_max/v1737351032/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg_shee1q.png'
          return (
            <div
              className={`border-2 
            ${
              isDarkTheme === true
                ? 'border-white bg-gradient-to-r from-transparent to-black'
                : 'border-sky-700 bg-gradient-to-r from-cyan-500 to-cyan-50'
            } 
            min-h-lvh w-100 md:w-4/5 flex flex-col 
            md:flex-row md:justify-start p-5 md:p-10"`}
            >
              <div
                className={`border-2 
                  ${
                    isDarkTheme === true
                      ? 'bg-black border-gray-50'
                      : 'bg-sky-50 border-sky-700'
                  } 
                    rounded-md  m-3 p-3 flex flex-col md:w-6/12`}
              >
                <img
                  src={img}
                  alt="user"
                  className="md:w-1/2 h-3/5 self-center"
                />
                <div className="w-8/12 my-3 px-3">
                  <h1 className="text-xl font-semibold">{name}</h1>
                  <div className="flex justify-between">
                    <p className='text-sm'>{username}</p>
                    <p className='text-sm mx-1'>{phone}</p>
                  </div>
                  <p>{email}</p>
                  <hr />
                  <a href={website} target="_blank" rel="noreferrer">
                    {website}
                  </a>
                </div>
              </div>
              <div className="md:w-6/12">
                <div
                  className={`border-2 
                    ${
                      isDarkTheme === true
                        ? 'bg-black border-gray-50'
                        : 'bg-sky-50 border-sky-700'
                    } 
                      rounded-md  m-3 p-3 flex flex-col md:w-100`}
                >
                  <h2 className="text-xl font-semibold">Address</h2>
                  <hr />
                  <div>
                    <p>{street}</p>
                    <p>{suite}</p>
                    <p>{city}</p>
                    <p>{zipcode}</p>
                  </div>
                </div>
                <div
                  className={`border-2 
                    ${
                      isDarkTheme === true
                        ? 'bg-black border-gray-50'
                        : 'bg-sky-50 border-sky-700'
                    } 
                      rounded-md  m-3 p-3 flex flex-col md:w-100`}
                >
                  <h2 className="text-xl font-semibold">Company</h2>
                  <hr />
                  <div>
                    <p>{company.name}</p>
                    <p>{catchPhrase}</p>
                    <p>{bs}</p>
                  </div>
                </div>
              </div>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme, toggleTheme} = value
          const onChangeTheme = () => {
            toggleTheme()
          }
          return (
            <div
              className={`min-h-lvh ${isDarkTheme === true ? 'bg-black text-white' : 'bg-sky-50 text-emerald-950'}`}
            >
              <nav className="flex justify-between p-2 px-4">
                <h1
                  className={`${
                    isDarkTheme === true ? 'text-white' : 'text-sky-700'
                  } 
                  font-sans text-3xl font-bold`}
                >
                  User Details
                </h1>
                <button onClick={onChangeTheme}>
                  {isDarkTheme === true ? (
                    <MdLightMode className="text-white text-3xl" />
                  ) : (
                    <MdDarkMode className="text-sky-700 text-3xl" />
                  )}
                </button>
              </nav>
              <div
                className={`p-5 min-h-lvh flex flex-col 
                ${
                  isDarkTheme === true
                    ? "bg-[url('https://res.cloudinary.com/dzhzfdugz/image/upload/v1737357065/WhatsApp_Image_2025-01-20_at_12.40.43_svbome.jpg')]"
                    : "bg-[url('https://res.cloudinary.com/dzhzfdugz/image/upload/v1737356714/WhatsApp_Image_2025-01-20_at_12.34.08_qg3i6f.jpg')]"
                }
                 bg-contain bg-right`}
              >
                {this.renderResults()}
                <Link to="/">
                  <button
                    className={`border-2 m-3 px-2 rounded-md ${
                      isDarkTheme === true
                        ? 'border-white hover:bg-white text-white hover:text-black'
                        : 'border-sky-500 hover:bg-sky-500 text-slate-500 hover:text-white'
                    }`}
                  >
                    Back
                  </button>
                </Link>
              </div>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default UserDetails
