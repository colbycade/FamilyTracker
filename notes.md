The public elastic IP address for the EC2 instance is `35.171.103.204`
### To `ssh` into web server: 
`ssh -i <path_to_pem> ubuntu@35.171.103.204` (or `ubuntu@family-tasks.app`)

The domain name for the family tasks app is [family-tasks.app](https://family-tasks.app).
The domain for the main portfolio page is [portfolio.family-tasks.app](https://portfolio.family-tasks.app)
Any subdomains also redirect, such as [example.family-tasks.app](https://example.family-tasks.app).

### Deployment:
To deploy family tasks react service:
<br>`./deployService.sh -k <path_to_pem> -h family-tasks.app -s family`

To deploy static portfolio page:
<br>`./portfolio/deployStatic.sh -k <path_to_pem> -h family-tasks.app`

Caddy commands:
<br>`sudo systemctl [status/stop/start/restart/reload] caddy`


## Technologies
The toolchain that we use for this React project consists of GitHub as the code repository, Vite for JSX, TS, development and debugging support, ESBuild for converting to ES6 modules and transpiling (with Babel underneath), Rollup for bundling and tree shaking, PostCSS for CSS transpiling, and finally a simple bash script (deployService.sh) for deployment.