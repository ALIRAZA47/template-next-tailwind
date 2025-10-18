import { redirect } from 'next/navigation'
import { ROUTES } from '@/constants/routes.const'

export default function Home() {
  redirect(ROUTES.DASHBOARD)
}

