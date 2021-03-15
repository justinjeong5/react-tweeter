import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

moment.locale('ko');

function PostCardTitle({ post }) {
  const timeFromNow = useCallback((timestamp) => moment(timestamp).fromNow(), []);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      {post.User.nickname}
      <span style={{ color: 'gray', fontSize: '0.8em', fontWeight: 300 }}>
        {timeFromNow(post.createdAt)}
        {' '}
        {post.Likers.length > 0 && `👍🏻 ${post.Likers.length}`}
        {' '}
        {post.Comments.length > 0 && `📝 ${post.Comments.length}`}
      </span>
    </div>
  );
}

PostCardTitle.propTypes = {
  post: PropTypes.shape({
    User: PropTypes.shape({
      nickname: PropTypes.string.isRequired,
    }).isRequired,
    Comments: PropTypes.array.isRequired,
    Likers: PropTypes.array.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default PostCardTitle;
