import {Link} from 'react-router-dom'
import { IoMdMail } from "react-icons/io";
import { FaCity } from "react-icons/fa";

import ThemeContext from '../../contexts/ThemeContext'

const UserCard = props => {
  const {user} = props
  const {name, id, email, address} = user
  const {city} = address
  return (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const img =
          isDarkTheme === true
            ? 'https://cdn-icons-png.freepik.com/256/11876/11876398.png?ga=GA1.1.48591340.1727965003&semt=ais_hybrid.png'
            : 'https://img.freepik.com/free-vector/user-blue-gradient_78370-4692.jpg'

        return (
          <li
            className={`${
              isDarkTheme === true
                ? 'bg-transparent hover:bg-white text-white hover:text-black'
                : 'bg-sky-50 hover:bg-sky-700 text-sky-700 hover:text-white'
            }
              m-3 p-2 w-96 self-center md:w-5/12 min-h-[17vh]
              transition ease-linear delay-300 border-2
              flex items-center`}
          >
            <Link to={`/users/${id}`} className="w-full flex">
              <img src={img} alt="user" className="w-1/3 mx-2" />
              <div className='py-3'>
                <h1 className="text-xl font-semibold ">{name}</h1>
                <p className='flex items-center my-2'>
                  <IoMdMail className='text-xl'/>
                  <span className='text-sm mx-3'>{email}</span>
                  </p>
                <p className='flex items-center my-2'>
                  <FaCity className='text-xl'/>
                  <span className='mx-3'>{city}</span>
                </p>
              </div>
            </Link>
          </li>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default UserCard
