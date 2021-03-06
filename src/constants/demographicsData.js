const employmentLocationOptions = [
  { title: 'Afghanistan', value: 'Afghanistan' },
  { title: 'Albania', value: 'Albania' },
  { title: 'Algeria', value: 'Algeria' },
  { title: 'Andorra', value: 'Andorra' },
  { title: 'Angola', value: 'Angola' },
  { title: 'Antigua and Barbuda', value: 'Antigua and Barbuda' },
  { title: 'Argentina', value: 'Argentina' },
  { title: 'Armenia', value: 'Armenia' },
  { title: 'Australia', value: 'Australia' },
  { title: 'Austria', value: 'Austria' },
  { title: 'Azerbaijan', value: 'Azerbaijan' },
  { title: 'The Bahamas', value: 'The Bahamas' },
  { title: 'Bahrain', value: 'Bahrain' },
  { title: 'Bangladesh', value: 'Bangladesh' },
  { title: 'Barbados', value: 'Barbados' },
  { title: 'Belarus', value: 'Belarus' },
  { title: 'Belgium', value: 'Belgium' },
  { title: 'Belize', value: 'Belize' },
  { title: 'Benin', value: 'Benin' },
  { title: 'Bhutan', value: 'Bhutan' },
  { title: 'Bolivia', value: 'Bolivia' },
  { title: 'Bosnia and Herzegovina', value: 'Bosnia and Herzegovina' },
  { title: 'Botswana', value: 'Botswana' },
  { title: 'Brazil', value: 'Brazil' },
  { title: 'Brunei', value: 'Brunei' },
  { title: 'Bulgaria', value: 'Bulgaria' },
  { title: 'Burkina Faso', value: 'Burkina Faso' },
  { title: 'Burundi', value: 'Burundi' },
  { title: 'Cambodia', value: 'Cambodia' },
  { title: 'Cameroon', value: 'Cameroon' },
  { title: 'Canada', value: 'Canada' },
  { title: 'Cape Verde', value: 'Cape Verde' },
  { title: 'Central African Republic', value: 'Central African Republic' },
  { title: 'Chad', value: 'Chad' },
  { title: 'Chile', value: 'Chile' },
  { title: 'China', value: 'China' },
  { title: 'Colombia', value: 'Colombia' },
  { title: 'Comoros', value: 'Comoros' },
  { title: 'Congo, Republic of the', value: 'Congo, Republic of the' },
  { title: 'Congo, Democratic Republic of the', value: 'Congo, Democratic Republic of the' },
  { title: 'Costa Rica', value: 'Costa Rica' },
  { title: "Cote d'Ivoire", value: "Cote d'Ivoire" },
  { title: 'Croatia', value: 'Croatia' },
  { title: 'Cuba', value: 'Cuba' },
  { title: 'Cyprus', value: 'Cyprus' },
  { title: 'Czech Republic', value: 'Czech Republic' },
  { title: 'Denmark', value: 'Denmark' },
  { title: 'Djibouti', value: 'Djibouti' },
  { title: 'Dominica', value: 'Dominica' },
  { title: 'Dominican Republic', value: 'Dominican Republic' },
  { title: 'East Timor (Timor-Leste)', value: 'East Timor (Timor-Leste)' },
  { title: 'Ecuador', value: 'Ecuador' },
  { title: 'Egypt', value: 'Egypt' },
  { title: 'El Salvador', value: 'El Salvador' },
  { title: 'Equatorial Guinea', value: 'Equatorial Guinea' },
  { title: 'Eritrea', value: 'Eritrea' },
  { title: 'Estonia', value: 'Estonia' },
  { title: 'Ethiopia', value: 'Ethiopia' },
  { title: 'Fiji', value: 'Fiji' },
  { title: 'Finland', value: 'Finland' },
  { title: 'France', value: 'France' },
  { title: 'Gabon', value: 'Gabon' },
  { title: 'The Gambia', value: 'The Gambia' },
  { title: 'Georgia', value: 'Georgia' },
  { title: 'Germany', value: 'Germany' },
  { title: 'Ghana', value: 'Ghana' },
  { title: 'Greece', value: 'Greece' },
  { title: 'Grenada', value: 'Grenada' },
  { title: 'Guatemala', value: 'Guatemala' },
  { title: 'Guinea', value: 'Guinea' },
  { title: 'Guinea-Bissau', value: 'Guinea-Bissau' },
  { title: 'Guyana', value: 'Guyana' },
  { title: 'Haiti', value: 'Haiti' },
  { title: 'Honduras', value: 'Honduras' },
  { title: 'Hong Kong, China', value: 'Hong Kong, China' },
  { title: 'Hungary', value: 'Hungary' },
  { title: 'Iceland', value: 'Iceland' },
  { title: 'India', value: 'India' },
  { title: 'Indonesia', value: 'Indonesia' },
  { title: 'Iran', value: 'Iran' },
  { title: 'Iraq', value: 'Iraq' },
  { title: 'Ireland', value: 'Ireland' },
  { title: 'Israel', value: 'Israel' },
  { title: 'Italy', value: 'Italy' },
  { title: 'Jamaica', value: 'Jamaica' },
  { title: 'Japan', value: 'Japan' },
  { title: 'Jordan', value: 'Jordan' },
  { title: 'Kazakhstan', value: 'Kazakhstan' },
  { title: 'Kenya', value: 'Kenya' },
  { title: 'Kiribati', value: 'Kiribati' },
  { title: 'Korea, North', value: 'Korea, North' },
  { title: 'Korea, South', value: 'Korea, South' },
  { title: 'Kosovo', value: 'Kosovo' },
  { title: 'Kuwait', value: 'Kuwait' },
  { title: 'Kyrgyzstan', value: 'Kyrgyzstan' },
  { title: 'Laos', value: 'Laos' },
  { title: 'Latvia', value: 'Latvia' },
  { title: 'Lebanon', value: 'Lebanon' },
  { title: 'Lesotho', value: 'Lesotho' },
  { title: 'Liberia', value: 'Liberia' },
  { title: 'Libya', value: 'Libya' },
  { title: 'Liechtenstein', value: 'Liechtenstein' },
  { title: 'Lithuania', value: 'Lithuania' },
  { title: 'Luxembourg', value: 'Luxembourg' },
  { title: 'Macedonia', value: 'Macedonia' },
  { title: 'Madagascar', value: 'Madagascar' },
  { title: 'Malawi', value: 'Malawi' },
  { title: 'Malaysia', value: 'Malaysia' },
  { title: 'Maldives', value: 'Maldives' },
  { title: 'Mali', value: 'Mali' },
  { title: 'Malta', value: 'Malta' },
  { title: 'Marshall Islands', value: 'Marshall Islands' },
  { title: 'Mauritania', value: 'Mauritania' },
  { title: 'Mauritius', value: 'Mauritius' },
  { title: 'Mexico', value: 'Mexico' },
  { title: 'Micronesia, Federated States of', value: 'Micronesia, Federated States of' },
  { title: 'Moldova', value: 'Moldova' },
  { title: 'Monaco', value: 'Monaco' },
  { title: 'Mongolia', value: 'Mongolia' },
  { title: 'Montenegro', value: 'Montenegro' },
  { title: 'Morocco', value: 'Morocco' },
  { title: 'Mozambique', value: 'Mozambique' },
  { title: 'Myanmar (Burma)', value: 'Myanmar (Burma)' },
  { title: 'Namibia', value: 'Namibia' },
  { title: 'Nauru', value: 'Nauru' },
  { title: 'Nepal', value: 'Nepal' },
  { title: 'Netherlands', value: 'Netherlands' },
  { title: 'New Zealand', value: 'New Zealand' },
  { title: 'Nicaragua', value: 'Nicaragua' },
  { title: 'Niger', value: 'Niger' },
  { title: 'Nigeria', value: 'Nigeria' },
  { title: 'Norway', value: 'Norway' },
  { title: 'Oman', value: 'Oman' },
  { title: 'Pakistan', value: 'Pakistan' },
  { title: 'Palau', value: 'Palau' },
  { title: 'Panama', value: 'Panama' },
  { title: 'Papua New Guinea', value: 'Papua New Guinea' },
  { title: 'Paraguay', value: 'Paraguay' },
  { title: 'Peru', value: 'Peru' },
  { title: 'Philippines', value: 'Philippines' },
  { title: 'Poland', value: 'Poland' },
  { title: 'Portugal', value: 'Portugal' },
  { title: 'Qatar', value: 'Qatar' },
  { title: 'Romania', value: 'Romania' },
  { title: 'Russia', value: 'Russia' },
  { title: 'Rwanda', value: 'Rwanda' },
  { title: 'Saint Kitts and Nevis', value: 'Saint Kitts and Nevis' },
  { title: 'Saint Lucia', value: 'Saint Lucia' },
  { title: 'Saint Vincent and the Grenadines', value: 'Saint Vincent and the Grenadines' },
  { title: 'Samoa', value: 'Samoa' },
  { title: 'San Marino', value: 'San Marino' },
  { title: 'Sao Tome and Principe', value: 'Sao Tome and Principe' },
  { title: 'Saudi Arabia', value: 'Saudi Arabia' },
  { title: 'Senegal', value: 'Senegal' },
  { title: 'Serbia', value: 'Serbia' },
  { title: 'Seychelles', value: 'Seychelles' },
  { title: 'Sierra Leone', value: 'Sierra Leone' },
  { title: 'Singapore', value: 'Singapore' },
  { title: 'Slovakia', value: 'Slovakia' },
  { title: 'Slovenia', value: 'Slovenia' },
  { title: 'Solomon Islands', value: 'Solomon Islands' },
  { title: 'Somalia', value: 'Somalia' },
  { title: 'South Africa', value: 'South Africa' },
  { title: 'South Sudan', value: 'South Sudan' },
  { title: 'Spain', value: 'Spain' },
  { title: 'Sri Lanka', value: 'Sri Lanka' },
  { title: 'Sudan', value: 'Sudan' },
  { title: 'Suriname', value: 'Suriname' },
  { title: 'Swaziland', value: 'Swaziland' },
  { title: 'Sweden', value: 'Sweden' },
  { title: 'Switzerland', value: 'Switzerland' },
  { title: 'Syria', value: 'Syria' },
  { title: 'Taiwan, China', value: 'Taiwan, China' },
  { title: 'Tajikistan', value: 'Tajikistan' },
  { title: 'Tanzania', value: 'Tanzania' },
  { title: 'Thailand', value: 'Thailand' },
  { title: 'Togo', value: 'Togo' },
  { title: 'Tonga', value: 'Tonga' },
  { title: 'Trinidad and Tobago', value: 'Trinidad and Tobago' },
  { title: 'Tunisia', value: 'Tunisia' },
  { title: 'Turkey', value: 'Turkey' },
  { title: 'Turkmenistan', value: 'Turkmenistan' },
  { title: 'Tuvalu', value: 'Tuvalu' },
  { title: 'Uganda', value: 'Uganda' },
  { title: 'Ukraine', value: 'Ukraine' },
  { title: 'United Arab Emirates', value: 'United Arab Emirates' },
  { title: 'United Kingdom', value: 'United Kingdom' },
  { title: 'United States of America', value: 'United States of America' },
  { title: 'Uruguay', value: 'Uruguay' },
  { title: 'Uzbekistan', value: 'Uzbekistan' },
  { title: 'Vanuatu', value: 'Vanuatu' },
  { title: 'Vatican City (Holy See)', value: 'Vatican City (Holy See)' },
  { title: 'Venezuela', value: 'Venezuela' },
  { title: 'Vietnam', value: 'Vietnam' },
  { title: 'Yemen', value: 'Yemen' },
  { title: 'Zambia', value: 'Zambia' },
  { title: 'Zimbabwe', value: 'Zimbabwe' },
];

