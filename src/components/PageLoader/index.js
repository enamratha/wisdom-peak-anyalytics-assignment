import Loader from 'react-loader-spinner'

const PageLoader = () => (
  <div data-testid="loader">
    <Loader
      type="BallTriangle"
      color="#0b69ff"
      height="50"
      width="50"
      className="flex justify-center"
    />
  </div>
)

export default PageLoader
