export const projects = [
  {
    id: 'spring',
    images: [
      'photo-40',
      'photo-24',
      'photo-31',
      'photo-38',
      'photo-18',
      'photo-29',
    ],
  },
  {
    id: 'vineyards',
    images: [
      'photo-3',
      'photo-11',
      'photo-34',
      'photo-25',
      'photo-9',
      'photo-41',
      'photo-30',
      'photo-16',
      'photo-6',
      'photo-27',
    ],
  },
  {
    id: 'renovation',
    images: ['photo-35', 'photo-1', 'photo-14', 'photo-37', 'photo-2'],
  },
  { id: 'chenin', images: ['photo-26'] },
] as const

export type ProjectId = (typeof projects)[number]['id']

// Register a project only when its page exists; keep the curated source order
const projectPaths: Partial<Record<ProjectId, string>> = {
  spring: '/photos/spring',
  vineyards: '/photos/vineyards',
  renovation: '/photos/renovation',
}

export const galleryProjects = projects.flatMap(project => {
  const path = projectPaths[project.id]

  return path ? [{ ...project, path }] : []
})

export const homePhotos = ['cellar', 'photo-10', 'pruned-vines'] as const
