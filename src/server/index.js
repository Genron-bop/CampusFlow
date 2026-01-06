import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'

dotenv.config()
const prisma = new PrismaClient()
const app = express()
app.use(cors())
app.use(express.json())

app.get('/api/measurements', async (req,res)=>{
  const { category, label, date } = req.query
  const where = {}
  if(category) where.category = category
  if(label) where.label = label
  if(date) where.date = new Date(date)
  const data = await prisma.measurement.findMany({ where, orderBy: { date: 'asc' }, take: 1000 })
  res.json(data)
})

app.post('/api/measurements', async (req,res)=>{
  const body = req.body
  try{
    const created = await prisma.measurement.create({ data: {
      date: new Date(body.date),
      category: body.category,
      label: body.label || null,
      value: Number(body.value),
      source: body.source || null
    }})
    res.status(201).json(created)
  }catch(e){
    console.error(e)
    res.status(400).json({error: e.message})
  }
})

// Update a measurement by id
app.put('/api/measurements/:id', async (req, res) => {
  const id = Number(req.params.id)
  const body = req.body
  try {
    const updated = await prisma.measurement.update({
      where: { id },
      data: {
        // allow partial updates
        date: body.date ? new Date(body.date) : undefined,
        category: body.category ?? undefined,
        label: body.label ?? undefined,
        value: body.value !== undefined ? Number(body.value) : undefined,
        source: body.source ?? undefined,
      },
    })
    res.json(updated)
  } catch (e) {
    console.error(e)
    res.status(400).json({ error: e.message })
  }
})

// Delete a measurement by id
app.delete('/api/measurements/:id', async (req, res) => {
  const id = Number(req.params.id)
  try {
    await prisma.measurement.delete({ where: { id } })
    res.status(204).end()
  } catch (e) {
    console.error(e)
    res.status(400).json({ error: e.message })
  }
})

const port = process.env.PORT || 4000
app.listen(port, ()=> console.log(`API server listening on http://localhost:${port}`))
