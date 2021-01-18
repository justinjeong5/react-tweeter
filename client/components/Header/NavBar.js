import React from 'react'
import Link from 'next/link'

function NavBar() {
  return (
    <div>
      <Link href='/'><a>HOME</a></Link>
      <Link href='/profile'><a>프로필</a></Link>
      <Link href='/signup'><a>회원가입</a></Link>
    </div>
  )
}

export default NavBar
