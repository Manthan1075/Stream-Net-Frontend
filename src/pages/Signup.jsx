import { SignedIn, SignedOut, SignUp, UserButton } from '@clerk/clerk-react'

function Signup() {
  return (
    <header>
      <SignedOut>
        <SignUp />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  )
}

export default Signup