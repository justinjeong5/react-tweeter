import React, { useCallback, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Popconfirm, Space, message as Message } from 'antd'
import ImageUploader from '../Image/ImageUploader'
import { EDIT_USER_REQUEST, REMOVE_IMAGE_FROM_PATH } from '../../reducers/types';

function NicknameEditForm() {

  const dispatch = useDispatch();
  const { imagePath } = useSelector(state => state.image)
  const { editUserDone } = useSelector(state => state.user)

  useEffect(() => {
    if (editUserDone) {
      Message.success('회원정보가 변경되었습니다.')
    }
  }, [editUserDone])

  const handleRemoveImage = useCallback(() => () => {
    dispatch({
      type: REMOVE_IMAGE_FROM_PATH,
    })
  }, [])

  const handleChangeImage = useCallback(() => {
    if (imagePath) {
      dispatch({
        type: EDIT_USER_REQUEST,
        data: { image: imagePath }
      })
    }
  }, [imagePath])

  const style = useMemo(() => ({
    marginBottom: 20, border: '1px solid #d9d9d9', padding: 20,
    display: 'flex', justifyContent: 'space-between'
  }), [])

  return (
    <div style={style}>
      {!imagePath && <div style={{ margin: 5, color: '#d9d9d9' }}>프로필 이미지를 변경하시겠습니까</div>}
      {imagePath && <div style={{ marginBottom: 25 }}>
        <Popconfirm
          placement='bottom'
          title='사진을 삭제하시겠습니까?'
          onConfirm={handleRemoveImage()}
          okText='삭제'
          cancelText='아니오'>
          <img
            style={{ width: 266 }}
            src={`http://localhost:3065/${imagePath.src}`}
            alt={imagePath.src}
          />
        </Popconfirm>
      </div>}
      <span style={{ marginLeft: 'auto' }}>
        <Space>
          <ImageUploader />
          <Popconfirm
            placement='bottomRight'
            title='사진을 변경하시겠습니까?'
            onConfirm={handleChangeImage}
            okText='변경하기'
            cancelText='아니오'
          >
            <Button type='primary' disabled={!imagePath} >변경하기</Button>
          </Popconfirm>
        </Space>
      </span>
    </div>
  )
}

export default NicknameEditForm
