import React from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import { v4 as uuidv4 } from 'uuid'

function PostCardContent({ content }) {
  return (
    <div>
      {content.split(/(#[^\s#]+)/g).map(v => {
        if (v.match(/(#[^\s#]+)/g)) {
          return <Link key={uuidv4()} href={`/hashtag/${v.slice(1)}`}><a>{v}</a></Link>
        }
        return v
      })}
    </div>
  )
}

PostCardContent.propTypes = {
  content: PropTypes.string.isRequired
}

export default PostCardContent
