import React from 'react';

import Button from '../../../Common/Button';
import { useQuery } from '../../../../hooks';

const ViewByButtons = () => {
  const [parsedQuery, , setQuery] = useQuery();
  const viewBy = parsedQuery?.viewBy;

  const viewButtons = [
    { key: 'ratee-summary', title: 'View Ratee Summary' },
    { key: 'ratee-details', title: 'View Ratee Details' },
    { key: 'rater-details', title: 'View Rater Details' },
  ];

  return (
    <div className="flex items-center overflow-auto mt-4">
      {viewButtons.map((button) => (
        <Button
          key={button.key}
          className={`mr-4 border-list-border shadow-none px-2 md:px-4 ${
            button.key === viewBy ? 'bg-primary-500' : 'bg-white'
          }`}
          textClassName={`${button.key === viewBy ? 'text-white' : 'text-heading'}`}
          textSize="sm"
          text={button.title}
          onClick={() => setQuery({ viewBy: button.key, page_number: 1, page_size: 10 })}
        />
      ))}
    </div>
  );
};

export default ViewByButtons;
