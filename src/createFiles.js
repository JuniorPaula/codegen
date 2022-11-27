import fsPromises from 'fs/promises'
import templates from './templates/index.js'
import Util from './util.js'

const defaultDEpendencies = (layer, componentName) => {
    const dependencies = {
        repository: [],
        service: [`${componentName}/Repository`],
        factory: [`${componentName}/Repository`, `${componentName}/Service`]
    }

    return dependencies[layer].map(Util.lowerCaseFirstLetter)
}

async function executeWrites(penddingFilesToWrite) {
    return Promise.all(
        penddingFilesToWrite.map(({ fileName, txtFile }) => fsPromises.writeFile(fileName, txtFile))
    )
}

export default async function createFile({ mainPath, defaultMainFolder, layers, componentName }) {
   const keys = Object.keys(templates)
   const penddingFilesToWrite = []

   for (const layer of layers) {
        const chosenTemplate = keys.find(key => key.includes(layer))
        if (!chosenTemplate) return { error: 'the chosen layer doesnt have a template' }

        const template = templates[chosenTemplate]
        const targetFolder = `${mainPath}/${defaultMainFolder}/${layer}`
        const dependencies = defaultDEpendencies(layer, componentName)
        const { fileName: className, template: txtFile } = template(componentName, ...dependencies)
        const fileName = `${targetFolder}/${Util.lowerCaseFirstLetter(className)}.js`
        penddingFilesToWrite.push({ fileName, txtFile })
    }
    await executeWrites(penddingFilesToWrite)
    return { success: true }
}