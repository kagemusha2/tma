import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    application: 'Task Manager Application',
    version: '0.1.0'
  })
}
