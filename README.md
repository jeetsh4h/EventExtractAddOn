This is a project under development by Jeet Shah, Archit Murali, Suyash Lal  
for the CSIT205 course of FLAME University in the academic year 2022-23.  

---

Our project first started with the idea of building a Peer-Tutor app for the university, this meant allowing users to find tutors that are free at the
same time as them, while having the same _expertise_ in which a peer requires help. The reason we pivoted from this idea was a lack of traction when we 
conducted surveys. The results of the same are published in the repository above.  
The code for the web app (FLAMETutoring) has also been uploaded. The code only deals with the OAuth flow of the app and building the basic factory function
for the Flask App. Moroever, a basic implementation of a sqlite database is also present.

---

We ideated for a while until we landed on the idea of building an add-on for our univerity gmail accounts. The add-on extracts dates using RegEx and gives the 
user the option to create a Google Calendar event based on the same. The app currently is a proof of concept, with a lot of functionality left to be built; the 
major one is the taking help from Google's NLP model to extract events from emails rather than RegExes. This addition will allow the add-on to be a lot more 
generalised, and have a lower rate of error.  

Sequential diagrams and other methods to work on the app are also published in addition to the two files of source code.  
The add-on is written with Google Scripts, this has been a great hindrance for us. The language is not well supported and the Scripts Editor is extremely tedious 
to work with. We would like to have worked on our UI but there seems to be almost no obvious way to do the same.

The add-on has been deployed and published onto the Google Workspace Marketplace; here is the link for it to be installed.  
https://workspace.google.com/marketplace/app/event_extract/325884662897

### Flow of the App

![WhatsApp Image 2023-04-27 at 16 11 23](https://user-images.githubusercontent.com/113101433/234862703-94474df6-fdfc-4893-ad7f-392a6dff0eda.jpeg)  

![WhatsApp Image 2023-04-27 at 16 12 17](https://user-images.githubusercontent.com/113101433/234862839-2397469f-e87e-4a4b-8865-05d9c2cdd043.jpeg)

![WhatsApp Image 2023-04-27 at 16 13 02](https://user-images.githubusercontent.com/113101433/234862872-d44b6fe5-b1f3-46cc-97e5-210f09a02096.jpeg)

![WhatsApp Image 2023-04-27 at 16 13 14](https://user-images.githubusercontent.com/113101433/234862887-315d194a-aa4d-451a-842f-f1013c1dd80a.jpeg)

*One can also send feedback, if a date that should show up did not. We will edit the RegEx to add that format.*   

![WhatsApp Image 2023-04-27 at 16 14 03](https://user-images.githubusercontent.com/113101433/234862906-d42ba234-0c52-4a6c-bf65-57edfb5c523a.jpeg)

![WhatsApp Image 2023-04-27 at 16 14 13](https://user-images.githubusercontent.com/113101433/234862927-04bfc793-0af0-4081-acac-44054a8ffdcd.jpeg)

![WhatsApp Image 2023-04-27 at 16 15 42](https://user-images.githubusercontent.com/113101433/234862958-172da688-447e-4af1-92d9-d37267709e4f.jpeg)

There is a limitation with the API call for Google Calendar that we are using; it does not let us make an event in the past. This will be changed.  
