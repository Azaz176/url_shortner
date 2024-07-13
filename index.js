import express from 'express'
import urlRoute from './routes/url.routes.js'
import db from './db.js'
const app= express()
const PORT= 8000
app.use(express.json())
app.use("/url", urlRoute)

app.listen(PORT, ()=> console.log(`Server Started at ${PORT}`))