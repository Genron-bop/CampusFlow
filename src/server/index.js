import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'

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

// Export measurements as CSV (download)
app.get('/api/measurements/export', async (req, res) => {
  try {
    const rows = await prisma.measurement.findMany({ orderBy: { date: 'asc' } })
    // simple CSV serializer
    const headers = ['id', 'date', 'category', 'label', 'value', 'source', 'createdAt']
    const escape = (v) => {
      if (v === null || v === undefined) return ''
      const s = String(v)
      if (s.includes('"')) return `"${s.replace(/"/g, '""')}"`
      if (s.includes(',') || s.includes('\n')) return `"${s}"`
      return s
    }
    const csv = [headers.join(',')]
    for (const r of rows) {
      csv.push([r.id, r.date?.toISOString(), r.category, r.label, r.value, r.source, r.createdAt?.toISOString()].map(escape).join(','))
    }
    const body = csv.join('\n')
    res.setHeader('Content-Type', 'text/csv')
    res.setHeader('Content-Disposition', 'attachment; filename="measurements.csv"')
    res.send(body)
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: e.message })
  }
})

// Upload CSV content (expects text/csv body) and insert into DB
app.post('/api/measurements/upload', express.text({ type: ['text/csv', 'text/plain', '*/*'] }), async (req, res) => {
  const csv = req.body
  if (!csv || !csv.trim()) return res.status(400).json({ error: 'Empty upload' })
  try {
    // parse CSV using csv-parse
    const parse = (await import('csv-parse/lib/sync')).default
    const records = parse(csv, { columns: true, skip_empty_lines: true, trim: true })
    // Map records to Measurement shape and insert in batches
    const toInsert = records.map((r) => ({
      date: r.date ? new Date(r.date) : new Date(),
      category: (r.category || r.type || '').toLowerCase(),
      label: r.label || r.meter || r.name || null,
      value: r.value !== undefined ? Number(r.value) : (r.kwh ? Number(r.kwh) : null),
      source: r.source || r.remarks || null
    }))
    // simple batch insert
    for (let i = 0; i < toInsert.length; i += 500) {
      const chunk = toInsert.slice(i, i + 500)
      await prisma.measurement.createMany({ data: chunk, skipDuplicates: true })
    }
    res.json({ inserted: toInsert.length })
  } catch (e) {
    console.error('Upload failed', e)
    res.status(400).json({ error: e.message })
  }
})

// Regenerate CSV from DB and write to disk (two-way sync)
import fs from 'fs'
import path from 'path'
app.post('/api/measurements/export-to-csv', async (req, res) => {
  try {
    const rows = await prisma.measurement.findMany({ orderBy: { date: 'asc' } })
    const headers = ['id', 'date', 'category', 'label', 'value', 'source', 'createdAt']
    const escape = (v) => {
      if (v === null || v === undefined) return ''
      const s = String(v)
      if (s.includes('"')) return `"${s.replace(/"/g, '""')}"`
      if (s.includes(',') || s.includes('\n')) return `"${s}"`
      return s
    }
    const csv = [headers.join(',')]
    for (const r of rows) {
      csv.push([r.id, r.date?.toISOString(), r.category, r.label, r.value, r.source, r.createdAt?.toISOString()].map(escape).join(','))
    }
    const body = csv.join('\n')
    const outDir = path.resolve(process.cwd(), 'data', 'exports')
    await fs.promises.mkdir(outDir, { recursive: true })
    const outPath = path.join(outDir, 'measurements.csv')
    await fs.promises.writeFile(outPath, body, 'utf8')
    res.json({ path: `/data/exports/measurements.csv`, outPath })
  } catch (e) {
    console.error('Export to CSV failed', e)
    res.status(500).json({ error: e.message })
  }
})

const port = process.env.PORT || 4000
app.listen(port, ()=> console.log(`API server listening on http://localhost:${port}`))
