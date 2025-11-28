**Project overview**
The goal of this project is to develop an application that manages tasks within a small team while being totally aligned with the business rules and existing data of the company.

**Naming Convention and structure**
"Task Manager Application" or "TMA": the application to be developped
"Humegacy": the existing legacy application containing data related to the catalog
"Project": top level
"Workstream": level 1, each project is divided into a few workstream
"Task Group": level 2, contains a group of tasks and a global deadline
"Task": level 3, contains most of the data with the duration / deadline, status, owner, ...
"checklist": level 4, optional, contains a todo list in a task
"Owner": the person responsible for the execution of the task
"Reviewer": the person responsible for the validation
"Deliverable": the output of the project, such as an story, an article or a poster.
"Article": the product in catalog, which contains 1 or more Deliverable
Deliverable and Article are managed in Humegacy and are out of the area of the TMA

**Global Features**
- list of Tasks related to a Project
- list of Project with status of selected Task type as column
- list of Tasks and workload by Owner
- various status and warnings calculated form the Tasks status and deadline/duration
- deadlines are set by fix date or a number of working days related to the Project reference date
- the start of Task can depend or not on the completion of multiple other Tasks or Group of Tasks
- each Task belong to a type of task with predefined status
- a new Workstream can be created from a catalog of template containing all the Task Groups and Tasks predefined
- a Project can be linked to a Google Drive Folder with Task Group as sub folders
- a Project can be linked to a Deliverable (Humegacy application) and get information about both the Deliverable and the Article linked to it

**Stack**
developement stack: React, React Admin, Next.js, DynamoDB
Infrastructure: AWS, Dynamodb, S3, Lambda, AppSync, Incognito
CI/CD: Amplify Gen 2