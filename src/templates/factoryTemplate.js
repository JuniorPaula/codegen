import Util from '../util.js'

const serviceNameAnchor = '$$serviceName'
const repositoryNameAnchor = '$$repositoryName'

const serviceNameDependencyAnchor = '$$serviceNameDependency'
const repositoryNameDependencyAnchor = '$$repositoryNameDependency'

const componentNameAnchor = '$$componentName'

const template = `
import $$serviceName from '../service/$$serviceNameDependency.js'
import $$repositoryName from '../repository/$$repositoryNameDependency.js'

export default class $$componentNameFactory {
    static getInstance() {
        const repository = new $$repositoryName()
        const service = new $$serviceName({ repository })
        return service
    }
}`

export function factoryTemplate(componentName, repositoryName, serviceName) {
    const txtFile = template
        .replaceAll(componentNameAnchor, Util.upperCaseFirstLetter(componentName))
        .replaceAll(serviceNameDependencyAnchor, Util.lowerCaseFirstLetter(serviceName))
        .replaceAll(repositoryNameDependencyAnchor, Util.lowerCaseFirstLetter(repositoryName))
        .replaceAll(serviceNameAnchor, Util.upperCaseFirstLetter(serviceName))
        .replaceAll(repositoryNameAnchor, Util.upperCaseFirstLetter(repositoryName))

    return {
        fileName: `${componentName}Factory`,
        template: txtFile
    }
}
