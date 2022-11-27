import templates from './templates/index.js'

export default function createFile({ mainPath, defaultMainFolder, layers, componentName }) {
   const keys = Object.keys(templates)
   
   for (const layer of layers) {
    const chosenTemplate = keys.find(key => key.includes(layer))
    if (!chosenTemplate) return { error: 'the chosen layer doesnt have a template' }
   }
}