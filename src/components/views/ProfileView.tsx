'use client'

import { useState } from 'react'
import { User, Bell, Shield, Key, Mail, Phone, MapPin, Calendar, Save } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { Separator } from '@/components/ui/Separator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar'
import { Badge } from '@/components/dashboard/Badge'
import { cn } from '@/utils/cn'

type Tab = 'general' | 'security' | 'notifications' | 'privacy'

export function ProfileView() {
  const [activeTab, setActiveTab] = useState<Tab>('general')

  const tabs = [
    { id: 'general' as Tab, label: 'General', icon: User },
    { id: 'security' as Tab, label: 'Security', icon: Shield },
    { id: 'notifications' as Tab, label: 'Notifications', icon: Bell },
    { id: 'privacy' as Tab, label: 'Privacy', icon: Key },
  ]

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold">Profile Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
        {/* Tabs Sidebar */}
        <Card className="p-4 h-fit">
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted'
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              )
            })}
          </nav>
        </Card>

        {/* Content Area */}
        <div className="space-y-6">
          {activeTab === 'general' && <GeneralTab />}
          {activeTab === 'security' && <SecurityTab />}
          {activeTab === 'notifications' && <NotificationsTab />}
          {activeTab === 'privacy' && <PrivacyTab />}
        </div>
      </div>
    </div>
  )
}

function GeneralTab() {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Profile Information</h3>
        
        {/* Avatar Section */}
        <div className="flex items-center gap-4 mb-6">
          <Avatar className="h-20 w-20">
            <AvatarImage src="https://github.com/shadcn.png" alt="User" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="success">Online</Badge>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline">Change Avatar</Button>
              <Button size="sm" variant="ghost">Remove</Button>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Form Fields */}
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" defaultValue="John" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" defaultValue="Doe" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">
              <Mail className="h-4 w-4 inline mr-2" />
              Email
            </Label>
            <Input id="email" type="email" defaultValue="john.doe@example.com" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">
              <Phone className="h-4 w-4 inline mr-2" />
              Phone Number
            </Label>
            <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">
              <MapPin className="h-4 w-4 inline mr-2" />
              Location
            </Label>
            <Input id="location" defaultValue="San Francisco, CA" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <textarea
              id="bio"
              className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
              defaultValue="Software developer passionate about creating beautiful user experiences."
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline">Cancel</Button>
          <Button>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </Card>
    </div>
  )
}

function SecurityTab() {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Change Password</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input id="currentPassword" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input id="newPassword" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input id="confirmPassword" type="password" />
          </div>
          <Button>Update Password</Button>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Two-Factor Authentication</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Add an extra layer of security to your account
        </p>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">2FA Status</p>
            <p className="text-sm text-muted-foreground">Not enabled</p>
          </div>
          <Button>Enable 2FA</Button>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Active Sessions</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <p className="font-medium">Current Session</p>
              <p className="text-sm text-muted-foreground">San Francisco, CA • Chrome</p>
              <p className="text-xs text-muted-foreground">Last active: Just now</p>
            </div>
            <Badge variant="success">Active</Badge>
          </div>
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <p className="font-medium">iPhone 14 Pro</p>
              <p className="text-sm text-muted-foreground">New York, NY • Safari</p>
              <p className="text-xs text-muted-foreground">Last active: 2 hours ago</p>
            </div>
            <Button variant="ghost" size="sm">Revoke</Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

function NotificationsTab() {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Email Notifications</h3>
        <div className="space-y-4">
          <NotificationToggle
            title="Product Updates"
            description="News about product and feature updates"
            defaultChecked
          />
          <NotificationToggle
            title="Security Alerts"
            description="Important security notifications"
            defaultChecked
          />
          <NotificationToggle
            title="Weekly Reports"
            description="Weekly summary of your activity"
          />
          <NotificationToggle
            title="Marketing Emails"
            description="Receive tips, offers, and promotions"
          />
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Push Notifications</h3>
        <div className="space-y-4">
          <NotificationToggle
            title="New Messages"
            description="Get notified when you receive a new message"
            defaultChecked
          />
          <NotificationToggle
            title="Task Reminders"
            description="Reminders for upcoming tasks and deadlines"
            defaultChecked
          />
          <NotificationToggle
            title="Team Activity"
            description="Updates from your team members"
          />
        </div>
      </Card>
    </div>
  )
}

function PrivacyTab() {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Privacy Settings</h3>
        <div className="space-y-4">
          <NotificationToggle
            title="Profile Visibility"
            description="Make your profile visible to other users"
            defaultChecked
          />
          <NotificationToggle
            title="Show Online Status"
            description="Let others see when you're online"
            defaultChecked
          />
          <NotificationToggle
            title="Activity Status"
            description="Share your activity status with others"
          />
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Data & Privacy</h3>
        <div className="space-y-3">
          <Button variant="outline" className="w-full justify-start">
            <Calendar className="h-4 w-4 mr-2" />
            Download Your Data
          </Button>
          <Button variant="outline" className="w-full justify-start">
            View Privacy Policy
          </Button>
          <Separator />
          <Button variant="destructive" className="w-full justify-start">
            Delete Account
          </Button>
        </div>
      </Card>
    </div>
  )
}

interface NotificationToggleProps {
  title: string
  description: string
  defaultChecked?: boolean
}

function NotificationToggle({ title, description, defaultChecked }: NotificationToggleProps) {
  const [checked, setChecked] = useState(defaultChecked || false)

  return (
    <div className="flex items-center justify-between p-3 border rounded-lg">
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:bg-primary peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-background after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
      </label>
    </div>
  )
}
