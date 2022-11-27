import { expect, describe, test, jest, beforeEach } from '@jest/globals'
import createFile from '../../src/createFiles.js'

describe('#Layers - Folder Structure', () => {
    const defaultLayers = ['service', 'factory', 'repository']
    const config = { 
        mainPath: './', 
        defaultMainFolder: 'src', 
        layers: defaultLayers, 
        componentName: 'heroes' 
    }

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

    test.todo('repository should not add any additional dependency')

    test.todo('service should have repository as dependency')

    test.todo('factory should have repository and service as dependency')

})