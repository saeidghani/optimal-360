const tableTemplate = () => {
  return `
       <table>
        <tbody class="text-editor-table">
          <tr>
            ${['Name', 'Relationship', 'Start Date', 'End Date'].map((txt) => `<td>${txt}</td>`)}
          </tr>

          <tr>
           
           ${['John Doe', 'Your Peer', 'DD / MM / YYYY', 'DD / MM / YYYY'].map(
             (txt) => `<td >${txt}</td>`,
           )}
          </tr>

        </tbody>
      </table>`.replaceAll(',', '');
};

const raterVerificationEmail = `
      <p> <% PROJECT_NAME %> : Please verify your rater </p>
      <br />
      <p> To : <% RATER %> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; From : <% SENDER %> ​</p>
      <br /> <hr class="__se__solid" />  <br />
      <p> Dear <% RATER %> , </p>
      <br />
      <p> You have been nominated to provide leadership competency feedback on the following individual(s): </p>
      <br /> <br />  ${tableTemplate()} <br /><br />
      <p> Please verify the name of the individual(s) who has/have nominated you as a rater and the respective work relationship(s).
      Should there be any problems with the information, please notify your in-house HR team immediately. </p>
      <br />
      <p> You will receive another email with the Login information shortly before the project starts. </p>
      <br />
      <p> Thank you, </p>
      <br />
      <% SENDER %>
`;

const loginEmailSelf = `
        <p> <% PROJECT_NAME %> : Login email </p>
        <br />
        <p> To : <% RATER %> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; From : <% SENDER %> </p>
        <br /> <hr class="__se__solid" />  <br />

        <p> Dear <% RATER %> , </p>
        <br />
        <p> Please complete and submit the survey by <% END_DATE %>. </p>
        <br />
        <p> To access the survey, we recommend that you upgrade to the most recent version of your browser. </p>
        <br />
        <p> Please click on the following link to proceed: <% SURVEY_LINK %> </p>
        <br />
        <p> Your Login ID is : <% RATER_LOGIN_ID %> </p>
        <p> Your Password is : <% PASSWORD %> </p>
        <br />
        <p> Thank you, </p>
        <br />
        <% SENDER %>
`;

const loginEmailOthers = `
       <p> <% PROJECT_NAME %> : Please verify your rater </p>
       <br />
       <p> To : <% RATER %> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; From : <% SENDER %> ​</p>
       <br /> <hr class="__se__solid" />  <br />
       <p> Dear <% RATER %> , </p>
       <br />
       <p> You have been nominated to provide leadership competency feedback on the following individual(s): </p>
       <br /> <br /> ${tableTemplate()} <br /><br />
       <p> Please complete and submit the survey by <% END_DATE %>. </p>
       <br />
       <p> To access the survey, we recommend that you upgrade to the most recent version of your browser. </p>
       <br />
       <p> Please click on the following link to proceed: <% SURVEY_LINK %> </p>
       <br />
       <p> Your Login ID is : <% RATER_LOGIN_ID %> </p>
       <p> Your Password is : <% PASSWORD %> </p>
       <br />
       <p> Thank you, </p>
`;

const reminderEmails = `
       <p> <% PROJECT_NAME %> : Please verify your rater </p>
       <br />
       <p> To : <% RATER %> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; From : <% SENDER %> ​</p>
       <br /> <hr class="__se__solid" />  <br />
       <p> Dear <% RATER %> , </p>
       <br />
       <p> You have been nominated to provide leadership competency feedback on the following individual(s): </p>
       <br /> <br /> ${tableTemplate()} <br /><br />
       <p> Please complete and submit the survey by <% END_DATE %>. </p>
       <br />
       <p> To access the survey, we recommend that you upgrade to the most recent version of your browser. </p>
       <br />
       <p> Please click on the following link to proceed: <% SURVEY_LINK %> </p>
       <br />
       <p> Your Login ID is : <% RATER_LOGIN_ID %> </p>
       <p> Your Password is : <% PASSWORD %> </p>
       <br />
       <p> Thank you, </p>
`;

const resetPasswordEmail = `
       <p> <% PROJECT_NAME %> : Please verify your rater </p>
       <br />
       <p> To : <% RATER %> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; From : <% SENDER %> ​</p>
       <br /> <hr class="__se__solid" />  <br />
       <p> Dear <% RATER %> , </p>
       <br />
       <p> You have been nominated to provide leadership competency feedback on the following individual(s): </p>
       <br /> <br /> ${tableTemplate()} <br /><br /> 
       <p> Please complete and submit the survey by <% END_DATE %>. </p>
       <br />
       <p> To access the survey, we recommend that you upgrade to the most recent version of your browser. </p>
       <br />
       <p> Please click on the following link to proceed: <% SURVEY_LINK %> </p>
       <br />
       <p> Your Login ID is : <% RATER_LOGIN_ID %> </p>
       <p> Your Password is : <% PASSWORD %> </p>
       <br />
       <p> Thank you, </p>
`;

export {
  raterVerificationEmail,
  loginEmailSelf,
  loginEmailOthers,
  reminderEmails,
  resetPasswordEmail,
};
