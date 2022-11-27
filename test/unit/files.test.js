import { expect, describe, test, jest, beforeEach } from '@jest/globals'
import fsPromises from 'fs/promises'

import createFile from '../../src/createFiles.js'
import templates from '../../src/templates/index.js'

describe('#Layers - Folder Structure', () => {
    const defaultLayers = ['service', 'factory', 'repository']
    const config = { 
        mainPath: './', 
        defaultMainFolder: 'src', 
        layers: defaultLayers, 
        componentName: 'heroes' 
    }

    const repositoryLayer = `${config.componentName}Repository`
    const serviceLayer = `${config.componentName}Service`

    beforeEach(() => {
        jest.restoreAllMocks()
        jest.clearAllMocks()
    })

    test('should not create file structure on inexistent templates', async () => {
        const myConfig = {
            ...config,
            layers: ['inexistent']
        }
        const expected = { error: 'the chosen layer doesnt have a template' }
        const result = await createFile(myConfig)
        
        expect(result).toStrictEqual(expected)
    })

    test('repository should not add any additional dependency', async () => {
        jest.spyOn(fsPromises, fsPromises.writeFile.name).mockResolvedValue()
        jest.spyOn(templates, templates.repositoryTemplate.name)
            .mockReturnValue({ fileName: '', template: '' })

        const myConfig = {
            ...config,
            layers: ['repository']
        }
        const expected = { success: true }
        const result = await createFile(myConfig)
        
        expect(result).toStrictEqual(expected)
        expect(fsPromises.writeFile).toHaveBeenCalledTimes(myConfig.layers.length)
        expect(templates.repositoryTemplate).toHaveBeenCalledWith(myConfig.componentName)
    })

    test('service should have repository as dependency', async () => {
        jest.spyOn(fsPromises, fsPromises.writeFile.name).mockResolvedValue()
        jest.spyOn(templates, templates.serviceTemplate.name)
            .mockReturnValue({ fileName: '', template: '' })

        const myConfig = {
            ...config,
            layers: ['repository', 'service']
        }
        const expected = { success: true }
        const result = await createFile(myConfig)
        
        expect(result).toStrictEqual(expected)
        expect(fsPromises.writeFile).toHaveBeenCalledTimes(myConfig.layers.length)
        expect(templates.serviceTemplate).toHaveBeenCalledWith(myConfig.componentName, repositoryLayer)
    })

    test.todo('factory should have repository and service as dependency')

})