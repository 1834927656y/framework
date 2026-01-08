// server/index.js
import express from 'express'
import fetch from 'node-fetch'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors({ origin: true, credentials: true }))
const { BAIDU_APP_ID, BAIDU_KEY } = process.env
const BAIDU_API = 'https://api.fanyi.baidu.com/api/trans/vip/translate'

// 简单 MD5 签名（可复用已有工具）
import crypto from 'crypto'
function sign(q, salt) {
  return crypto
    .createHash('md5')
    .update(BAIDU_APP_ID + q + salt + BAIDU_KEY)
    .digest('hex')
}

app.post('/translate', async (req, res) => {
  try {
    // 再次确保 CORS 头被设置
    res.header('Access-Control-Allow-Origin', '*')
    
    const { query, from = 'auto', to = 'en' } = req.body
    if (!query) return res.status(400).json({ message: 'query 必填' })

    const salt = Date.now()
    const params = new URLSearchParams({
      q: query,
      appid: BAIDU_APP_ID,
      salt: salt.toString(),
      from,
      to,
      sign: sign(query, salt)
    })
    console.log(`${BAIDU_API}?${params.toString()}`);
    const response = await fetch(`${BAIDU_API}?${params.toString()}`)
    if (!response.ok) {
      return res.status(response.status).json({ message: '百度接口错误' })
    }
    const data = await response.json()
    res.json(data)
  } catch (error) {
    res.status(500).json({ message: '服务异常', detail: error.message })
  }
})

app.listen(3000, '0.0.0.0')