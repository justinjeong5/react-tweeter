import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { List, Comment } from 'antd';
import moment from 'moment';
import ImageToAvatar from '../Image/ImageToAvatar';

function Comments({ comments }) {
  const timeFromNow = useCallback((timestamp) => moment(timestamp).fromNow(), []);

  return (
    <List
      style={{ marginLeft: 10 }}
      header={`${comments.length}개의 댓글`}
      itemLayout="horizontal"
      dataSource={comments}
      renderItem={(item) => (
        <>
          <div style={{ float: 'right', margin: 20, fontSize: '0.9em', color: '#888' }}>
            {timeFromNow(item.createdAt)}
          </div>
          <Comment
            style={{ marginLeft: 20 }}
            author={item.User.nickname}
            avatar={<ImageToAvatar User={item.User} />}
            content={item.content}
          />
        </>
      )}
    />
  );
}

Comments.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({
    User: PropTypes.shape({
      id: PropTypes.number.isRequired,
      nickname: PropTypes.string.isRequired,
      Image: PropTypes.shape({
        src: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    content: PropTypes.string.isRequired,
  })).isRequired,
};

export default Comments;
