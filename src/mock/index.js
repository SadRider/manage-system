import Mock from 'mockjs'

Mock.mock('/api/userLogin','post',{
    code:0,
    success:true,
    message:'登录成功',
    data:{}
})
Mock.setup({
    timeout: 400
})