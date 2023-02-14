# TutoringFLAME

This is a project under development by Jeet Shah, Archit Murali, Suyash Lal  
for the CSIT205 course of FLAME University in the academic year 2022-23.  

The web application is built using the Flask web framework and Bootstrap as a front-end framework.  
The database engine to be used is sql,, in the python module itself.  
^ This might not be necessary, as we might not get this to deploy in the near future,  
therefore, using sqlite should suffice.  
_will have to build in queing system to make sure there aren't a lot of concurrent writes_


- The app plans on being a place where it is easy for students to find a peer tutor for a given subject.  
It does not aim to replace the pre-existing structures of the Writing Centre and Q Centre, but build  
on top of it, integrating them into the app.  
- The app plans on using the Google's OAuth services as the only way to sign up, with the notifications  
being pushed as emails, with the current google sign up. We will restrict the sign ups to only happen  
via flame email ids.  
- Another plan, is to build a verified tutor system (this is where the integrations come in), the current  
plan is for the verification to occur by email replies.

As per the above requirements, this might lead to the app needing its own email address, and a way to automate  
reading the inbox of email as well as sending out mails.



_Note: There will be a need to use some vanilla javascript_

---

There are a couple sensitive files that you need to get from me for this to run.  
Ask them from me, once you have set up your environment.

You can set up to environment by creating a virtual enviornment using venv, and installing all the packages given  
in the requirements file that is uploaded, if there are any updates, I will commit it to the main branch.  
