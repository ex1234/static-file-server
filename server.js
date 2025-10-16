import http from 'http'; import {readFile, stat} from 'fs/promises'; import {createReadStream} from 'fs'
import {extname, join} from 'path'; import {cwd} from 'process'
const PORT = Number(process.argv[2]||3000), ROOT=cwd()
const types={'.html':'text/html','.css':'text/css','.js':'text/javascript','.json':'application/json'}
http.createServer(async (req,res)=>{
  let p = join(ROOT, decodeURIComponent(req.url||'/').replace(/^\//,'') || 'index.html')
  try{
    const st = await stat(p)
    if(st.isDirectory()) p = join(p,'index.html')
    res.setHeader('Content-Type', types[extname(p)]||'application/octet-stream')
    createReadStream(p).pipe(res)
  }catch{ res.statusCode=404; res.end('Not found') }
}).listen(PORT,()=>console.log('Serving',ROOT,'on',PORT))