const sectorOptions = [
  { title: 'Communication Services', value: 'Communication Services' },
  { title: 'Consumer Discretionary', value: 'Consumer Discretionary' },
  { title: 'Consumer Staples', value: 'Consumer Staples' },
  { title: 'Energy', value: 'Energy' },
  { title: 'Financials', value: 'Financials' },
  { title: 'Health Care', value: 'Health Care' },
  { title: 'Industrials', value: 'Industrials' },
  { title: 'Information Technology', value: 'Information Technology' },
  { title: 'Materials', value: 'Materials' },
  { title: 'Real Estate', value: 'Real Estate' },
  { title: 'Utilities', value: 'Utilities' },
  { title: 'Others', value: 'Others' },
];

const industryOptions = [
  { title: 'Accounting', value: 'Accounting' },
  { title: 'Administration & Office Support', value: 'Administration & Office Support' },
  {
    title: 'Advertising/Media/Entertainment/Publishing',
    value: 'Advertising/Media/Entertainment/Publishing',
  },
  {
    title: 'Agriculture, Forestry and Fishing Support Services',
    value: 'Agriculture, Forestry and Fishing Support Services',
  },
  { title: 'Architecture & Design', value: 'Architecture & Design' },
  { title: 'Banking & Financial', value: 'Banking & Financial' },
  { title: 'Building & Construction', value: 'Building & Construction' },
  { title: 'Business Consulting & Services', value: 'Business Consulting & Services' },
  { title: 'Community Care & Support Services', value: 'Community Care & Support Services' },
  { title: 'Culture & the Arts', value: 'Culture & the Arts' },
  { title: 'Customer Services & Call Centre', value: 'Customer Services & Call Centre' },
  { title: 'Defence Force/Police/Security', value: 'Defence Force/Police/Security' },
  { title: 'Education & Training', value: 'Education & Training' },
  { title: 'Engineering', value: 'Engineering' },
  { title: 'Government Administration', value: 'Government Administration' },
  { title: 'Healthcare & Medical', value: 'Healthcare & Medical' },
  { title: 'Hospitality, Travel & Tourism', value: 'Hospitality, Travel & Tourism' },
  { title: 'Human Resources & Recruitment', value: 'Human Resources & Recruitment' },
  { title: 'Insurance & Superannuation', value: 'Insurance & Superannuation' },
  { title: 'IT & Telecommunications', value: 'IT & Telecommunications' },
  { title: 'Legal', value: 'Legal' },
  { title: 'Logistics, Transport & Supply', value: 'Logistics, Transport & Supply' },
  { title: 'Manufacturing/Operations', value: 'Manufacturing/Operations' },
  { title: 'Mining', value: 'Mining' },
  { title: 'Oil & Gas', value: 'Oil & Gas' },
  { title: 'Pharmaceuticals/Biotechnology', value: 'Pharmaceuticals/Biotechnology' },
  { title: 'PR & Communications', value: 'PR & Communications' },
  { title: 'Real Estate & Property', value: 'Real Estate & Property' },
  { title: 'Retail & Consumer Products', value: 'Retail & Consumer Products' },
  { title: 'Sales & Marketing', value: 'Sales & Marketing' },
  { title: 'Science & Technology', value: 'Science & Technology' },
  {
    title: 'Services & Utilities Supply (i.e. Gas, Water, Electricity)',
    value: 'Services & Utilities Supply (i.e. Gas, Water, Electricity)',
  },
  { title: 'Sports & Leisure', value: 'Sports & Leisure' },
  {
    title: 'Waste Collection, Treatment & Disposal Services',
    value: 'Waste Collection, Treatment & Disposal Services',
  },
  { title: 'Others', value: 'Others' },
];

