import { computed } from 'vue'

import applicationsData from '~~/data/applications.json'
import type { LocalizedApplicationScene } from '~~/types'
import { localizeApplication } from '~~/utils/catalog'
import { normalizeLocale } from '~~/utils/localized'

const applications = applicationsData as LocalizedApplicationScene[]

export const useApplications = () => {
  const { locale } = useI18n()
  const currentLocale = computed(() => normalizeLocale(locale.value))
  const allApplications = computed(() =>
    applications.map((application) => localizeApplication(application, currentLocale.value))
  )
  const fetchApplications = async () => allApplications.value

  const getApplicationById = (id: string) =>
    allApplications.value.find((application) => application.id === id)

  const getApplicationBySlug = (slug: string) =>
    allApplications.value.find((application) => application.slug === slug)

  const getApplicationsByIds = (ids: string[]) =>
    allApplications.value.filter((application) => ids.includes(application.id))

  return {
    applications: allApplications,
    fetchApplications,
    getApplicationById,
    getApplicationBySlug,
    getApplicationsByIds
  }
}
