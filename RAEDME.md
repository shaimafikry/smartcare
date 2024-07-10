# <h>Smart Care</h>


The Smart Care  System is designed to streamline the management of patient data throughout their stay at the hospital. This system aims to enhance efficiency, reduce paper loss incidents, and simplify access to patient records for healthcare professionals.

# Key Features

Patient Data Management: The system stores comprehensive patient data from admission until discharge, ensuring all relevant information is readily available.
User Management: It simplifies the process of managing users within the hospital environment, including assigning roles and permissions efficiently.
Paperless Operations: By digitizing patient records, the system significantly reduces the risk of losing important documents, contributing to a more organized and efficient workflow.
Easy Access for Healthcare Workers: The system provides healthcare workers with quick and easy access to patient data, enhancing decision-making processes and improving patient care.
Fast Admission Process: Designed to handle high volumes of admissions, the system streamlines the process, allowing hospitals to manage rushes effectively without compromising on service quality.

# Benefits

Efficiency: Streamlined processes for managing patient data and user assignments lead to improved operational efficiency.
Reduced Paperwork: Transitioning to a digital system minimizes the loss of critical documents, saving time and resources.
Improved Accessibility: Healthcare professionals have instant access to necessary patient information, facilitating better patient care.
Scalability: The system is built to scale, accommodating growth in patient volume and staff without significant increases in complexity or resource requirements.
This System represents a forward-thinking approach to hospital administration, leveraging technology to enhance patient care and operational efficiency.


# TARGET:
Workers on medical filed
# USE:
Organizing patient data once he admitted into hospital.
-  for example EMERGENCY department
# Range of use:
Limited to hospitals


# Technologies

Front-End Development
HTML/CSS/JavaScript: The core technologies for building the visual part of the website.
Responsive Design Frameworks: Bootstrap to ensure the site looks good on all screen sizes.
Front-End Frameworks/Libraries: jQuery for creating dynamic and interactive UI components.
Back-End Development
Server-Side Languages: Python (Flask)
Database Management System (DBMS): MySQL, JSON
APIs: RESTful 
Security
Authentication and Authorization: session management for secure login.
Access Control: Role-based access control (RBAC) to restrict data access based on user roles (e.g., doctors, nurses, administrators).


# Architecture

User Interface (UI): HTML/CSS/JavaScript, possibly enhanced with a framework/library for better interactivity.
Presentation Layer: Serves the UI to the client, ensuring data is presented in a user-friendly manner.
Application Layer: Contains business logic, rules, and controls. Interacts with the presentation layer and the database layer.
Business Logic Layer: Processes requests from the application layer, performs necessary actions, and returns responses.
Data Access Layer: Handles database operations, ensuring data integrity and security.
Database: Stores all patient data securely.
API Gateway: Acts as a single entry point for all client requests, directing them to the appropriate microservice.


# how to run
1 - install dependences 

2 - on the main directory run  " python3 webflask.app "

3 - open you default browser on localhost:5000

# team

* Saraa Talaat
* Mahmoud Fouad
* Shaimaa Fikry