const jobFunctionOptions = [
  { title: 'Architecture & Engineering', value: 'Architecture & Engineering' },
  {
    title: 'Arts, Design, Entertainment, Sports, & Media',
    value: 'Arts, Design, Entertainment, Sports, & Media',
  },
  {
    title: 'Building/Grounds Cleaning & Maintenance',
    value: 'Building/Grounds Cleaning & Maintenance',
  },
  { title: 'Business & Financial Operations', value: 'Business & Financial Operations' },
  { title: 'Community & Social Services', value: 'Community & Social Services' },
  { title: 'Computer & Mathematical Science', value: 'Computer & Mathematical Science' },
  { title: 'Construction & Extraction', value: 'Construction & Extraction' },
  { title: 'Education, Training, & Library', value: 'Education, Training, & Library' },
  { title: 'Farming, Fishing, & Forestry', value: 'Farming, Fishing, & Forestry' },
  { title: 'Food Preparation & Serving Related', value: 'Food Preparation & Serving Related' },
  { title: 'Healthcare Practitioner & Technical', value: 'Healthcare Practitioner & Technical' },
  { title: 'Healthcare Support', value: 'Healthcare Support' },
  { title: 'Installation, Maintenance, & Repair', value: 'Installation, Maintenance, & Repair' },
  { title: 'Legal', value: 'Legal' },
  { title: 'Life, Physical, & Social Science', value: 'Life, Physical, & Social Science' },
  { title: 'Management', value: 'Management' },
  { title: 'Military', value: 'Military' },
  { title: 'Mining', value: 'Mining' },
  { title: 'Office & Administration', value: 'Office & Administration' },
  { title: 'Others', value: 'Others' },
  { title: 'Production', value: 'Production' },
  { title: 'Professional Consulting', value: 'Professional Consulting' },
  { title: 'Personal Care & Service', value: 'Personal Care & Service' },
  { title: 'Protective Service', value: 'Protective Service' },
  { title: 'Sales & Customer Service', value: 'Sales & Customer Service' },
  { title: 'Sales & Related', value: 'Sales & Related' },
  { title: 'Transportation & Material Moving', value: 'Transportation & Material Moving' },
];

