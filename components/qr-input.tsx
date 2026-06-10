'use client'

import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Upload, Trash2, Plus, Loader2, FileUp, Link as LinkIcon } from 'lucide-react'

interface Props {
  toolType: string
  onValueChange: (value: string) => void
}

interface SocialLink {
  platform: string
  url: string
}

interface MenuItem {
  name: string
  description: string
  price: string
}

export default function QRInput({ toolType, onValueChange }: Props) {
  const [inputs, setInputs] = useState<Record<string, any>>({})
  const [uploading, setUploading] = useState(false)
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([{ platform: 'linkedin', url: '' }])
  const [menuItems, setMenuItems] = useState<MenuItem[]>([{ name: '', description: '', price: '' }])

  useEffect(() => {
    const value = generateQRValue()
    onValueChange(value)
  }, [inputs, socialLinks, menuItems, toolType])

  const handleInputChange = (field: string, value: any) => {
    setInputs(prev => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) throw new Error('Upload failed')

      const data = await res.json()
      
      // Store complete file metadata in inputs
      setInputs(prev => ({
        ...prev,
        fileUrl: data.fileUrl,
        fileName: data.fileName,
        fileSize: data.fileSize,
        fileType: data.fileType,
      }))
    } catch (err) {
      alert('Failed to upload file. Please try again.')
      console.error(err)
    } finally {
      setUploading(false)
    }
  }

  const handleRemoveFile = () => {
    setInputs(prev => {
      const next = { ...prev }
      delete next.fileUrl
      delete next.fileName
      delete next.fileSize
      delete next.fileType
      return next
    })
  }

  const addSocialLink = () => {
    setSocialLinks(prev => [...prev, { platform: 'linkedin', url: '' }])
  }

  const removeSocialLink = (index: number) => {
    setSocialLinks(prev => prev.filter((_, i) => i !== index))
  }

  const updateSocialLink = (index: number, key: keyof SocialLink, value: string) => {
    setSocialLinks(prev =>
      prev.map((item, i) => (i === index ? { ...item, [key]: value } : item))
    )
  }

  const addMenuItem = () => {
    setMenuItems(prev => [...prev, { name: '', description: '', price: '' }])
  }

  const removeMenuItem = (index: number) => {
    setMenuItems(prev => prev.filter((_, i) => i !== index))
  }

  const updateMenuItem = (index: number, key: keyof MenuItem, value: string) => {
    setMenuItems(prev =>
      prev.map((item, i) => (i === index ? { ...item, [key]: value } : item))
    )
  }

  const generateQRValue = (): string => {
    switch (toolType) {
      case 'text':
        return inputs.text || ''

      case 'url':
        return inputs.url || ''

      case 'file':
        // Return raw file URL for static preview, metadata serialized for backend
        return inputs.fileUrl ? JSON.stringify({
          type: 'file',
          fileUrl: inputs.fileUrl,
          fileName: inputs.fileName,
          fileSize: inputs.fileSize,
          fileType: inputs.fileType
        }) : ''

      case 'social':
        return JSON.stringify({
          type: 'social',
          profileName: inputs.profileName || '',
          bio: inputs.bio || '',
          links: socialLinks.filter(l => l.url.trim().length > 0),
        })

      case 'menu':
        return JSON.stringify({
          type: 'menu',
          restaurantName: inputs.restaurantName || '',
          description: inputs.description || '',
          currency: inputs.currency || '$',
          items: menuItems.filter(item => item.name.trim().length > 0),
        })

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

      {toolType === 'file' && (
        <div className="space-y-4">
          <label className="block text-sm font-medium">Upload File (PDF, DOCX, Images)</label>
          
          {!inputs.fileUrl ? (
            <div className="border-2 border-dashed border-white/20 hover:border-primary/50 transition duration-300 rounded-xl p-8 text-center relative flex flex-col items-center justify-center cursor-pointer">
              <input
                type="file"
                accept=".pdf,.docx,.doc,.png,.jpg,.jpeg,.gif,.webp"
                onChange={handleFileUpload}
                className="absolute inset-0 opacity-0 cursor-pointer"
                disabled={uploading}
              />
              {uploading ? (
                <div className="space-y-2 flex flex-col items-center">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  <p className="text-sm text-foreground/70">Uploading file, please wait...</p>
                </div>
              ) : (
                <div className="space-y-2 flex flex-col items-center">
                  <FileUp className="w-8 h-8 text-foreground/50" />
                  <p className="text-sm font-semibold">Click or drag file here to upload</p>
                  <p className="text-xs text-foreground/50">PDF, Resume, Images up to 10MB</p>
                </div>
              )}
            </div>
          ) : (
            <div className="glass p-4 rounded-xl flex items-center justify-between border border-primary/20">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <FileUp className="w-5 h-5" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-sm font-medium truncate">{inputs.fileName}</p>
                  <p className="text-xs text-foreground/50">
                    {(inputs.fileSize / 1024 / 1024).toFixed(2)} MB • {inputs.fileType.split('/')[1]?.toUpperCase() || 'FILE'}
                  </p>
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="text-red-500 hover:text-red-600 hover:bg-red-500/10 shrink-0"
                onClick={handleRemoveFile}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      )}

      {toolType === 'social' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Profile Name</label>
            <Input
              placeholder="e.g. John Doe"
              value={inputs.profileName || ''}
              onChange={(e) => handleInputChange('profileName', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Short Bio</label>
            <Textarea
              placeholder="Tell visitors about yourself"
              value={inputs.bio || ''}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              className="min-h-16"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Links</label>
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="border-white/10 text-xs h-7"
                onClick={addSocialLink}
              >
                <Plus className="w-3.5 h-3.5 mr-1" /> Add Link
              </Button>
            </div>

            {socialLinks.map((link, idx) => (
              <div key={idx} className="flex gap-2 items-center">
                <select
                  value={link.platform}
                  onChange={(e) => updateSocialLink(idx, 'platform', e.target.value)}
                  className="bg-input border border-white/10 rounded-lg px-2 py-2 text-sm text-foreground focus:outline-none focus:border-primary shrink-0"
                >
                  <option value="linkedin">LinkedIn</option>
                  <option value="github">GitHub</option>
                  <option value="twitter">Twitter</option>
                  <option value="instagram">Instagram</option>
                  <option value="facebook">Facebook</option>
                  <option value="website">Portfolio</option>
                </select>
                <Input
                  type="url"
                  placeholder="https://..."
                  value={link.url}
                  onChange={(e) => updateSocialLink(idx, 'url', e.target.value)}
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="text-red-500 hover:text-red-600 hover:bg-red-500/10 shrink-0"
                  onClick={() => removeSocialLink(idx)}
                  disabled={socialLinks.length <= 1}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {toolType === 'menu' && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-2">Restaurant / Catalog Title</label>
              <Input
                placeholder="My Bistro / Shop"
                value={inputs.restaurantName || ''}
                onChange={(e) => handleInputChange('restaurantName', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Currency</label>
              <select
                value={inputs.currency || '$'}
                onChange={(e) => handleInputChange('currency', e.target.value)}
                className="w-full bg-input border border-white/10 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary h-10"
              >
                <option value="$">USD ($)</option>
                <option value="€">EUR (€)</option>
                <option value="£">GBP (£)</option>
                <option value="₹">INR (₹)</option>
                <option value="¥">JPY (¥)</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <Input
              placeholder="Fresh organic ingredients daily"
              value={inputs.description || ''}
              onChange={(e) => handleInputChange('description', e.target.value)}
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Items List</label>
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="border-white/10 text-xs h-7"
                onClick={addMenuItem}
              >
                <Plus className="w-3.5 h-3.5 mr-1" /> Add Item
              </Button>
            </div>

            {menuItems.map((item, idx) => (
              <div key={idx} className="glass p-4 rounded-xl border border-white/5 space-y-3 relative">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="text-red-500 hover:text-red-600 hover:bg-red-500/10 absolute top-2 right-2"
                  onClick={() => removeMenuItem(idx)}
                  disabled={menuItems.length <= 1}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-2">
                    <Input
                      placeholder="Item Name (e.g. Classic Burger)"
                      value={item.name}
                      onChange={(e) => updateMenuItem(idx, 'name', e.target.value)}
                    />
                  </div>
                  <div>
                    <Input
                      placeholder="Price"
                      value={item.price}
                      onChange={(e) => updateMenuItem(idx, 'price', e.target.value)}
                    />
                  </div>
                </div>
                <Input
                  placeholder="Short description (e.g. Cheddar, lettuce, house sauce)"
                  value={item.description}
                  onChange={(e) => updateMenuItem(idx, 'description', e.target.value)}
                />
              </div>
            ))}
          </div>
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
              className="w-full px-3 py-2 bg-input border border-white/10 rounded-lg text-sm"
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

