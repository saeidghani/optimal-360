// a place to test your components
import React from 'react';

import { raterVerificationEmail } from './Wizard/Helper/EmailTemplates';
import TextEditor from './Common/TextEditor';

const Login = () => {
  const [emailTemplate, setEmailTemplate] = React.useState('');

  return (
    <div className="p-5 min-h-screen">
      <TextEditor
        value={emailTemplate}
        onChange={setEmailTemplate}
        template={raterVerificationEmail}
        data={{
          PROJECT_NAME: 'Project XYZ',
          SENDER: 'guy 1',
          RATER: 'guy 2',
          table: {
            header: ['Name', 'Relationship', 'Start Date', 'End Date'],
            body: [
              ['X1', 'Y1', '12', '34'],
              ['X2', 'Y2', '56', '78'],
            ],
          },
        }}
      />
    </div>
  );
};

export default Login;
