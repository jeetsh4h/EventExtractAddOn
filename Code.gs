function loadAddOn(event) {
  var messageId = event.gmail.messageId;
  GmailApp.setCurrentMessageAccessToken(event.gmail.accessToken);
  var message = GmailApp.getMessageById(messageId);
  var subject = message.getSubject();
  var body = message.getPlainBody();
/* debugging */
  // Logger.log(subject);
/* debugging */

  var sentences = getSentencesWithDateTime(body);
  var dates = getDateTimeFromSentence(sentences);

  deadlineCard = CardService.newCardBuilder();

  if (sentences.length) {
    for (var i = 0; i < sentences.length; i++) {
      calendarAction = CardService.newAction()
                          .setFunctionName("buildCalendarInterface")
                          .setParameters({"date": dates[i], "subject": subject});
      sectionDeadline = CardService.newCardSection();
      sectionDeadline.addWidget(CardService.newTextParagraph()
                                  .setText((i+1) + ") Deadline in the sentence: \n\"" + sentences[i] + "\""));
      sectionDeadline.addWidget(CardService.newTextButton()
                                  .setText("Create Calendar Event")
                                  .setOnClickAction(calendarAction));
      deadlineCard.addSection(sectionDeadline);
    }
  } else {
    sectionNoneFound = CardService.newCardSection()
    sectionNoneFound.addWidget(CardService.newTextParagraph()
                                  .setText("No Date/Time found."));
    deadlineCard.addSection(sectionNoneFound);
  }

  var feedbackAction = CardService.newAction()
                          .setFunctionName("feedbackSend")
                          .setParameters({"body": body});
  sectionFeedback = CardService.newCardSection();
  sectionFeedback.addWidget(CardService.newTextParagraph()
                              .setText("If a date is missing:"));  
  sectionFeedback.addWidget(CardService.newTextButton()
                              .setText("Send Email Body")
                              .setOnClickAction(feedbackAction))
  deadlineCard.addSection(sectionFeedback);

  return [deadlineCard.build()];
}


function getSentencesWithDateTime(body) {
  var regex = /.*?(?:(?:TODAY|TOMORROW|MONDAY|TUESDAY|WEDNESDAY|THURSDAY|FRIDAY|SATURDAY|SUNDAY)\s*,?\s+)?(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2}(?:\s*,?\s+\d{4})?(?:\s+by\s+\d{1,2}(?::\d{2})?\s*[AP]M)?\s*[.,]?.*/ig;

  var sentences = [];
  var matches = body.match(regex);

  if (matches) {
    for (var i = 0; i < matches.length; i++) {
      sentences.push(matches[i]);
    }
  }

  return sentences;
}


function getDateTimeFromSentence(sentences) {
  var regex = /(?:(?:TODAY|TOMORROW|MONDAY|TUESDAY|WEDNESDAY|THURSDAY|FRIDAY|SATURDAY|SUNDAY)\s*,?\s+)?(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2}(?:\s*,?\s+\d{4})?(?:\s+by\s+\d{1,2}(?::\d{2})?\s*[AP]M)?\s*[.,]?.*/i;

  var dates = [];
  for (var i = 0; i < sentences.length; i++) {
    var matches = sentences[i].match(regex);
/* debugging */
    // Logger.log(matches);
    // Logger.log(sentences);
/* debugging */

    /* assuming the sentences will show up twice if there are multiple date/time in that sentence */
    if (matches) {  
      dates.push(matches[0]);
    }
/* debugging */
    // Logger.log(matches[0]);
  }

  return dates;
}


function buildCalendarInterface(event) {
  var subject = event.parameters.subject;
  var date = event.parameters.date;

  calendarInterfaceCard = CardService.newCardBuilder();

  titleSection = CardService.newCardSection();
  titleSection.addWidget(CardService.newTextInput()
                            .setFieldName("title")
                            .setValue(subject)
                            .setTitle("Title")
                            .setMultiline(true));
  calendarInterfaceCard.addSection(titleSection);

  startDateSection = CardService.newCardSection();
  startDateSection.addWidget(CardService.newTextInput()
                                .setFieldName("startDate")
                                .setValue(date)
                                .setTitle("Start Date-Time"));
  calendarInterfaceCard.addSection(startDateSection);

  endDateSection = CardService.newCardSection();
  endDateSection.addWidget(CardService.newTextInput()
                              .setFieldName("endDate")
                              .setValue(date)
                              .setTitle("End Date-Time"));
  calendarInterfaceCard.addSection(endDateSection);
  
  // startTimeSection = CardService.newCardSection();
  // startTimeSection.addWidget(CardService.newTextInput()
  //                               .setFieldName("startTime")
  //                               // .setValue(time)
  //                               .setTitle("Start Time"));
  // calendarInterfaceCard.addSection(startTimeSection);

  // endTimeSection = CardService.newCardSection();
  // endTimeSection.addWidget(CardService.newTextInput()
  //                             .setFieldName("endTime")
  //                             // .setValue(time)
  //                             .setTitle("End Time"));
  // calendarInterfaceCard.addSection(endTimeSection);
  
  var eventAction = CardService.newAction()
                      .setFunctionName("createEventFromInput");
  eventBuilderSection = CardService.newCardSection();
  eventBuilderSection.addWidget(CardService.newTextButton()
                                  .setText("Create Event")
                                  .setOnClickAction(eventAction));
  calendarInterfaceCard.addSection(eventBuilderSection);

  return [calendarInterfaceCard.build()];
}


function feedbackSend(event) {
  var body = event.parameters.body;

  feedbackCard = CardService.newCardBuilder();
  feedbackCard.addSection(CardService.newCardSection()
                            .addWidget(CardService.newTextParagraph()
                                          .setText("Thank you for your feedback. We will look into it.")));
/* actually do something with the feedback */
  Logger.log(body);

  return [feedbackCard.build()]
}


function createEventFromInput(event) {
  var title = event.formInput.title;
  var startDate = event.formInput.startDate;
  var endDate = event.formInput.endDate;
  // var startTime = event.formInput.startTime;
  // var endTime = event.formInput.endTime;

/* improve this, have to play around with it
 * depending on userfeedback, currently it 
 * can only build events in the future, past 
 * events don't work very well */
  var calEvent = CalendarApp.getDefaultCalendar()
                      .createEventFromDescription("from" +  startDate + "to" + endDate);

/* debugging */
  // Logger.log(calEvent.getEndTime());
/* debugging */

  confirmCard = CardService.newCardBuilder();
  sectionConfirm = CardService.newCardSection();
  sectionConfirm.addWidget(CardService.newTextParagraph()
                              .setText("Event has been created."));
  confirmCard.addSection(sectionConfirm);

  return [confirmCard.build()]
}


