// Notification System
import { CONFIG } from './config.js';

export class NotificationManager {
    constructor() {
        this.notifications = [];
    }

    show(message, type = 'info') {
        const notification = this.createNotification(message, type);
        document.body.appendChild(notification);
        this.notifications.push(notification);

     
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

    
        setTimeout(() => {
            this.remove(notification);
        }, CONFIG.NOTIFICATION_DURATION);

        return notification;
    }

    createNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        const colors = {
            success: '#10b981',
            error: '#ef4444',
            info: '#3b82f6',
            warning: '#f59e0b'
        };

        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '1rem 1.5rem',
            borderRadius: '10px',
            color: 'white',
            fontWeight: '500',
            zIndex: '10000',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            backgroundColor: colors[type] || colors.info
        });

        return notification;
    }

    remove(notification) {
        if (!notification || !notification.parentNode) return;

        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
            this.notifications = this.notifications.filter(n => n !== notification);
        }, 300);
    }

    clear() {
        this.notifications.forEach(notification => this.remove(notification));
    }
}


export const notifications = new NotificationManager();