import ThemeContext from '../../contexts/ThemeContext'

const FailureView = props => {
  const {tryAgain} = props
  const onTryAgain = () => {
    tryAgain()
  }

  return (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        return (
          <div
            className={`${isDarkTheme === true ? 'bg-black text-white' : 'bg-white text-sky-700'} text-center h-screen`}
          >
            <h1 className="text-3xl font-semibold ">Failed to load</h1>
            <button
              className={`border-2 m-3 px-2 rounded-md ${
                isDarkTheme === true
                  ? 'border-white hover:bg-white text-white hover:text-black'
                  : 'border-sky-500 hover:bg-sky-500 text-slate-500 hover:text-white'
              }`}
              onClick={onTryAgain}
            >
              TryAgain
            </button>
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default FailureView
