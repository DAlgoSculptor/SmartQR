'use client'

import { FileText, Link2, User, Wifi, Mail, MessageSquare, MessageCircle, Calendar, FileUp, Share2, Utensils, Sparkles } from 'lucide-react'

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
    description: 'Encode plain text or simple messages',
    icon: <FileText className="w-5 h-5" />,
  },
  {
    id: 'url',
    name: 'URL QR',
    description: 'Link directly to web pages or websites',
    icon: <Link2 className="w-5 h-5" />,
  },
  {
    id: 'file',
    name: 'File / Resume QR',
    description: 'Host PDF files or resumes on CDN storage',
    icon: <FileUp className="w-5 h-5" />,
  },
  {
    id: 'social',
    name: 'Social Links Tree',
    description: 'Compile all your social links in one page',
    icon: <Share2 className="w-5 h-5" />,
  },
  {
    id: 'menu',
    name: 'Restaurant Menu QR',
    description: 'Publish contactless menus or catalogs',
    icon: <Utensils className="w-5 h-5" />,
  },
  {
    id: 'vcard',
    name: 'vCard QR',
    description: 'Share business contact details instantly',
    icon: <User className="w-5 h-5" />,
  },
  {
    id: 'wifi',
    name: 'WiFi QR',
    description: 'Share WiFi SSID and password credentials',
    icon: <Wifi className="w-5 h-5" />,
  },
  {
    id: 'email',
    name: 'Email QR',
    description: 'Trigger pre-filled mailto templates',
    icon: <Mail className="w-5 h-5" />,
  },
  {
    id: 'sms',
    name: 'SMS QR',
    description: 'Send pre-written text messages',
    icon: <MessageSquare className="w-5 h-5" />,
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp QR',
    description: 'Open direct WhatsApp chat targets',
    icon: <MessageCircle className="w-5 h-5" />,
  },
  {
    id: 'event',
    name: 'Event QR',
    description: 'Distribute structured calendar events',
    icon: <Calendar className="w-5 h-5" />,
  },
]

interface Props {
  onSelectTool: (toolId: string) => void
}

export default function QRToolSelector({ onSelectTool }: Props) {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-500/20 bg-orange-500/5 text-[#ea580c] text-[10px] font-bold tracking-widest uppercase">
          <Sparkles className="w-3.5 h-3.5" /> Selector Grid
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.1]">
          Choose your <span className="font-display italic font-semibold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500">QR blueprint</span>
        </h1>
        <p className="text-xs sm:text-sm text-foreground/50 leading-relaxed font-medium">
          Select a template to generate. Dynamic blueprints support redirection and CDN hosting, while static codes store raw data.
        </p>
      </div>

      {/* Tools grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {tools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => onSelectTool(tool.id)}
            className="p-6 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-orange-500/25 hover:bg-white/[0.02] transition-all duration-300 group relative overflow-hidden text-left flex flex-col justify-between min-h-[190px]"
          >
            {/* Ambient subtle glow overlay */}
            <div className="absolute top-0 right-0 w-16 h-16 bg-orange-500/5 rounded-full blur-[20px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 group-hover:scale-105 transition-transform duration-300">
                {tool.icon}
              </div>
              <div>
                <h3 className="text-base font-bold text-white group-hover:text-[#ea580c] transition-colors mb-1">{tool.name}</h3>
                <p className="text-foreground/50 text-[11px] leading-normal font-medium">{tool.description}</p>
              </div>
            </div>
            
            <div className="pt-3 border-t border-white/5 mt-4 flex items-center justify-between text-[8px] font-bold text-foreground/30 uppercase tracking-widest">
              <span>Generate blueprint</span>
              <span className="text-[#ea580c] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">→</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
