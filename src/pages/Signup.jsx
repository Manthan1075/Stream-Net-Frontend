import { useSignUp } from "@clerk/clerk-react"
import Spinner from "../components/loaders/Spinner.jsx"

function Signup() {

  const { isLoaded, signUp } = useSignUp()

  if (!isLoaded) {
    return <Spinner />
  }

  return (
    <div>
      <h3>Sign Up - Stream Net</h3>
      <Spinner />
    </div>
  )
}

export default Signup