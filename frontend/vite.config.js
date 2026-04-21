import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        events: 'events.html',
        login: 'login.html',
        register: 'register.html',
        eventDetail: 'event-detail.html',
        adminDashboard: 'admin-dashboard.html',
        myBookings: 'my-bookings.html'
      }
    }
  }
})