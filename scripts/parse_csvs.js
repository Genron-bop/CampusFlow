#!/usr/bin/env node
import fs from 'fs'
import path from 'path'
import { parse } from 'csv-parse/sync'

function guessType(filename){
  const n = filename.toLowerCase()
  if(n.includes('electric')) return 'electricity'
  if(n.includes('water')) return 'water'
  if(n.includes('solid')||n.includes('waste')) return 'solid_waste'
  return 'unknown'
}

function findHeader(rows){
  for(let i=0;i<Math.min(6,rows.length);i++){
    const r = rows[i].map(c=> (c||'').toString().trim())
    if(r.some(c=>/date/i.test(c))) return {idx:i, row:r}
  }
  return {idx:0,row:rows[0].map(c=> (c||'').toString().trim())}
}

function normalizeDate(s){
  // Try Date.parse
  const t = Date.parse(s.replace(/"/g,'').replace(/,/g,' '))
  if(!isNaN(t)) return new Date(t).toISOString().slice(0,10)
  return s
}

function parsePivot(rows, headerIdx, filename, type){
  const header = rows[headerIdx]
  const out = []
  for(let r = headerIdx+1; r<rows.length; r++){
    const row = rows[r]
    if(!row || row.length===0) continue
    const dateRaw = row[0]
    if(!dateRaw) continue
    const date = normalizeDate(dateRaw)
    for(let c =1; c<Math.min(row.length, header.length); c++){
      const label = (header[c]||'').toString().trim()
      const valRaw = (row[c]||'').toString().trim().replace(/[^0-9.\-]/g,'')
      if(valRaw==='') continue
      const val = Number(valRaw)
      if(isNaN(val)) continue
      out.push({date, label, value: val, type, sourceFile: path.basename(filename)})
    }
  }
  return out
}

function parseTable(rows, headerIdx, filename, type){
  // simple row per date with columns
  const header = rows[headerIdx]
  const out = []
  for(let r = headerIdx+1; r<rows.length; r++){
    const row = rows[r]
    if(!row || row.length===0) continue
    const dateRaw = row[0]
    if(!dateRaw) continue
    const date = normalizeDate(dateRaw)
    const obj = {date, sourceFile: path.basename(filename), type}
    for(let c=1;c<header.length && c<row.length;c++){
      const key = (header[c]||`col${c}`).toString().trim().replace(/\s+/g,'_')
      let val = (row[c]||'').toString().trim()
      val = val.replace(/kg/g,'').trim()
      obj[key] = val
    }
    out.push(obj)
  }
  return out
}

function run(){
  const files = process.argv.slice(2)
  if(files.length===0){
    console.error('usage: parse_csvs.js <file1.csv> <file2.csv> ...')
    process.exit(1)
  }

  const parsedDir = path.join(process.cwd(),'data','parsed')
  fs.mkdirSync(parsedDir, {recursive:true})

  for(const f of files){
    if(!fs.existsSync(f)){
      console.warn('file not found:', f)
      continue
    }
    const raw = fs.readFileSync(f)
    const rows = parse(raw, {relax_column_count:true, bom:true})
    const {idx, row:hdr} = findHeader(rows)
    const type = guessType(f)
    let out = []
    // Heuristic: if hdr length>2 and many numeric cells -> pivot
    const numericCount = rows.slice(idx+1, idx+10).reduce((acc,r)=> acc + (r.slice(1).filter(c=>/\d/.test((c||'').toString())).length),0)
    if(hdr.length>2 && numericCount>5){
      out = parsePivot(rows, idx, f, type)
    }else{
      out = parseTable(rows, idx, f, type)
    }

    const outFile = path.join(parsedDir, path.basename(f).replace(/\.[^.]+$/,'') + '.json')
    fs.writeFileSync(outFile, JSON.stringify(out, null, 2))
    console.log('Wrote', outFile, 'rows=', out.length)
  }
}

run()
