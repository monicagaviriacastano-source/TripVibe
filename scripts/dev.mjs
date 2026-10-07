import { spawn } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import os from 'node:os'
import process from 'node:process'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const viteBin = path.join(root, 'node_modules', 'vite', 'bin', 'vite.js')

function canReadNetworkInterfaces() {
  try {
    os.networkInterfaces()
    return true
  } catch {
    return false
  }
}

const args = [viteBin, '--port=3000']

if (canReadNetworkInterfaces()) {
  args.push('--host=0.0.0.0')
} else {
  console.warn(
    'No se pudieron leer las interfaces de red. Vite queda solo en http://localhost:3000/',
  )
}

const child = spawn(process.execPath, args, { stdio: 'inherit' })

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => child.kill(signal))
}

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal)
    return
  }
  process.exit(code ?? 0)
})
