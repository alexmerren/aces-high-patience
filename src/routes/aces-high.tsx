import { createFileRoute } from '@tanstack/react-router'
import { AcesHighPage } from '../pages/AcesHighPage';

export const Route = createFileRoute('/aces-high')({
  component: AcesHighPage,
})