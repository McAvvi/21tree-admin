import { type SystemAnnouncement } from './schema'

export const systemAnnouncements: SystemAnnouncement[] = [
  {
    id: '1',
    title: 'Scheduled Maintenance - Database Upgrade',
    type: 'maintenance',
    priority: 'high',
    status: 'scheduled',
    description:
      'We will be performing a database upgrade to improve performance. Expected downtime is 2 hours.',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    scheduledFor: '2024-01-20T02:00:00Z',
    expiresAt: '2024-01-20T04:00:00Z',
    author: 'System Admin',
  },
  {
    id: '2',
    title: 'New Feature: Advanced Analytics Dashboard',
    type: 'feature',
    priority: 'medium',
    status: 'active',
    description:
      'We have launched a new analytics dashboard with enhanced reporting capabilities and real-time data visualization.',
    createdAt: '2024-01-10T09:00:00Z',
    updatedAt: '2024-01-10T09:00:00Z',
    author: 'Product Team',
  },
  {
    id: '3',
    title: 'Terms of Service Update',
    type: 'terms',
    priority: 'high',
    status: 'active',
    description:
      'Our Terms of Service have been updated to reflect new privacy regulations. Please review the changes.',
    createdAt: '2024-01-08T14:00:00Z',
    updatedAt: '2024-01-08T14:00:00Z',
    author: 'Legal Team',
  },
  {
    id: '4',
    title: 'Security Alert: Password Reset Required',
    type: 'security',
    priority: 'critical',
    status: 'active',
    description:
      'As a precautionary measure, we require all users to reset their passwords due to a potential security vulnerability.',
    createdAt: '2024-01-05T16:00:00Z',
    updatedAt: '2024-01-05T16:00:00Z',
    author: 'Security Team',
  },
  {
    id: '5',
    title: 'Feature Release: Dark Mode Support',
    type: 'feature',
    priority: 'low',
    status: 'archived',
    description:
      'Dark mode is now available in your settings. Toggle it on/off based on your preference.',
    createdAt: '2024-01-01T08:00:00Z',
    updatedAt: '2024-01-01T08:00:00Z',
    author: 'UI Team',
  },
  {
    id: '6',
    title: 'Maintenance Complete - API Performance Improvements',
    type: 'maintenance',
    priority: 'medium',
    status: 'archived',
    description:
      'The scheduled maintenance for API performance improvements has been completed successfully.',
    createdAt: '2023-12-28T12:00:00Z',
    updatedAt: '2023-12-28T18:00:00Z',
    scheduledFor: '2023-12-28T14:00:00Z',
    expiresAt: '2023-12-28T18:00:00Z',
    author: 'Infrastructure Team',
  },
]

// Helper function to get announcements by type
export function getAnnouncementsByType(
  type: SystemAnnouncement['type']
): SystemAnnouncement[] {
  return systemAnnouncements.filter(
    (announcement) => announcement.type === type
  )
}

// Helper function to get announcements by status
export function getAnnouncementsByStatus(
  status: SystemAnnouncement['status']
): SystemAnnouncement[] {
  return systemAnnouncements.filter(
    (announcement) => announcement.status === status
  )
}

// Helper function to get announcements by priority
export function getAnnouncementsByPriority(
  priority: SystemAnnouncement['priority']
): SystemAnnouncement[] {
  return systemAnnouncements.filter(
    (announcement) => announcement.priority === priority
  )
}
