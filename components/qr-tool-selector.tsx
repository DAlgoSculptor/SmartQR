'use client'

import { FileText, Link2, User, Wifi, Mail, MessageSquare, MessageCircle, Calendar, FileUp, Share2, Utensils } from 'lucide-react'

interface ToolOption {
  id: string
  name: string
  description: string
  icon: React.ReactNode
}

const tools: ToolOption[] = [
  {
    id: 'text',
    name: 'Text QR',
    description: 'Encode any text or plain content',
    icon: <FileText className="w-8 h-8" />,
  },
  {
    id: 'url',
    name: 'URL QR',
    description: 'Link to websites or web pages',
    icon: <Link2 className="w-8 h-8" />,
  },
  {
    id: 'file',
    name: 'File / Resume QR',
    description: 'Upload files or resumes and share them',
    icon: <FileUp className="w-8 h-8" />,
  },
  {
    id: 'social',
    name: 'Social Links Tree',
    description: 'Create a landing page with all your social links',
    icon: <Share2 className="w-8 h-8" />,
  },
  {
    id: 'menu',
    name: 'Restaurant Menu QR',
    description: 'Publish a digital restaurant menu or catalog',
    icon: <Utensils className="w-8 h-8" />,
  },
  {
    id: 'vcard',
    name: 'vCard QR',
    description: 'Share contact information',
    icon: <User className="w-8 h-8" />,
  },
  {
    id: 'wifi',
    name: 'WiFi QR',
    description: 'Share WiFi connection details',
    icon: <Wifi className="w-8 h-8" />,
  },
  {
    id: 'email',
    name: 'Email QR',
    description: 'Create mailto QR codes',
    icon: <Mail className="w-8 h-8" />,
  },
  {
    id: 'sms',
    name: 'SMS QR',
    description: 'Send text messages easily',
    icon: <MessageSquare className="w-8 h-8" />,
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp QR',
    description: 'Open WhatsApp chats directly',
    icon: <MessageCircle className="w-8 h-8" />,
  },
  {
    id: 'event',
    name: 'Event QR',
    description: 'Share calendar events',
    icon: <Calendar className="w-8 h-8" />,
  },
]

interface Props {
  onSelectTool: (toolId: string) => void
}

export default function QRToolSelector({ onSelectTool }: Props) {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl sm:text-5xl font-bold">Choose Your QR Code Type</h1>
        <p className="text-xl text-foreground/60 max-w-2xl mx-auto">
          Select the type of QR code you want to create. Each tool is optimized for its specific use case.
        </p>
      </div>

      {/* Tools grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => onSelectTool(tool.id)}
            className="glass p-8 text-left hover:border-primary/50 hover:bg-card/50 transition-all duration-300 group rounded-2xl"
          >
            <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform">
              {tool.icon}
            </div>
            <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition">{tool.name}</h3>
            <p className="text-foreground/60 text-sm">{tool.description}</p>
          </button>
        ))}
      </div>
    </div>
  )
}
