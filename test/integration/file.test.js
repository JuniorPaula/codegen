import { expect, describe, test, jest, beforeEach, beforeAll, afterAll } from '@jest/globals'

import { tmpdir } from 'os'
import { join } from 'path'
import fsPromises from 'fs/promises'

import createLayersIfNotExists from '../../src/createLayers.js'
import createFiles from '../../src/createFiles.js'
import Util from '../../src/util.js'

function getAllFunctionsFromInstance(instance) {
    return Reflect.ownKeys(Reflect.getPrototypeOf(instance))
            .filter(method => method !== 'constructor')
}

function generateFilePath({ mainPath, defaultMainFolder, layers, componentName }) {
    return layers.map(layer => {
        const fileName = `${componentName}${Util.upperCaseFirstLetter(layer)}.js`
        return join(mainPath, defaultMainFolder, layer, fileName)
    })
}

describe('#Integration - Files - Files Structure', () => {
    const config = {
        defaultMainFolder: 'src',
        mainPath: '',
        layers: ['service', 'repository', 'factory'].sort(),
        componentName: 'heroes'
    }

    const packageJSON = 'package.json'
    const packageJSONLocation = join('./test/integration/mocks', packageJSON)

    beforeAll(async () => {
        config.mainPath = await fsPromises.mkdtemp(join(tmpdir(), 'layers-'))
        await fsPromises.copyFile(packageJSONLocation, join(config.mainPath, packageJSON))
        await createLayersIfNotExists(config)
    })

    beforeEach(() => {
        jest.restoreAllMocks()
        jest.clearAllMocks()
    })

    afterAll(async () => {
        await fsPromises.rm(config.mainPath, { recursive: true })
    })

    test('Repository class should have, create, read, update, delete methods', async () => {
        const myConfig = {
            ...config,
            layers: ['repository']
        }

        await createFiles(myConfig)
        const [ repositoryFile ] = generateFilePath(myConfig)
        const { default: Repository } = await import(repositoryFile)
        
        const instance = new Repository()

        const expectedNotImplemented = fn => expect(() => fn.call()).rejects.toEqual('method not implemented!')

        expectedNotImplemented(instance.create)
        expectedNotImplemented(instance.read)
        expectedNotImplemented(instance.update)
        expectedNotImplemented(instance.delete)
    })
    test('Service class should have the same signature of Repository and call all its methods', async () => {
        const myConfig = {
            ...config,
            layers: ['repository', 'service']
        }

        await createFiles(myConfig)
        const [ repositoryFile, serviceFile ] = generateFilePath(myConfig)
        const { default: Repository } = await import(repositoryFile)
        const { default: Service } = await import(serviceFile)
        
        const repository = new Repository()
        const service = new Service({ repository })

        const allRepositoryMethods = getAllFunctionsFromInstance(repository)
        allRepositoryMethods.forEach(method => jest.spyOn(repository, method).mockResolvedValue())

        getAllFunctionsFromInstance(service)
            .forEach(method => service[method].call(service, []))

        allRepositoryMethods.forEach(method => expect(repository[method]).toHaveBeenCalled())
        
    })
    test.todo('Factory instance should match layers')
})