import type { AxiosPromise } from 'axios'
import type { QuestionVO } from '../question/types'
import type { DoExamQrCodeParams, ExamForm, ExamQuery, ExamRecordQuery, ExamRecordVO, ExamVO, UpdateExamRecordData } from '@/api/exam/exam/types'
import request from '@/service/request'

// 答题完成提交考试
export function submitExam(examId: string) {
  return request({
    url: `/exam/exam/ignore/updateExamRecord/${examId}`,
    method: 'put',
  })
}

// 修改考试记录明细
export function updateExamRecord(data: UpdateExamRecordData) {
  return request({
    url: `/exam/exam/ignore/updateExamRecord`,
    method: 'put',
    data,
  })
}

// 根据试卷 id 和 考试记录状态 查询考试记录信息
export function queryByPaperIdAndExamStatus(paperId: string, status: string): AxiosPromise<ExamVO> {
  return request({
    url: `/exam/exam/queryByPaperIdAndExamStatus/${paperId}/${status}`,
    method: 'get',
  })
}

// 根据考试 id 和 当前题目索引 查询题目信息
export function getExamQuestion(examId: string, currentIndex: number): AxiosPromise<QuestionVO> {
  return request({
    url: `/exam/exam/ignore/getExamQuestion/${examId}/${currentIndex}`,
    method: 'get',
  })
}

// 扫码考试(面试考试、内部考试)
export function doExamQrCode(params: DoExamQrCodeParams): AxiosPromise<ExamVO> {
  return request({
    url: `/exam/exam/ignore/doExamQrCode`,
    method: 'get',
    params,
  })
}

// 非扫码考试（模拟考试）
export function doExamMock(params: { paperId: string, id?: string }): AxiosPromise<ExamVO> {
  return request({
    url: `/exam/exam/doExam`,
    method: 'get',
    params,
  })
}

// 查询历史考试记录数据
export function getExamHistory(examId: string): AxiosPromise<ExamVO> {
  return request({
    url: `/exam/exam/getExamHistory/${examId}`,
    method: 'get',
  })
}

// 查询考试记录列表
export function listExam(query?: Partial<ExamQuery>): AxiosPromise<ExamVO[]> {
  return request({
    url: '/exam/exam/list',
    method: 'get',
    params: query,
  })
}

// 查询考试记录详细
export function getExam(id: string): AxiosPromise<ExamVO> {
  return request({
    url: `/exam/exam/${id}`,
    method: 'get',
  })
}

// 新增考试记录
export function addExam(data: ExamForm) {
  return request({
    url: '/exam/exam',
    method: 'post',
    data,
  })
}

// 修改考试记录
export function updateExam(data: ExamForm) {
  return request({
    url: '/exam/exam',
    method: 'put',
    data,
  })
}

// 删除考试记录
export function delExam(id: string | Array<string>) {
  return request({
    url: `/exam/exam/${id}`,
    method: 'delete',
  })
}

// 查看考试记录明细
export function queryExamRecordList(params: ExamRecordQuery): AxiosPromise<ExamRecordVO[]> {
  return request({
    url: `/exam/exam/queryExamRecordList`,
    method: 'get',
    params,
  })
}
