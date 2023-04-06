import Request from '@/utils/request'
import { API_FIND_NEWS_COMMENTS, API_UPDATE_COMMENT_STATUS, API_NEWS_COMMENT_LIST, API_LIKE_COMMENT, API_DELETE_COMMENT, API_SAVE_COMMENT_REPAY, API_DELETE_COMMENT_REPAY } from '@/constants/api'

export function findNewsComments (data) {
  return Request({
    url: API_FIND_NEWS_COMMENTS,
    method: 'post',
    data
  })
}

export function updateCommentStatus (data) {
  return Request({
    url: API_UPDATE_COMMENT_STATUS,
    method: 'post',
    data
  })
}

export function getNewsComments (data) {
  return Request({
    url: API_NEWS_COMMENT_LIST,
    method: 'post',
    data
  })
}

export function getCommentList (data) {
  return Request({
    url: API_NEWS_COMMENT_LIST,
    method: 'post',
    data
  })
}

export function likeComment (data) {
  return Request({
    url: API_LIKE_COMMENT,
    method: 'post',
    data
  })
}

export function deleteComment (commentId) {
  return Request({
    url: `${API_DELETE_COMMENT}/${commentId}`,
    method: 'delete'
  })
}

export function saveCommentRepay (data) {
  return Request({
    url: API_SAVE_COMMENT_REPAY,
    method: 'post',
    data
  })
}

export function deleteCommentRepay (commentRepayId) {
  return Request({
    url: `${API_DELETE_COMMENT_REPAY}/${commentRepayId}`,
    method: 'delete'
  })
}
