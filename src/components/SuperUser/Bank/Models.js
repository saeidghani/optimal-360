import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import { useQuery, stringify } from '../../../hooks/useQuery';

import Button from '../../Common/Button';
import ImportExcelButton from '../../Common/ImportExcelButton';
import MainLayout from '../../Common/Layout';
import Table from '../../Common/Table';

const Models = ({
  loading,
  surveyGroups,
  fetchSurveyGroups,
  importSurveyGroups,
  exportSurveyGroup,
}) => {
  const history = useHistory();
  const [parsedQuery, query, setQuery] = useQuery();

  const [pageSize, setPageSize] = React.useState(parsedQuery?.page_size || 10);
  const pageNumber = parsedQuery?.page_number;

  React.useEffect(() => {
    if (!parsedQuery?.page_number || !parsedQuery?.page_size) {
      setQuery({
        page_number: 1,
        page_size: 10,
      });
    }

    // eslint-disable-next-line
  }, [history?.location?.pathname]);

  const getSortOrder = (key) => {
    return parsedQuery?.sort?.includes(key)
      ? parsedQuery?.sort?.[0] === '+'
        ? 'ascend'
        : 'descend'
      : '';
  };

  const sort = (sorter) => {
    // eslint-disable-next-line operator-linebreak
    const order = parsedQuery?.sort?.[0] === '+' ? '-' : '+';
    const newItem = `${order}${sorter.columnKey}`;

    setQuery({ sort: newItem });
  };

  React.useEffect(() => {
    fetchSurveyGroups(query);
  }, [fetchSurveyGroups, query]);

  const columns = React.useCallback(
    [
      {
        key: 'id',
        title: 'ID',
        dataIndex: 'id',
        sorter: true,
        sortOrder: getSortOrder('id'),
      },
      {
        key: 'name',
        title: 'Survey Group',
        dataIndex: 'SurveyGroup',
        sorter: true,
        sortOrder: getSortOrder('name'),
      },
      {
        key: 'action',
        width: 100,
        render: (_, { id }) => (
          <div className="flex items-center">
            <Button
              className="flex items-center mr-3.5"
              text="Export Exel File"
              icon="FileExcelOutlined"
              size="middle"
              textSize="xs"
              textClassName="mr-2"
              iconPosition="right"
              type="gray"
              onClick={() => exportSurveyGroup(id)}
            />
            <Button
              onClick={() => {
                const params = stringify({ surveyGroupId: id });

                history.push(`/super-user/pre-defined-data/add${params}`);
              }}
              icon="EditOutlined"
              type="link"
              className="text-lg"
              size="middle"
            />
          </div>
        ),
      },
    ],
    [],
  );

  const renderHeader = React.useCallback(
    () => (
      <div className="flex flex-row justify-end items-center">
        <Button
          className="flex items-center mr-3.5"
          text="New Survey Group"
          icon="PlusCircleOutlined"
          textClassName="mr-2"
          size="middle"
          textSize="xs"
          iconPosition="right"
          type="gray"
          onClick={() => history.push('/super-user/pre-defined-data/add')}
        />

        <ImportExcelButton
          beforeUpload={(file) => {
            importSurveyGroups(file);

            return false;
          }}
        />
      </div>
    ),
    // eslint-disable-next-line
    [surveyGroups.timeStamp],
  );

  return (
    <MainLayout
      hasBreadCrumb
      title="Pre Defined Data"
      titleClass="mb-2"
      contentClass="py-6 pl-21 pr-6"
      childrenPadding={false}
    >
      <Table
        showSorterTooltip={false}
        onTableChange={({ sorter }) => sort(sorter)}
        rowSelection={false}
        className="p-6 bg-white rounded-lg shadow"
        size="middle"
        loading={loading}
        columns={columns}
        dataSource={surveyGroups?.data || []}
        renderHeader={renderHeader}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setQuery({ page_size: size, page_number: 1 });
        }}
        pageSize={pageSize * 1}
        pageNumber={pageNumber * 1}
        // eslint-disable-next-line camelcase
        onPaginationChange={(page_number, page_size) => {
          setQuery({
            page_size,
            page_number,
          });
        }}
        totalRecordSize={surveyGroups?.metaData?.pagination?.totalRecords * 1}
      />
    </MainLayout>
  );
};

Models.propTypes = {
  loading: PropTypes.bool.isRequired,
  importSurveyGroups: PropTypes.func.isRequired,
  fetchSurveyGroups: PropTypes.func.isRequired,
  exportSurveyGroup: PropTypes.func.isRequired,
  surveyGroups: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.object),
    metaData: PropTypes.shape({
      pagination: PropTypes.shape({
        totalRecords: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      }),
    }),
  }),
};

Models.defaultProps = {
  surveyGroups: {
    data: [],
    metaData: {
      pagination: {
        totalRecords: 10,
      },
    },
  },
};

export default Models;
