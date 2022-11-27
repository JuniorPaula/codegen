# Simple Codegen of JavaScript 

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white)


Simple codegen of generate yours domain's layers dinamic.

Requirements system
- Node
- npm

Clone the project and run the `npm install` command to install the dependencies.

~~~javascript
npm install
~~~

Run `npm link` to set binary in your path

~~~javascript
npm link
~~~
#### verify if codegen was installed
`in your terminal`
~~~javascript
codegen --help
~~~

### Generate yours domain's skeleton
`in your terminal`
~~~javascript
mkdir myApp
cd myapp
codegen skeleton -c product -c person -c account
~~~

#### to remove the binary in your path
~~~javascript
npm unlink -g codegen
~~~