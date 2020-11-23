import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Table from '../../../Common/Table';
import Progress from '../../../Common/Progress';
import { dynamicMap } from '../../../../routes/RouteMap';

const DataTable = ({ loading, extraDetails, className, tableClassName, extraDetailsClassName }) => {
  const columns = React.useMemo(() => [
    {
      key: 'name',
      title: 'Name',
      width: 100,
      sorter: true,
      render: (name) => (
        <Link to={dynamicMap.surveyPlatform.individualQuestions()}>
          <span className="text-primary-500">{name}</span>
        </Link>
      ),
    },
    {
      key: 'relationship',
      title: 'Relationship',
      width: 100,
    },
    {
      key: 'statusAction',
      title: 'Status / Action:',
      width: 100,
    },
    {
      key: 'rate',
      title: 'Rate',
      width: 100,
      render: (percentage) => (
        <div className="w-16 h-16 flex items-center justify-end pt-2">
          <div className="pb-2 mr-1 md:mr-4">{percentage}%</div>
          <div className="w-12 h-full">
            <Progress className="-mb-12 ml-auto" percentage={percentage} showPercent={false} />
          </div>
        </div>
      ),
    },
  ]);

  const dataSource = [
    {
      key: '1',
      name: 'Katherine Kan',
      relationship: 'Self',
      statusAction: 'To review',
      rate: 100,
    },
    {
      key: '2',
      name: 'Premela Jaganathan',
      relationship: 'Manager',
      statusAction: 'To start',
      rate: 0,
    },
    {
      key: '3',
      name: 'Karyn Chow',
      relationship: 'Manager',
      statusAction: 'To review',
      rate: 100,
    },
    {
      key: '4',
      name: 'Vince Hon',
      relationship: 'Peers',
      statusAction: 'In progress',
      rate: 70,
    },
    {
      key: '5',
      name: 'Tek Ee Lin',
      relationship: 'Direct Report',
      statusAction: 'To start',
      rate: 0,
    },
  ];

  return (
    <Table
      size="middle"
      className={className}
      tableClassName={`overflow-x-auto ${tableClassName}`}
      extraDetailsClassName={extraDetailsClassName}
      loading={loading}
      columns={columns}
      dataSource={dataSource}
      rowSelection={false}
      pagination={false}
      title={null}
      extraDetails={extraDetails}
    />
  );
};

DataTable.propTypes = {
  loading: PropTypes.bool.isRequired,
  extraDetails: PropTypes.node,
  className: PropTypes.string,
  tableClassName: PropTypes.string,
  extraDetailsClassName: PropTypes.string,
};

DataTable.defaultProps = {
  className: '',
  tableClassName: '',
  extraDetailsClassName: '',
  extraDetails: null,
};

export default DataTable;
