The public elastic IP address for our web app is `52.3.100.168`
### To `ssh` into web server: 
`ssh -i "~/Desktop/BYU/CS260/wrightsaretough.pem" ubuntu@52.3.100.168` (or `ubuntu@familytracker.click`)

The domain name for the website is [familytracker.click](http://familytracker.click).  
Any subdomains also redirect, such as [example.familytracker.click](http://example.familytracker.click).

### To deploy:
`./deployService.sh -k ~/Desktop/BYU/CS260/wrightsaretough.pem -h familytracker.click -s startup`
