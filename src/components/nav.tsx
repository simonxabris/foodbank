import * as React from 'react';
import Link from "next/link";
import { Auth } from "aws-amplify";

export function Nav() {
  const [signedIn, setSignedIn] = React.useState(false);
  
  React.useEffect(() => {
    Auth.currentAuthenticatedUser().then(user => {
      if (user) {
        setSignedIn(true);
      }
    })
  })

  async function signOut() {
    try {
      await Auth.signOut();

      setSignedIn(false);
    } catch (error) {
      console.error('Failed to sign in');
    }

    console.log('Successful sign out')
  }

  return (
    <>
    <nav>
      {signedIn ? <Link href="/new-recipe"><a className="new">New Recipe</a></Link> : ''}
      {signedIn ? <Link href="/profile"><a>Profile</a></Link> : ''}
      {signedIn ? <button onClick={signOut} type="button">Sign Out</button> : ''}
    </nav>
    <style jsx>{`
      nav {
        box-shadow: 2.5px 2.5px 5px 0 rgba(0,0,0,0.1),-2.5px -2.5px 5px 0 rgba(0,0,0,0.1), 2.5px -2.5px 5px 0 rgba(0,0,0,0.1),-2.5px 2.5px 5px 0 rgba(0,0,0,0.1);
        border-radius: 40px;
        padding: ;
        margin: 10px 20px;
        padding: 10px;
        
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 10px;
      }

      button, a {
        background-color: none;
        color: var(--text-color);
        border: none;
        border-radius: 40px;
        padding: 10px;
        font-size: 1em;
      }

      .new {
        background-color: var(--accent-color-1-50);
        color: var(--light-50);
      }
    `}</style>
    </>
  )
}

