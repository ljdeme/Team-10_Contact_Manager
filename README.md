# Team-10 Contact Manager
Repository for Team-10 contact manager

# Git Set up
1. Create a token
  a. go to profile icon (top right of the screen) and look at the drop down menu
  b. go to settings
  c. go to develeoper settings (last option on the tab on the left of screen)
  d. go to Personal Access Tokens
  e. select tokens (classic)
  f. generate a new token (classic)
      i. Note = name of token
      ii. Select No expiration
      iii. Checkmark all options for each box
      iv. copy/paste and save token id
  
2. Initialize git in the file location: 'git init'

3. Clone repository in the desired file location: 
  a. In an ubuntu/linux terminal 'cd' to the desired file location
  b. then enter 'git clone https://github.com/ljdeme/Team-10_Contact_Manager.git' into the commandline 
  
# Git Crash-Course
1. To pull from repository
  - 'git pull https://github.com/ljdeme/Team-10_Contact_Manager.git'
  
2. To push changes to repository 
  a. To see the files with changes: 'git status https://github.com/ljdeme/Team-10_Contact_Manager.git' 
  b. Stage files before commiting:
    i. To add files to stage: 'git add [filename]'
  c. Commit Files:
    'git commit -m [add a short message about what you changed/worked on]
  d. Push file to repository: 'git push https://github.com/ljdeme/Team-10_Contact_Manager.git'
    - enter git username
    - enter the token you created for the password

## ! Important Notes !
1. Always get most update version of the repository before making changes
2. Keep your token somewhere you can easily access
