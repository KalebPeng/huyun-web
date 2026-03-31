import { computed } from 'vue'

import applicationsData from '~~/data/applications.json'
import type { ApplicationScene } from '~~/types'

const applications = applicationsData as ApplicationScene[]

export const useApplications = () => {
  const allApplications = computed(() => applications)
  const fetchApplications = async () => applications

  const getApplicationById = (id: string) =>
    applications.find((application) => application.id === id)

  const getApplicationBySlug = (slug: string) =>
    applications.find((application) => application.slug === slug)

  const getApplicationsByIds = (ids: string[]) =>
    applications.filter((application) => ids.includes(application.id))

  return {
    applications: allApplications,
    fetchApplications,
    getApplicationById,
    getApplicationBySlug,
    getApplicationsByIds
  }
}