const jobLevelOptions = [
  { title: 'Board Members', value: 'Board Members' },
  {
    title: 'C-Suite / Executives / Managing Director',
    value: 'C-Suite / Executives / Managing Director',
  },
  { title: 'Department Head / Functional Manager', value: 'Department Head / Functional Manager' },
  { title: 'Middle Managers / Sector Manager', value: 'Middle Managers / Sector Manager' },
  {
    title: 'First-line Managers / Team Leader / Supervisor',
    value: 'First-line Managers / Team Leader / Supervisor',
  },
  { title: 'Graduate / Entry-level', value: 'Graduate / Entry-level' },
  {
    title: 'Individual Contributor (No Direct Reports)',
    value: 'Individual Contributor (No Direct Reports)',
  },
];

const highestEducationAttainedOptions = [
  { title: 'No formal education', value: 'No formal education' },
  { title: 'Primary education', value: 'Primary education' },
  { title: 'Secondary education', value: 'Secondary education' },
  { title: 'Tertiary education', value: 'Tertiary education' },
  { title: 'Postgraduate studies', value: 'Postgraduate studies' },
  { title: 'Other', value: 'Other' },
];

const ageGroupOptions = [
  { title: '15-19', value: '15-19' },
  { title: '20-24', value: '20-24' },
  { title: '25-34', value: '25-34' },
  { title: '35-44', value: '35-44' },
  { title: '45-54', value: '45-54' },
  { title: '55-59', value: '55-59' },
  { title: '60-64', value: '60-64' },
  { title: '65 and above', value: '65 and above' },
];

const lengthOfServiceInCurrentRoleOptions = [
  { title: '0-2 years', value: '0-2 years' },
  { title: '3-5 years', value: '3-5 years' },
  { title: '6-10 years', value: '6-10 years' },
  { title: '11-20 years', value: '11-20 years' },
  { title: '21-30 years', value: '21-30 years' },
  { title: '31 years and above', value: '31 years and above' },
];

export {
  employmentLocationOptions,
  sectorOptions,
  industryOptions,
  jobFunctionOptions,
  jobLevelOptions,
  highestEducationAttainedOptions,
  ageGroupOptions,
  lengthOfServiceInCurrentRoleOptions,
};
