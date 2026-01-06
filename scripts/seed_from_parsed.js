#!/usr/bin/env node
import fs from 'fs'
import path from 'path'
import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'

dotenv.config()
const prisma = new PrismaClient()

const parsedDir = path.join(process.cwd(),'data','parsed')

async function seed({ mode = 'append' } = {}){
  const files = fs.readdirSync(parsedDir).filter(f=>f.endsWith('.json'))
  console.log('Seeding from', files)

  if(mode==='replace'){
    console.log('Truncating Measurement table')
    await prisma.$executeRaw`TRUNCATE TABLE "Measurement" RESTART IDENTITY`
  }

  for(const f of files){
    const arr = JSON.parse(fs.readFileSync(path.join(parsedDir,f),'utf8'))
    // Convert to prisma format
    const toCreate = arr.map(r=>({
      date: new Date(r.date),
      category: r.type || r.category || 'unknown',
      label: r.label || null,
      value: Number(r.value),
      source: r.sourceFile || f
    }))
    // insert in chunks
    for(let i=0;i<toCreate.length;i+=500){
      const chunk = toCreate.slice(i,i+500)
      await prisma.measurement.createMany({ data: chunk })
      console.log('Inserted', chunk.length, 'rows from', f)
    }
  }
}

async function run(){
  const modeArg = process.argv[2] || 'append'
  await seed({mode: modeArg})
  console.log('Seeding complete')
  await prisma.$disconnect()
}

run().catch(async (e)=>{ console.error(e); await prisma.$disconnect(); process.exit(1) })
