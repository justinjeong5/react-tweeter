import React, { useCallback, useMemo, useState } from 'react';
import { Input, Popconfirm, message as Message } from 'antd';
import { useDispatch } from 'react-redux';
import { EDIT_USER_REQUEST } from '../../reducers/types';

function NicknameEditForm() {
  const [nickname, setNickname] = useState('');
  const dispatch = useDispatch();

  const handleChange = useCallback((e) => {
    setNickname(e.currentTarget.value);
  }, []);

  const handleChangeNickname = useCallback(() => {
    if (nickname.length === 0) {
      return Message.error('닉네임을 입력해주세요.');
    }
    if (nickname.trim() !== nickname) {
      return Message.error('닉네임의 앞/뒤에는 공백문자를 넣을 수 없습니다.');
    }
    if (nickname.trim().length < 2) {
      return Message.error('닉네임은 두글자 이상으로 해주세요.');
    }
    return dispatch({
      type: EDIT_USER_REQUEST,
      data: { nickname },
    });
  }, [nickname]);

  const style = useMemo(() => ({ marginBottom: 20, border: '1px solid #d9d9d9', padding: 20 }), []);

  return (
    <Input.Search
      style={style}
      placeholder="2글자 이상, 20글자 이하, 공백으로 끝나거나 시작하지 못함"
      value={nickname}
      onChange={handleChange}
      addonBefore="닉네임"
      enterButton={(
        <Popconfirm
          title="닉네임을 변경하시겠습니까?"
          onConfirm={handleChangeNickname}
          okText="수정하기"
          cancelText="아니오"
          type="submit"
        >
          수정하기
        </Popconfirm>
      )}
    />

  );
}

export default NicknameEditForm;
