'use client'

import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

interface Props {
  toolType: string
  onValueChange: (value: string) => void
}

export default function QRInput({ toolType, onValueChange }: Props) {
  const [inputs, setInputs] = useState<Record<string, string>>({})

  useEffect(() => {
    const value = generateQRValue()
    onValueChange(value)
  }, [inputs, toolType])

  const handleInputChange = (field: string, value: string) => {
    setInputs(prev => ({ ...prev, [field]: value }))
  }

  const generateQRValue = (): string => {
    switch (toolType) {
      case 'text':
        return inputs.text || ''

      case 'url':
        return inputs.url || ''

      case 'vcard':
        const vcard = [
          'BEGIN:VCARD',
          'VERSION:3.0',
          `FN:${inputs.name || ''}`,
          `TEL:${inputs.phone || ''}`,
          `EMAIL:${inputs.email || ''}`,
          `ORG:${inputs.organization || ''}`,
          `URL:${inputs.website || ''}`,
          'END:VCARD',
        ]
        return vcard.join('\n')

      case 'wifi':
        return `WIFI:T:${inputs.security || 'WPA'};S:${inputs.ssid || ''};P:${inputs.password || ''};;`

      case 'email':
        return `mailto:${inputs.emailTo || ''}?subject=${inputs.subject || ''}&body=${inputs.body || ''}`

      case 'sms':
        return `smsto:${inputs.phone || ''}?body=${inputs.message || ''}`

      case 'whatsapp':
        return `https://wa.me/${inputs.whatsappPhone || ''}?text=${encodeURIComponent(inputs.whatsappMessage || '')}`

      case 'event':
        return `BEGIN:VEVENT\nDTSTART:${inputs.eventDate || ''}\nSUMMARY:${inputs.eventTitle || ''}\nDESCRIPTION:${inputs.eventDesc || ''}\nEND:VEVENT`

      default:
        return ''
    }
  }

  return (
    <div className="space-y-4">
      {toolType === 'text' && (
        <div>
          <label className="block text-sm font-medium mb-2">Text</label>
          <Textarea
            placeholder="Enter any text you want to encode"
            value={inputs.text || ''}
            onChange={(e) => handleInputChange('text', e.target.value)}
            className="min-h-24"
          />
        </div>
      )}

      {toolType === 'url' && (
        <div>
          <label className="block text-sm font-medium mb-2">URL</label>
          <Input
            type="url"
            placeholder="https://example.com"
            value={inputs.url || ''}
            onChange={(e) => handleInputChange('url', e.target.value)}
          />
        </div>
      )}

      {toolType === 'vcard' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <Input
              placeholder="John Doe"
              value={inputs.name || ''}
              onChange={(e) => handleInputChange('name', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Phone</label>
            <Input
              placeholder="+1 (555) 000-0000"
              value={inputs.phone || ''}
              onChange={(e) => handleInputChange('phone', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <Input
              type="email"
              placeholder="john@example.com"
              value={inputs.email || ''}
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Organization</label>
            <Input
              placeholder="Your Company"
              value={inputs.organization || ''}
              onChange={(e) => handleInputChange('organization', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Website</label>
            <Input
              type="url"
              placeholder="https://example.com"
              value={inputs.website || ''}
              onChange={(e) => handleInputChange('website', e.target.value)}
            />
          </div>
        </div>
      )}

      {toolType === 'wifi' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Network Name (SSID)</label>
            <Input
              placeholder="WiFi Name"
              value={inputs.ssid || ''}
              onChange={(e) => handleInputChange('ssid', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <Input
              type="password"
              placeholder="WiFi Password"
              value={inputs.password || ''}
              onChange={(e) => handleInputChange('password', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Security Type</label>
            <select
              value={inputs.security || 'WPA'}
              onChange={(e) => handleInputChange('security', e.target.value)}
              className="w-full px-3 py-2 bg-input border border-white/10 rounded-lg"
            >
              <option>WPA</option>
              <option>WEP</option>
              <option>nopass</option>
            </select>
          </div>
        </div>
      )}

      {toolType === 'email' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Email Address</label>
            <Input
              type="email"
              placeholder="recipient@example.com"
              value={inputs.emailTo || ''}
              onChange={(e) => handleInputChange('emailTo', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Subject</label>
            <Input
              placeholder="Email Subject"
              value={inputs.subject || ''}
              onChange={(e) => handleInputChange('subject', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Message</label>
            <Textarea
              placeholder="Email body"
              value={inputs.body || ''}
              onChange={(e) => handleInputChange('body', e.target.value)}
              className="min-h-24"
            />
          </div>
        </div>
      )}

      {toolType === 'sms' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Phone Number</label>
            <Input
              placeholder="+1 (555) 000-0000"
              value={inputs.phone || ''}
              onChange={(e) => handleInputChange('phone', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Message</label>
            <Textarea
              placeholder="SMS text"
              value={inputs.message || ''}
              onChange={(e) => handleInputChange('message', e.target.value)}
              className="min-h-24"
            />
          </div>
        </div>
      )}

      {toolType === 'whatsapp' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Phone Number (with country code)</label>
            <Input
              placeholder="1234567890"
              value={inputs.whatsappPhone || ''}
              onChange={(e) => handleInputChange('whatsappPhone', e.target.value)}
            />
            <p className="text-xs text-foreground/50 mt-2">Include country code, e.g., 1 for USA</p>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Message (optional)</label>
            <Textarea
              placeholder="WhatsApp message"
              value={inputs.whatsappMessage || ''}
              onChange={(e) => handleInputChange('whatsappMessage', e.target.value)}
              className="min-h-24"
            />
          </div>
        </div>
      )}

      {toolType === 'event' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Event Title</label>
            <Input
              placeholder="My Awesome Event"
              value={inputs.eventTitle || ''}
              onChange={(e) => handleInputChange('eventTitle', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Date & Time</label>
            <Input
              type="datetime-local"
              value={inputs.eventDate || ''}
              onChange={(e) => handleInputChange('eventDate', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <Textarea
              placeholder="Event details"
              value={inputs.eventDesc || ''}
              onChange={(e) => handleInputChange('eventDesc', e.target.value)}
              className="min-h-24"
            />
          </div>
        </div>
      )}
    </div>
  )
}
